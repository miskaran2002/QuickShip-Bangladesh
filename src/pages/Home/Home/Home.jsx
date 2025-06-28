import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../Services/OurServices';
import ClientLogos from '../Banner/ClientLogosMarquee/ClientLogos';
import OurFeatures from '../features/OurFeatures';
import BeAMerchant from '../features/merchent/BeAMerchant';
import HowItWorks from '../howit works/HowItWorks';
import FAQ from '../freequently ask question/FAQ';
import CustomerTestimonials from '../reviews/CustomerTestimonials';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <ClientLogos></ClientLogos>
            <OurFeatures></OurFeatures>           
            <BeAMerchant></BeAMerchant>
            <FAQ></FAQ>
            <CustomerTestimonials></CustomerTestimonials>

        </div>
    );
};

export default Home;