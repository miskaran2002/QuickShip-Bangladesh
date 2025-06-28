import React from 'react';

const faqs = [
    {
        question: 'How fast is ProFast delivery?',
        answer:
            'Most deliveries are completed within 30 minutes depending on your location and the distance from the merchant.',
    },
    {
        question: 'How can I become a merchant partner?',
        answer:
            'You can apply directly through our “Become a Merchant” page. After verification, you’ll be onboarded quickly.',
    },
    {
        question: 'Is there any delivery fee?',
        answer:
            'Delivery fees vary depending on distance and item type, but we always ensure affordable rates.',
    },
];

const FAQ = () => {
    return (
        <section className="bg-base-100 py-16 px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-10">❓ Frequently Asked Questions</h2>

            <div className="space-y-4 max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <div key={index} className="collapse collapse-arrow bg-base-200 rounded-lg">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-lg font-semibold text-base-content peer-checked:text-primary">
                            {faq.question}
                        </div>
                        <div className="collapse-content text-base text-base-content text-opacity-80">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-10">
                <button className="btn btn-outline btn-primary text-base px-6">
                    See More FAQ's
                </button>
            </div>
        </section>
    );
};

export default FAQ;
