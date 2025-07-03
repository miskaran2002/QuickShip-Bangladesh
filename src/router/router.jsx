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
        }
    ]

   }
]);