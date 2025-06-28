// src/components/Home/OurServices.jsx
import {
    FaShippingFast,
    FaMapMarkedAlt,
    FaBoxes,
    FaMoneyBillWave,
    FaBuilding,
    FaUndoAlt,
} from 'react-icons/fa';
import ServiceCard from './ServiceCard';

const services = [
    {
        id: 1,
        icon: <FaShippingFast className="text-4xl text-primary" />,
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
        id: 2,
        icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
        id: 3,
        icon: <FaBoxes className="text-4xl text-primary" />,
        title: "Fulfillment Solution",
        description:
            "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
        id: 4,
        icon: <FaMoneyBillWave className="text-4xl text-primary" />,
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
        id: 5,
        icon: <FaBuilding className="text-4xl text-primary" />,
        title: "Corporate Service / Contract In Logistics",
        description:
            "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
        id: 6,
        icon: <FaUndoAlt className="text-4xl text-primary" />,
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
];

const OurServices = () => {
    return (
        <section className="py-16 bg-base-100">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                <p className="mb-12 text-base-content">
                    We offer reliable delivery and logistics solutions for businesses of all sizes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;
  