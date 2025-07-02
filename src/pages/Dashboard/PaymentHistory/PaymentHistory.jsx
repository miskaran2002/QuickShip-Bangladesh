import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-ring loading-lg text-green-600"></span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 p-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">My Payment History</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg shadow">
                    <thead className="bg-gray-100 text-left text-sm font-semibold">
                        <tr>
                            <th className="px-4 py-3 border">#</th>
                            <th className="px-4 py-3 border">Transaction ID</th>
                            <th className="px-4 py-3 border">Parcel ID</th>
                            <th className="px-4 py-3 border">Amount</th>
                            <th className="px-4 py-3 border">Currency</th>
                            <th className="px-4 py-3 border">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr key={payment._id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{index + 1}</td>
                                    <td className="px-4 py-2 border text-blue-600 break-all">{payment.transactionId}</td>
                                    <td className="px-4 py-2 border">{payment.parcelId}</td>
                                    <td className="px-4 py-2 border">৳{payment.amount}</td>
                                    <td className="px-4 py-2 border uppercase">{payment.currency}</td>
                                    <td className="px-4 py-2 border">
                                        {new Date(payment.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    No payment history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
