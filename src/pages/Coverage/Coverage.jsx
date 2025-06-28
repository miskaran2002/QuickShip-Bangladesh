import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const districts = [
    { name: "Bagerhat", coords: [22.651568, 89.785938] },
    { name: "Bandarban", coords: [22.195327, 92.218377] },
    { name: "Barguna", coords: [22.095291, 90.112069] },
    { name: "Barisal", coords: [22.701002, 90.353451] },
    { name: "Bhola", coords: [22.685923, 90.648179] },
    { name: "Bogura", coords: [24.846522, 89.377934] },
    { name: "Brahmanbaria", coords: [23.957090, 91.111928] },
    { name: "Chandpur", coords: [23.233258, 90.671291] },
    { name: "Chattogram", coords: [22.356851, 91.783182] },
    { name: "Chuadanga", coords: [23.640196, 88.841841] },
    { name: "Cox's Bazar", coords: [21.427229, 92.005806] },
    { name: "Cumilla", coords: [23.460691, 91.180889] },
    { name: "Dhaka", coords: [23.810331, 90.412521] },
    { name: "Dinajpur", coords: [25.627912, 88.633175] },
    { name: "Faridpur", coords: [23.607052, 89.842939] },
    { name: "Feni", coords: [23.017079, 91.396532] },
    { name: "Gaibandha", coords: [25.328751, 89.528088] },
    { name: "Gazipur", coords: [23.999940, 90.420272] },
    { name: "Gopalganj", coords: [23.005085, 89.826605] },
    { name: "Habiganj", coords: [24.374945, 91.415540] },
    { name: "Jamalpur", coords: [24.937533, 89.937775] },
    { name: "Jashore", coords: [23.166430, 89.208112] },
    { name: "Jhalokathi", coords: [22.640639, 90.198465] },
    { name: "Jhenaidah", coords: [23.544653, 89.153921] },
    { name: "Joypurhat", coords: [25.096774, 89.022763] },
    { name: "Khagrachari", coords: [23.119285, 91.984663] },
    { name: "Khulna", coords: [22.845641, 89.540328] },
    { name: "Kishoreganj", coords: [24.444937, 90.776575] },
    { name: "Kurigram", coords: [25.805445, 89.636174] },
    { name: "Kushtia", coords: [23.901258, 89.120482] },
    { name: "Lakshmipur", coords: [22.942477, 90.841184] },
    { name: "Lalmonirhat", coords: [25.917152, 89.445626] },
    { name: "Madaripur", coords: [23.164102, 90.189680] },
    { name: "Magura", coords: [23.485399, 89.419956] },
    { name: "Manikganj", coords: [23.864401, 89.968070] },
    { name: "Meherpur", coords: [23.762213, 88.631821] },
    { name: "Moulvibazar", coords: [24.482934, 91.777417] },
    { name: "Munshiganj", coords: [23.542255, 90.530483] },
    { name: "Mymensingh", coords: [24.747149, 90.420273] },
    { name: "Naogaon", coords: [24.801174, 88.948562] },
    { name: "Narail", coords: [23.154878, 89.495163] },
    { name: "Narayanganj", coords: [23.623800, 90.500038] },
    { name: "Narsingdi", coords: [23.932233, 90.715041] },
    { name: "Natore", coords: [24.420556, 88.993456] },
    { name: "Netrokona", coords: [24.883154, 90.727888] },
    { name: "Nilphamari", coords: [25.931794, 88.856006] },
    { name: "Noakhali", coords: [22.824212, 91.099398] },
    { name: "Pabna", coords: [24.006355, 89.237216] },
    { name: "Panchagarh", coords: [26.341100, 88.554160] },
    { name: "Patuakhali", coords: [22.359289, 90.329574] },
    { name: "Pirojpur", coords: [22.578760, 89.972145] },
    { name: "Rajbari", coords: [23.757430, 89.644462] },
    { name: "Rajshahi", coords: [24.374945, 88.604195] },
    { name: "Rangamati", coords: [22.732418, 92.298513] },
    { name: "Rangpur", coords: [25.746024, 89.250014] },
    { name: "Satkhira", coords: [22.708638, 89.071706] },
    { name: "Shariatpur", coords: [23.242299, 90.434772] },
    { name: "Sherpur", coords: [25.020493, 90.015296] },
    { name: "Sirajganj", coords: [24.453397, 89.700681] },
    { name: "Sunamganj", coords: [25.065804, 91.395011] },
    { name: "Sylhet", coords: [24.894930, 91.868706] },
    { name: "Tangail", coords: [24.251345, 89.916710] },
    { name: "Thakurgaon", coords: [26.033694, 88.460260] },
];

function MapZoom({ coords }) {
    const map = useMap();
    if (coords) {
        map.setView(coords, 8);
    }
    return null;
}

const Coverage = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [goCoords, setGoCoords] = useState(null);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);

        const filtered = districts.filter((d) =>
            d.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);

        const exact = districts.find(
            (d) => d.name.toLowerCase() === value.trim().toLowerCase()
        );
        setSelectedDistrict(exact || null);
    };

    const handleSuggestionClick = (district) => {
        setSearchText(district.name);
        setSelectedDistrict(district);
        setSuggestions([]);
    };

    const handleGoClick = () => {
        if (selectedDistrict) {
            setGoCoords(selectedDistrict.coords);
        }
    };

    const markersToShow =
        selectedDistrict && goCoords ? [selectedDistrict] : districts;

    return (
        <div className="flex flex-col items-center px-4 py-6 space-y-6">
            <h1 className="text-3xl font-bold text-center text-primary">
                We are available in 64 Districts
            </h1>

            {/* Search Box + Go Button */}
            <div className="w-full max-w-md relative z-[1000]">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search District (e.g., Dhaka)"
                        className="input input-bordered input-primary w-full"
                        value={searchText}
                        onChange={handleSearch}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleGoClick}
                        disabled={!selectedDistrict}
                    >
                        Go
                    </button>
                </div>

                {suggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded z-[1000] max-h-64 overflow-auto">
                        {suggestions.map((district, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSuggestionClick(district)}
                            >
                                {district.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Map */}
            <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg z-0">
                <MapContainer
                    center={[23.685, 90.3563]}
                    zoom={7}
                    scrollWheelZoom
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {goCoords && <MapZoom coords={goCoords} />}
                    {markersToShow.map((district, index) => (
                        <Marker key={index} position={district.coords} icon={customIcon}>
                            <Popup>{district.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
