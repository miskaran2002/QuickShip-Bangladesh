import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch active riders
    const { data: activeRiders = [], refetch, isLoading } = useQuery({
        queryKey: ['activeRiders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/active');
            return res.data;
        }
    });

    const handleDeactivate = async (id) => {
        const confirm = await MySwal.fire({
            title: 'Are you sure?',
            text: 'Do you want to deactivate this rider?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, deactivate',
            cancelButtonText: 'Cancel',
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axiosSecure.patch(`/riders/${id}`, { status: 'deactivated' });
            if (res.data.modifiedCount > 0) {
                await MySwal.fire('Success', 'Rider deactivated.', 'success');
                refetch();
            } else {
                await MySwal.fire('Error', 'Failed to deactivate rider.', 'error');
            }
        } catch (err) {
            console.error(err);
            await MySwal.fire('Error', 'Server error occurred.', 'error');
        }
    };

    const filteredRiders = activeRiders.filter(rider =>
        (rider.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
      
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4"
        >
            <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

            <input
                type="text"
                placeholder="Search by name..."
                className="input input-bordered w-full max-w-sm mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

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
                            {filteredRiders.map((rider, index) => (
                                <tr key={rider._id}>
                                    <td>{index + 1}</td>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.phone}</td>
                                    <td>{rider.region}</td>
                                    <td>{rider.district}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline btn-error"
                                            onClick={() => handleDeactivate(rider._id)}
                                        >
                                            Deactivate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredRiders.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center text-gray-400 py-4">
                                        No riders match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
};

export default ActiveRiders;
