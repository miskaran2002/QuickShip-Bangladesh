import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../Sociallogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate =useNavigate();


    const onSubmit = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from);
            })
            .catch(error => {
                console.error('Login error:', error);
                // Handle login error (e.g., show a notification)
            });
    }
    return (
        <div className="card bg-base-100 w-full      max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Please Login!</h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input type="email"{...register('email')} className="input" placeholder="Email" />


                        <label className="label">Password</label>
                        <input type="password" className="input"
                            {...register('password',
                                { required: true, minLength: 6 }
                            )}
                            placeholder="Password" />

                        {
                            errors.password?.type && errors.password.type === 'required' && <span className="text-red-500">Password is required</span>
                        }
                        {
                            errors.password?.type && errors.password.type === 'minLength' && <span className="text-red-500">Password must be at least 6 characters or longer</span>
                        }


                        <div><a className="link link-hover">Forgot password?</a></div>


                        <button className="btn btn-success mt-4">Login</button>
                    </fieldset>
                    <p > <small>Don't have an Account?  please</small><Link state={{from}} className='btn btn-link' to='/register'>Register</Link></p>

                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;