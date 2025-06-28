import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const BeAMerchant = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section
           data-aos="flip-left"
            className="relative bg-cover bg-center bg-no-repeat  h-[410px] min-h-[300px] py-20 mx-2 rounded-xl mb-4 lg:px-32 text-white"
            style={{
                backgroundImage:
                    "url('https://i.ibb.co/3mTg2rrL/portrait-beautiful-young-asian-business-woman-work-from-home-with-laptop-mobile-phone-with-cardboard.jpg')",
            }}
        >
            

            {/* Content */}
            <div
                className="relative z-45 max-w-3xl mx-auto  text-center"
                data-aos="fade-up"
            >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow">
                    Become a <span className="text-primary">ProFast</span> Merchant
                </h2>
                <p className="text-lg md:text-xl mb-8 text-gray-100">
                    Join our platform to sell and deliver your products faster than ever. Boost your business with ProFast’s trusted delivery network.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="btn btn-primary px-4 md:px-6 text-base md:text-lg h-10 md:h-auto">
                        Become a Merchant
                    </button>
                    <button className="btn btn-outline btn-accent px-4 md:px-6 text-base md:text-lg h-10 md:h-auto">
                        Earn with ProFast Courier
                    </button>
                </div>

            </div>
        </section>
    );
};

export default BeAMerchant;
