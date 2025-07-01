import React from 'react';
import { FaEye, FaTrash, FaCreditCard } from 'react-icons/fa';

const MyParcelsTable = ({ parcels, onView, onDelete, onPay }) => {
    return (
        <div className="overflow-x-auto mt-6">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created</th>
                        <th>Cost</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>
                            <td className="capitalize">{parcel.parcelType}</td>
                            <td className="max-w-180px truncate">{parcel.parcelTitle}</td>
                            <td>
                                <div className="text-sm">{parcel.display_date}</div>
                                <div className="text-xs text-gray-500">{parcel.display_time}</div>
                            </td>
                            <td className="font-semibold text-green-600">৳{parcel.cost}</td>
                            <td>
                                {parcel.payment_status === 'paid' ? (
                                    <span className="badge badge-success">Paid</span>
                                ) : (
                                    <span className="badge badge-error">Unpaid</span>
                                )}
                            </td>
                            <td className="space-x-2">
                                <button
                                    onClick={() => onView(parcel)}
                                    className="btn btn-xs btn-info tooltip"
                                    data-tip="View Details"
                                >
                                    <FaEye />
                                </button>
                                <button
                                    onClick={() => onPay(parcel._id)}
                                    className="btn btn-xs btn-success tooltip"
                                    data-tip="Pay Now"
                                    disabled={parcel.payment_status === 'paid'}
                                >
                                    <FaCreditCard />
                                </button>
                                <button
                                    onClick={() => onDelete(parcel)}
                                    className="btn btn-xs btn-error tooltip"
                                    data-tip="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcelsTable;
