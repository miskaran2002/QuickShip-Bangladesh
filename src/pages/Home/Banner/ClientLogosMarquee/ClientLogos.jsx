// src/components/Home/Clientbrands.jsx
import amazonVector from "../../../../assets/brands/amazon_vector.png";
import amazon from "../../../../assets/brands/amazon.png";
import casio from "../../../../assets/brands/casio.png";
import moonstar from "../../../../assets/brands/moonstar.png";
import randstad from "../../../../assets/brands/randstad.png";
import startPeople from "../../../../assets/brands/start-people 1.png"; // rename recommended
import start from "../../../../assets/brands/start.png";
import Marquee from "react-fast-marquee";


const brands = [amazonVector, amazon, casio, moonstar, randstad, startPeople, start];

const ClientLogos = () => {
    return (
        <section className="py-16 bg-base-200">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl text-primary font-bold text-center mb-8">Trusted by Leading Brands</h2>
                <Marquee gradient={false} speed={40} pauseOnHover={true}>
                    {brands.map((logo, index) => (
                        <div key={index} className="mx-6">
                            <img
                                src={logo}
                                alt={`Client logo ${index + 1}`}
                                className="h-6 w-auto object-contain"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default ClientLogos;
