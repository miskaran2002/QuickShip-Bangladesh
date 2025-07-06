import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [riders, setRiders] = useState([]);
    const [loadingRiders, setLoadingRiders] = useState(false);
    const [selectedRiderEmail, setSelectedRiderEmail] = useState(null);  // <-- riderEmail here

    // Load parcels
    const {
        data: parcels = [],
        isLoading: parcelsLoading,
        refetch: refetchParcels,
    } = useQuery({
        queryKey: ['assignableParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(
                '/parcels?payment_status=paid&delivery_status=not_collected'
            );
            return res.data.data;
        },
    });

    // Open modal and load riders by region
    const openAssignModal = async (parcel) => {
        setSelectedParcel(parcel);
        setModalOpen(true);
        setSelectedRiderEmail(null);
        setLoadingRiders(true);

        try {
            const res = await axiosSecure.get(
                `/riders?region=${encodeURIComponent(parcel.senderRegion)}`
            );
            setRiders(res.data.data || []);
        } catch (error) {
            console.error('Error loading riders:', error);
            setRiders([]);
        } finally {
            setLoadingRiders(false);
        }
    };

    // Handle assign rider
    const handleAssignRider = async () => {
        if (!selectedRiderEmail) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please select a rider.',
            });
            return;
        }

        try {
            await axiosSecure.patch(`/parcels/${selectedParcel._id}/assign`, {
                riderEmail: selectedRiderEmail,      // <-- send riderEmail as backend expects
                delivery_status: 'assigned',
            });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Rider assigned successfully!',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });

            setModalOpen(false);
            setSelectedParcel(null);
            setSelectedRiderEmail(null);
            refetchParcels();
        } catch (error) {
            console.error('Assign rider failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to assign rider. Please try again.',
            });
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Assign Rider to Paid Parcels</h2>

            {parcelsLoading ? (
                <p>Loading parcels...</p>
            ) : parcels.length === 0 ? (
                <p>No parcels found to assign.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Tracking Id</th>
                                <th>Title</th>
                                <th>Sender</th>
                                <th>Receiver</th>
                                <th>Delivery Status</th>
                                <th>Payment Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr key={parcel._id}>
                                    <td>{parcel.trackingId}</td>
                                    <td>{parcel.parcelTitle}</td>
                                    <td>{parcel.senderName}</td>
                                    <td>{parcel.receiverName}</td>
                                    <td>{parcel.delivery_status}</td>
                                    <td>{parcel.payment_status}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => openAssignModal(parcel)}
                                        >
                                            Assign Rider
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">
                            Assign Rider for Parcel: <br />
                            <span className="font-normal">{selectedParcel?.parcelTitle}</span>
                        </h3>

                        {loadingRiders ? (
                            <p>Loading riders...</p>
                        ) : riders.length === 0 ? (
                            <p>No riders available in region "{selectedParcel?.senderRegion}"</p>
                        ) : (
                            <ul className="space-y-2 max-h-64 overflow-auto">
                                {riders.map((rider) => (
                                    <li key={rider._id} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id={rider._id}
                                            name="rider"
                                            value={rider.email}   // <-- use rider.email here
                                            checked={selectedRiderEmail === rider.email}
                                            onChange={() => setSelectedRiderEmail(rider.email)}
                                        />
                                        <label htmlFor={rider._id} className="cursor-pointer">
                                            {rider.name} — {rider.region}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                className="btn btn-sm btn-outline"
                                onClick={() => {
                                    setModalOpen(false);
                                    setSelectedRiderEmail(null);
                                    setSelectedParcel(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-sm btn-success"
                                disabled={!selectedRiderEmail}
                                onClick={handleAssignRider}
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignRider;
