import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams(); // From route: /payment/:parcelId
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');

    // Fetch parcel data by ID
    const { isPending, data: parcelInfo = {}, isError } = useQuery({
        queryKey: ['parcel', parcelId],
        enabled: !!parcelId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data?.data || {};
        }
    });

    // Handle Stripe payment submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) {
            console.error("❌ CardElement not found");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            console.log("✅ Payment method created:", paymentMethod);
            // TODO: send paymentMethod.id + parcelInfo._id to backend for payment intent
        }
    };

    // Conditional rendering
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

            {/* Stripe Form */}
            <form onSubmit={handleSubmit}>
                <CardElement
                    className="border p-5 rounded-md mb-4 shadow-inner"
                    options={{
                        style: {
                            base: {
                                fontSize: '18px',
                                color: '#333',
                                '::placeholder': {
                                    color: '#aaa',
                                },
                            },
                        },
                    }}
                />
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
