import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useQuery } from '@tanstack/react-query';

const MySwal = withReactContent(Swal);

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);

    const { data: pendingRiders = [], refetch, isLoading } = useQuery({
        queryKey: ['pendingRiders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/pending');
            return res.data;
        }
    });
    if (isLoading) return <div>Loading...</div>;

    // Approve or Reject
    const handleAction = async (id, action) => {
        try {
            const res = await axiosSecure.patch(`/riders/${id}`, {
                status: action === "approve" ? "active" : "cancelled"
            });

            if (res.data.modifiedCount > 0) {
                await MySwal.fire(
                    `${action === "approve" ? "✅ Approved" : "❌ Cancelled"}`,
                    `Rider application has been ${action === "approve" ? "approved" : "cancelled"}.`,
                    action === "approve" ? "success" : "info"
                );
                refetch();
                setSelectedRider(null);
            }
        } catch (error) {
            console.error(error);
            await MySwal.fire("Error", "Action failed", "error");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4"
        >
            <h2 className="text-2xl font-bold mb-4">Pending Rider Applications</h2>

            {isLoading ? (
                <p className="text-center py-10">Loading...</p>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
                    <table className="table">
                        <thead>
                            <tr className="bg-base-200">
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Region</th>
                                <th>District</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRiders.map((rider, index) => (
                                <tr key={rider._id}>
                                    <td>{index + 1}</td>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.phone}</td>
                                    <td>{rider.region}</td>
                                    <td>{rider.district}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline btn-info"
                                            onClick={() => setSelectedRider(rider)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {pendingRiders.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center text-gray-400 py-4">
                                        No pending riders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {selectedRider && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Rider Details</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Phone:</strong> {selectedRider.phone}</p>
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
                            <p><strong>Bike Reg No:</strong> {selectedRider.bikeRegNumber}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>District:</strong> {selectedRider.district}</p>
                            <p><strong>Additional Info:</strong> {selectedRider.additionalInfo || 'N/A'}</p>
                            <p><strong>Applied At:</strong> {new Date(selectedRider.appliedAt).toLocaleString()}</p>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => handleAction(selectedRider._id, 'approve')} className="btn btn-success">Accept</button>
                            <button onClick={() => handleAction(selectedRider._id, 'cancel')} className="btn btn-error">Cancel</button>
                            <button onClick={() => setSelectedRider(null)} className="btn btn-outline">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default PendingRiders;
