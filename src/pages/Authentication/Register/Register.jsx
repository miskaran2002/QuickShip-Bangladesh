import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../Sociallogin/SocialLogin';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser }=  useAuth();
    const onSubmit = (data) => {
        console.log(data);
      createUser(data.email, data.password)
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            console.error('Error creating user:', error);
        });
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create An Account now!</h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input type="email"
                            className="input"
                            {...register('email', {
                                required: true
                            })}
                            placeholder="Email" />
                        {errors.email?.type && <span className="text-red-500">Email is required</span>}


                        <label className="label">Password</label>
                        <input type="password" className="input"
                            {...register('password', {
                                required: true,
                                minLength: 6
                            })}
                            placeholder="Password" />
                        {
                            errors.password?.type && errors.password.type === 'required' && <span className="text-red-500">Password is required</span>
                        }
                        {
                            errors.password?.type && errors.password.type === 'minLength' && <span className="text-red-500">Password must be at least 6 characters or longer</span>
                        }


                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button className="btn btn-success  mt-4">Register</button>
                    </fieldset>
                    <p><small>Already have an Account?</small> 
                        <Link className='btn btn-link' to='/login'>Login</Link></p>
                </form>
                <SocialLogin></SocialLogin>
               
            </div>
        </div>

    );
};

export default Register;