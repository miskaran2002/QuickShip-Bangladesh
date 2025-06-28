import React from 'react';

const features = [
    {
        title: 'Lightning-Fast Delivery',
        description: 'Get your orders delivered within 30 minutes or less – anywhere, anytime.',
        img: 'https://i.ibb.co/9kzR4yrr/pexels-artempodrez-5025502.jpg',
    },
    {
        title: 'Real-Time Tracking',
        description: 'Track your delivery live on the map – from warehouse to your doorstep.',
        img: 'https://i.ibb.co/KpMmfZHW/pexels-pavel-danilyuk-6407542.jpg',
    },
    {
        title: '24/7 Customer Support',
        description: 'Need help? Our friendly support team is always here to assist you.',
        img: 'https://i.ibb.co/hRDPm4cy/pexels-mart-production-7709255.jpg',
    },
];

const OurFeatures = () => {
    return (
        <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">🚀 Our Features</h2>

            <div className="space-y-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group flex flex-col md:flex-row items-center bg-base-200 rounded-2xl shadow-md p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                        <img
                            src={feature.img}
                            alt={feature.title}
                            className="w-full md:w-1/2 h-52 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                            <h3 className="text-xl font-semibold text-base-content mb-2">{feature.title}</h3>
                            <p className="text-base-content text-opacity-70">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurFeatures;
