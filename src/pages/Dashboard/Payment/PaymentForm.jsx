import React, { useEffect, useState } from 'react';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    // Fetch parcel data
    const { isPending, data: parcelInfo = {}, isError } = useQuery({
        queryKey: ['parcel', parcelId],
        enabled: !!parcelId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data?.data || {};
        }
    });

    const amount = parcelInfo.cost;
    const amountInCents = Math.round(amount * 100);

    // Step 1: Get clientSecret on mount
    useEffect(() => {
        if (parcelInfo._id) {
            axiosSecure.post('/create-payment-intent', {
                amount: amountInCents,
                parcelId: parcelInfo._id,
            }).then(res => {
                setClientSecret(res.data?.clientSecret);
            }).catch(err => {
                console.error('❌ Error getting clientSecret', err);
            });
        }
    }, [parcelInfo._id, amountInCents, axiosSecure]);

    // Step 2: Handle payment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        const card = elements.getElement(CardNumberElement);
        if (!card) return setError('Card input not found.');

        // Create payment method
        const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (pmError) {
            setError(pmError.message);
            return;
        }

        // Confirm payment
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            console.error('❌ Payment failed:', confirmError);
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setError('');

            // ✅ Show success alert
            Swal.fire({
                title: 'Payment Successful!',
                text: `Payment ID: ${paymentIntent.id}`,
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // 🔁 Optional: Redirect after success
            setTimeout(() => {
                navigate('/dashboard/myParcels'); // change to your route
            }, 2000);
        }
    };

    // UI: loading or error
    if (isPending) return <div className="text-center text-lg">Loading parcel details...</div>;
    if (isError) return <div className="text-red-500 text-center">❌ Failed to load parcel data.</div>;

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Pay for Parcel</h2>

            {/* Parcel Info */}
            <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <p><strong>Type:</strong> {parcelInfo.parcelType}</p>
                <p><strong>Cost:</strong> ৳{parcelInfo.cost}</p>
                <p><strong>Status:</strong> {parcelInfo.payment_status}</p>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div>
                    <label className="text-gray-700 font-medium">Card Number</label>
                    <CardNumberElement
                        className="w-full border p-4 rounded-md shadow-inner mt-1"
                        options={{
                            style: {
                                base: {
                                    fontSize: '18px',
                                    color: '#333',
                                    '::placeholder': { color: '#aaa' },
                                },
                            },
                        }}
                    />
                </div>

                <div>
                    <label className="text-gray-700 font-medium">Expiry Date</label>
                    <CardExpiryElement
                        className="w-full border p-4 rounded-md shadow-inner mt-1"
                        options={{
                            style: {
                                base: {
                                    fontSize: '18px',
                                    color: '#333',
                                    '::placeholder': { color: '#aaa' },
                                },
                            },
                        }}
                    />
                </div>

                <div>
                    <label className="text-gray-700 font-medium">CVC</label>
                    <CardCvcElement
                        className="w-full border p-4 rounded-md shadow-inner mt-1"
                        options={{
                            style: {
                                base: {
                                    fontSize: '18px',
                                    color: '#333',
                                    '::placeholder': { color: '#aaa' },
                                },
                            },
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-success w-full text-white text-lg"
                    disabled={!stripe}
                >
                    Pay ৳{parcelInfo.cost}
                </button>

                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
