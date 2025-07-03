import React from 'react';
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MySwal = withReactContent(Swal);

const regionDistricts = {
    Dhaka: ["Dhaka North", "Dhaka South", "Narayanganj", "Gazipur"],
    Chittagong: ["Chattogram", "Cox’s Bazar", "Rangamati"],
    Khulna: ["Khulna", "Bagerhat", "Satkhira"],
    Rajshahi: ["Rajshahi", "Natore", "Naogaon"],
    Barishal: ["Barisal", "Bhola", "Patuakhali"],
    Sylhet: ["Sylhet", "Moulvibazar", "Habiganj"],
    Rangpur: ["Rangpur", "Dinajpur", "Kurigram"]
};

const BeARider = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, watch, reset } = useForm();

    const selectedRegion = watch("region");

    const onSubmit = async (data) => {
        const riderData = {
            ...data,
            status: "pending",
            appliedAt: new Date().toISOString()
        };

        console.log("📝 Form Data:", riderData); // Remove this in production

        try {
            const res = await axiosSecure.post('/riders', riderData);
            if (res.data?.insertedId || res.data?.success) {
                await MySwal.fire("✅ Success", "Rider application submitted!", "success");
                reset();
            } else {
                await MySwal.fire("❌ Failed", "Submission failed, try again.", "error");
            }
        } catch (error) {
            console.error("Submit error:", error);
            await MySwal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl mt-6"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Become a Rider</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        defaultValue={user?.displayName || ''}
                        readOnly
                        {...register("name")}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="email"
                        defaultValue={user?.email || ''}
                        readOnly
                        {...register("email")}
                        className="input input-bordered w-full"
                    />

                    <input
                        type="number"
                        placeholder="Age"
                        {...register("age", { required: true })}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        {...register("phone", { required: true })}
                        className="input input-bordered w-full"
                    />

                    <input
                        type="text"
                        placeholder="National ID Card Number"
                        {...register("nid", { required: true })}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        placeholder="Bike Brand (e.g., Yamaha)"
                        {...register("bikeBrand", { required: true })}
                        className="input input-bordered w-full"
                    />

                    <input
                        type="text"
                        placeholder="Bike Registration Number"
                        {...register("bikeRegNumber", { required: true })}
                        className="input input-bordered w-full"
                    />

                    <select
                        {...register("region", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Region</option>
                        {Object.keys(regionDistricts).map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>

                    <select
                        {...register("district", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select District</option>
                        {selectedRegion && regionDistricts[selectedRegion]?.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>

                <textarea
                    placeholder="Any additional info (optional)"
                    {...register("additionalInfo")}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                ></textarea>

                <div className="text-center">
                    <button type="submit" className="btn btn-success px-10">Submit Rider Application</button>
                </div>
            </form>
        </motion.div>
    );
};

export default BeARider;
