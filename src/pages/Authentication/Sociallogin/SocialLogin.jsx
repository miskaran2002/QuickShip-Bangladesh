import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router'; 
import useAxios from '../../../hooks/useAxios'; 

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const axiosInstance = useAxios(); 
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            const userInfo = {
                email: user.email,
                displayName: user.displayName,
                ProfilePic: user.photoURL,
                role: 'user',
                createdAt: new Date().toISOString(),
                last_login: new Date().toISOString(),
            };

            // Save user to database
            const res = await axiosInstance.post('/users', userInfo);
            console.log('User saved to DB:', res.data);

            navigate(from, { replace: true });
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div className="text-center">
            <p className="text-[#828282] text-[14px] mb-4">or</p>
            <button
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5]"
            >
                <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <g>
                        <path d="m0 0H512V512H0" fill="#fff" />
                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                    </g>
                </svg>
                <span className="ml-2">Login with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;
