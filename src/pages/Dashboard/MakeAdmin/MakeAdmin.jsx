import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield, FaUserSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [searchEmail, setSearchEmail] = useState('');
    const [emailToSearch, setEmailToSearch] = useState('');

    const {
        data: userResult,
        refetch,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['userSearch', emailToSearch],
        enabled: !!emailToSearch,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${emailToSearch}`);
            return res.data.user;
        }
    });

    const handleSearch = e => {
        e.preventDefault();
        if (searchEmail.trim()) {
            setEmailToSearch(searchEmail.trim());
            refetch();
        }
    };

    const updateRole = async (role) => {
        try {
            const res = await axiosSecure.patch(`/users/update-role?email=${userResult.email}`, { role });

            if (res.data.modifiedCount > 0) {
                await MySwal.fire({
                    icon: 'success',
                    title: `${userResult.displayName} is now a ${role}!`,
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            }
        } catch (err) {
            console.error('Role update failed:', err);
            MySwal.fire('Error', 'Something went wrong!', 'error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Manage Admin Access</h2>

            <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6">
                <input
                    type="email"
                    value={searchEmail}
                    onChange={e => setSearchEmail(e.target.value)}
                    placeholder="Enter user email"
                    className="input input-bordered w-full"
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {isLoading && <p>Loading user...</p>}
            {isError && <p className="text-red-500">{error.message}</p>}

            {userResult && (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src={userResult.ProfilePic} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                                </td>
                                <td>{userResult.displayName}</td>
                                <td>{userResult.email}</td>
                                <td>
                                    <span className="badge badge-info">{userResult.role}</span>
                                </td>
                                <td>
                                    {userResult.role === 'admin' ? (
                                        <button
                                            className="btn btn-sm btn-error flex items-center gap-1"
                                            onClick={() => updateRole('user')}
                                        >
                                            <FaUserSlash /> Remove Admin
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-success flex items-center gap-1"
                                            onClick={() => updateRole('admin')}
                                        >
                                            <FaUserShield /> Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MakeAdmin;
