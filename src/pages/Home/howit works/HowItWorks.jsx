import React from 'react';

const steps = [
    {
        title: '1. Place Your Order',
        description: 'Choose products from our partners and confirm your order in just a few clicks.',
        icon: '🛒',
    },
    {
        title: '2. We Pick It Up',
        description: 'Our courier collects the product from the merchant or store instantly.',
        icon: '📦',
    },
    {
        title: '3. Fast Delivery',
        description: 'Get your order delivered within 30 minutes—right to your doorstep.',
        icon: '🚚',
    },
];

const HowItWorks = () => {
    return (
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-base-100 text-base-content">
            <h2 className="text-4xl font-bold text-center mb-12">🛠️ How It Works</h2>

            <div className="grid gap-8 md:grid-cols-3" data-aos="fade-up">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="bg-base-200 rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="text-5xl mb-4">{step.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-base-content text-opacity-70">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
