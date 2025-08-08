🚀 QuickShip Bangladesh
QuickShip Bangladesh is a fast and reliable parcel delivery platform designed to simplify logistics across all 64 districts of Bangladesh. With a user-friendly interface, real-time tracking, and efficient admin and rider dashboards, it ensures seamless operations from booking to delivery.

💡 Ideal for small businesses, e-commerce sellers, and individuals who want hassle-free nationwide parcel delivery.

<!-- Replace with your actual screenshot link -->

🛠 Technologies Used
Frontend:

React.js

Tailwind CSS

DaisyUI

React Router DOM

Leaflet.js (for interactive maps)

Axios

React Hook Form

Backend:

Node.js

Express.js

MongoDB Atlas

Firebase Admin SDK

JWT Authentication

Others:

Firebase Authentication

Imgbb API (for image uploads)

Stripe (for payment processing)

🌟 Core Features
📦 Parcel Booking: Easily book parcels with sender and receiver details.

👤 User Dashboard: View bookings, make payments, and track delivery status.

🚴‍♂️ Rider Dashboard: Accept delivery tasks, update statuses, and manage deliveries.

🧑‍💼 Admin Panel: Manage users, parcels, riders, payments, and more.

📍 Live Coverage Map: Interactive map showing delivery coverage across Bangladesh.

🔐 JWT Protected Routes: Secure access to dashboards and sensitive endpoints.

💳 Stripe Integration: Seamless payment processing.

🔄 Real-Time Status Updates: Track parcel from booking to delivery completion.

📦 Dependencies Used
bash
Copy
Edit
"axios"
"react"
"react-dom"
"react-router-dom"
"react-hook-form"
"leaflet"
"firebase"
"jsonwebtoken"
"express"
"mongoose"
"cors"
"dotenv"
"stripe"
"firebase-admin"
"bcryptjs"
🧩 How to Run This Project Locally
🔧 1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/quickship-bangladesh.git
cd quickship-bangladesh
🖥️ 2. Setup Client
bash
Copy
Edit
cd client
npm install
npm run dev
Update client/.env:

makefile
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_api_key
...
🔙 3. Setup Server
bash
Copy
Edit
cd server
npm install
npm run dev
Update server/.env:

makefile
Copy
Edit
PORT=5000
MONGODB_URI=your_mongo_connection
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_key
...
✅ 4. Ready to Go
Visit http://localhost:5173 (or your Vite port) in your browser.

🔗 Live Project Links
🌐 Client: quickshipbd.web.app

🧠 Admin Panel: admin.quickshipbd.web.app

📁 Backend: Render/MongoDB Deployment Link

📄 License
MIT © Your Name

