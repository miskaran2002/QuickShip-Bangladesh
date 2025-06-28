// src/components/Home/ServiceCard.jsx

// src/components/Home/ServiceCard.jsx

const ServiceCard = ({ icon, title, description }) => {
    return (
        <div className="card bg-base-200 shadow-2xl transition hover:bg-primary hover:text-white duration-300">
            <div className="card-body items-center text-center">
                {icon}
                <h3 className="text-xl font-semibold mt-4">{title}</h3>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    );
};


export default ServiceCard;
  