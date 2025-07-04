import React from 'react';
import { Link } from 'react-router'; // ✅ fixed: was 'react-router'
import { ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Forbidden = () => {
    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <motion.div
                className="max-w-md p-6 bg-white shadow-xl rounded-2xl border border-red-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <div className="flex justify-center mb-4 text-red-600">
                    <ShieldAlert size={60} />
                </div>
                <h1 className="text-3xl font-bold mb-2">Access Forbidden</h1>
                <p className="text-gray-600 mb-6">
                    You don’t have permission to view this page. Please contact the administrator or go back to the homepage.
                </p>
                <Link
                    to="/"
                    className="btn btn-success hover:btn-accent text-white font-semibold"
                >
                    Go Home
                </Link>

            </motion.div>
        </motion.div>
    );
};

export default Forbidden;
