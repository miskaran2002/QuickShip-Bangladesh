import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAuth from '../../hooks/useAuth';

const MySwal = withReactContent(Swal);

const regionServiceCenters = {
    Dhaka: ["Uttara Hub", "Mirpur Center", "Gulshan SC"],
    Chittagong: ["Agrabad Hub", "Pahartali SC"],
    Khulna: ["Shibbari SC", "KDA SC"],
    Rajshahi: ["Rajpara SC", "Uposhohor SC"],
    Barishal: ["Nathullabad SC", "Band Road Hub"],
    Sylhet: ["Zindabazar SC", "Amberkhana Center"],
    Rangpur: ["Jahaj Company SC", "Medical More SC"]
};

const SendParcelForm = () => {
    const { register, handleSubmit, watch, reset } = useForm();
    const [pendingParcelData, setPendingParcelData] = useState(null);
    const { user } = useAuth();

    const parcelType = watch("parcelType");
    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");

    const onSubmit = (data) => {
        const { parcelType, weight, senderServiceCenter, receiverServiceCenter } = data;
        const withinCity = senderServiceCenter === receiverServiceCenter;

        let base = 0, weightCharge = 0, intercityCharge = 0, total = 0;
        const wt = parseFloat(weight) || 0;

        if (parcelType === "document") {
            base = withinCity ? 60 : 80;
        } else if (parcelType === "non-document") {
            if (wt <= 3) {
                base = withinCity ? 110 : 150;
            } else {
                base = withinCity ? 110 : 150;
                weightCharge = wt * 40;
                if (!withinCity) intercityCharge = 40;
            }
        }

        total = base + weightCharge + intercityCharge;

        const now = new Date();
        const isoString = now.toISOString();
        const formattedDate = now.toLocaleDateString("en-GB");
        const formattedTime = now.toLocaleTimeString("en-US");

        const submission = {
            ...data,
            cost: total,
            creatorEmail: user?.email || "anonymous",
            creation_date: isoString,
            display_date: formattedDate,
            display_time: formattedTime,
            payment_status: "unpaid", // for tracking
            delivery_status: "not_collected", // for tracking
            trackingId: `TRK-${Date.now()}` // optional
        };

        const breakdownHTML = `
            <div class="text-left text-sm">
                <table class="w-full text-left mb-4">
                    <tr><td>📦 Base Cost:</td><td>৳${base.toFixed(2)}</td></tr>
                    <tr><td>⚖️ Weight Charge:</td><td>৳${weightCharge.toFixed(2)}</td></tr>
                    <tr><td>🚚 Intercity Fee:</td><td>৳${intercityCharge.toFixed(2)}</td></tr>
                </table>
                <div class="text-lg font-bold text-green-600">Total Cost: ৳${total.toFixed(2)}</div>
            </div>
        `;

        Swal.fire({
            title: "Review Delivery Cost",
            html: breakdownHTML,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "✅ Proceed to Payment",
            cancelButtonText: "✏️ Go Back",
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Saved to DB:", submission);
                Swal.fire("Success!", "Parcel Submitted Successfully!", "success");
                reset();
                setPendingParcelData(null);
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl mt-6"
        >
            <h2 className="text-2xl font-bold mb-1 text-center">Send a Parcel</h2>
            <p className="text-center text-sm mb-6 text-gray-500">
                Please fill out the form to schedule a pickup and delivery
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* === Parcel Info === */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <h3 className="text-lg font-semibold mb-2">Parcel Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select {...register("parcelType", { required: true })} className="select select-bordered">
                            <option value="">Select Type</option>
                            <option value="document">Document</option>
                            <option value="non-document">Non-document</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Parcel Title"
                            {...register("parcelTitle", { required: true })}
                            className="input input-bordered"
                        />

                        {parcelType === "non-document" && (
                            <input
                                type="number"
                                placeholder="Weight (kg)"
                                step="0.1"
                                {...register("weight")}
                                className="input input-bordered"
                            />
                        )}
                    </div>
                </motion.div>

                {/* === Sender Info === */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    <h3 className="text-lg font-semibold mb-2">Sender Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Sender Name"
                            {...register("senderName", { required: true })}
                            className="input input-bordered"
                        />
                        <input
                            type="text"
                            placeholder="Sender Contact"
                            {...register("senderContact", { required: true })}
                            className="input input-bordered"
                        />
                        <select {...register("senderRegion", { required: true })} className="select select-bordered">
                            <option value="">Select Region</option>
                            {Object.keys(regionServiceCenters).map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                        <select {...register("senderServiceCenter", { required: true })} className="select select-bordered">
                            <option value="">Select Service Center</option>
                            {senderRegion && regionServiceCenters[senderRegion]?.map((sc) => (
                                <option key={sc} value={sc}>{sc}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Sender Address"
                            {...register("senderAddress", { required: true })}
                            className="input input-bordered"
                        />
                        <textarea
                            placeholder="Pickup Instructions"
                            {...register("pickupInstructions", { required: true })}
                            className="textarea textarea-bordered"
                        />
                    </div>
                </motion.div>

                {/* === Receiver Info === */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                    <h3 className="text-lg font-semibold mb-2">Receiver Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Receiver Name"
                            {...register("receiverName", { required: true })}
                            className="input input-bordered"
                        />
                        <input
                            type="text"
                            placeholder="Receiver Contact"
                            {...register("receiverContact", { required: true })}
                            className="input input-bordered"
                        />
                        <select {...register("receiverRegion", { required: true })} className="select select-bordered">
                            <option value="">Select Region</option>
                            {Object.keys(regionServiceCenters).map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                        <select {...register("receiverServiceCenter", { required: true })} className="select select-bordered">
                            <option value="">Select Service Center</option>
                            {receiverRegion && regionServiceCenters[receiverRegion]?.map((sc) => (
                                <option key={sc} value={sc}>{sc}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Receiver Address"
                            {...register("receiverAddress", { required: true })}
                            className="input input-bordered"
                        />
                        <textarea
                            placeholder="Delivery Instructions"
                            {...register("deliveryInstructions", { required: true })}
                            className="textarea textarea-bordered"
                        />
                    </div>
                </motion.div>

                {/* === Submit === */}
                <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <button type="submit" className="btn btn-success px-10">
                        Submit
                    </button>
                </motion.div>
            </form>
        </motion.div>
    );
};

export default SendParcelForm;
