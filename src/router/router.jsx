import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcelForm from "../pages/sendpercel/SendParcelForm";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";






export const router = createBrowserRouter([
    {
        path: "/",
        Component:RootLayout,
        children: [
            {
                index: true,
               Component:Home
            },
            {
                path: "coverage",
                Component:Coverage,
            },
            {
                path:"forbidden",
                Component:Forbidden
            },
            {
                path:"beARider",
                element:<PrivateRoute><BeARider></BeARider></PrivateRoute>

            },
            {
                path:'sendParcel',
                element:<PrivateRoute><SendParcelForm></SendParcelForm></PrivateRoute>
            }
        ],
    },

    {
       path:'/',
       Component:AuthLayout,
       children: [
        {
            path: 'login',
            Component:Login,
        },
        {
            path: 'register',
            Component:Register,
        }
       ]
   },
   {
    path: '/dashboard',
    element:<PrivateRoute>
             <DashboardLayout></DashboardLayout>
           </PrivateRoute>,
    children: [
        {
           path: 'myParcels',
           Component:MyParcels 
        },
        {
            path: 'payment/:parcelId',
            Component:Payment,
        },
        {
            path: 'paymentHistory',
            Component:PaymentHistory

        },
        {
            path: 'track',
            Component:TrackParcel
        },
        {
           path:'assignRider',
           element:<AdminRoute><AssignRider></AssignRider></AdminRoute>
        },
        {
            path: 'pendingRiders',
           element:<AdminRoute><PendingRiders></PendingRiders></AdminRoute>
        },
        {
            path: 'activeRiders',
           element:<AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
        },
        {
            path: 'makeAdmin',           
            element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
        }

    ]

   }
]);