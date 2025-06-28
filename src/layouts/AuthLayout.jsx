import React from 'react';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png'
import ProfastLogo from '../pages/shared/profastlogo/ProfastLogo';

const AuthLayout = () => {
    return (
        <div className="p-12 bg-base-200 ">
            <div>
                <ProfastLogo></ProfastLogo>
            </div>
           

            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <img
                        src={authImage}
                        alt="Authentication"
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </div>
                
                <div className='flex-1'>
                   <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;