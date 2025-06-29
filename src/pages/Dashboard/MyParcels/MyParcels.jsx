import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import MyParcelsTable from './parcelsTable';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], isLoading, refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            console.log("Response from /parcels:", res.data);
            // Access the parcels array inside res.data.data
            return Array.isArray(res.data.data) ? res.data.data : [];
        }
    });
    
    const handleView = (parcel) => {
        console.log("🔍 Viewing:", parcel);
        // Optionally open modal or route to details
    };

    const handlePay = (parcel) => {
        console.log("💳 Pay for:", parcel);
        // Integrate payment gateway or show alert
    };

   

    const handleDelete = async (parcel) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/parcels/${parcel._id}`);
                if (res.data.success) {
                    Swal.fire('Deleted!', 'Your parcel has been deleted.', 'success');
                    refetch();
                } else {
                    Swal.fire('Error!', res.data.error || 'Failed to delete parcel.', 'error');
                }
            } catch (err) {
                console.error("❌ Delete error:", err);
                Swal.fire('Error!', 'Something went wrong.', 'error');
            }
        }
    };
    

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">📦 My Parcels ({parcels.length})</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <MyParcelsTable
                    parcels={parcels}
                    onView={handleView}
                    onDelete={handleDelete}
                    onPay={handlePay}
                />
            )}
        </div>
    );
};

export default MyParcels;
