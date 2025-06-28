import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        name: 'Amina Rahman',
        role: 'Online Shop Owner',
        comment:
            'ProFast helped me grow my business with lightning-fast deliveries. My customers are happier than ever!',
        img: 'https://i.ibb.co/nNp8zvV6/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confide.jpg',
    },
    {
        name: 'Tanvir Hossain',
        role: 'Courier Partner',
        comment:
            'Earning with ProFast is smooth and reliable. I love the flexibility and support from the team.',
        img: 'https://i.ibb.co/0pSxdLTj/portrait-happy-smiling-young-businessman-blue-suit-isolated-white-wall.jpg',
    },
    {
        name: 'Farzana Akter',
        role: 'Regular User',
        comment:
            'Whenever I need something delivered urgently, I trust ProFast. They are always on time.',
        img: 'https://i.ibb.co/HpGZCvVw/beautiful-smart-asian-young-entrepreneur-business-woman-owner-sme-checking-product-stock-scan-qr-cod.jpg',
    },
];

const CustomerTestimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const currentReview = testimonials[currentIndex];

    return (
        <section className="bg-slate-200 py-16 px-6 md:px-12 lg:px-24 text-center">
            {/* Top Image */}
            <img
                src="https://i.ibb.co/Pvtw62B4/business-woman-feeling-happy-smiling-looking-camera-while-working-her-office-home.jpg"
                alt="Customer Feedback"
                className="mx-auto rounded-2xl  h-[350px] w-[550px] mb-6"
            />

            {/* Title and Description */}
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-base text-base-content text-opacity-80 max-w-xl mx-auto mb-12">
                Trusted by thousands of happy users, merchants, and partners across the country. Here's what some of them have to say:
            </p>

            {/* Review Card */}
            <div className="relative max-w-xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="bg-base-200 p-6 rounded-xl shadow-md"
                    >
                        <img
                            src={currentReview.img}
                            alt={currentReview.name}
                            className="w-20 h-20 rounded-full mx-auto object-cover mb-4"
                        />
                        <h3 className="text-xl font-semibold">{currentReview.name}</h3>
                        <p className="text-sm text-accent">{currentReview.role}</p>
                        <p className="mt-4 text-base text-base-content text-opacity-80">“{currentReview.comment}”</p>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6 px-4">
                    <button
                        onClick={handlePrev}
                        className="btn btn-circle btn-outline btn-sm md:btn-md"
                    >
                        ❮
                    </button>
                    <button
                        onClick={handleNext}
                        className="btn btn-circle btn-outline btn-sm md:btn-md"
                    >
                        ❯
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CustomerTestimonials;

