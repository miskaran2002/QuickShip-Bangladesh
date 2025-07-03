import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../Sociallogin/SocialLogin';
import axios from 'axios';
import { useState } from 'react';
import useAxios from '../../../hooks/useAxios';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser, updateUserProfile }=  useAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance =useAxios();
    const onSubmit = (data) => {
        console.log(data);
      createUser(data.email, data.password)
        .then(async(result) => {
            console.log(result.user);
            // update user info in the database
            const userInfo= {
              
                email: data.email,
                role: 'user',// default role
                createdAt: new Date().toISOString(),
                ProfilePic: profilePic,
                displayName: data.name,
                last_login: new Date().toISOString()
               
            }
            const userRes= await axiosInstance.post('/users', userInfo);
            console.log(userRes.data);

            // update user profile in the firebase
            const userProfile={
                displayName: data.name,
                photoURL: profilePic
            }
            updateUserProfile(userProfile)
            .then(() => {
              console.log('User profile updated successfully');  
            })
            .catch(error => {
                console.error('Error updating user profile:', error);
            })
        })
        .catch(error => {
            console.error('Error creating user:', error);
        });
    };


    const handleImageUpload = async (event) => {
       const image= event.target.files[0];
       console.log(image);
       const formData = new FormData();
       formData.append('image', image);
        const imageUploadUrl = ` https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key} `
  
        const res = await axios.post(imageUploadUrl, formData)
        setProfilePic(res.data.data.url);
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create An Account now!</h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <fieldset className="fieldset">

                        {/* name */}
                        <label className="label">Your Name</label>
                        <input type="text"
                            className="input"
                            {...register('name', {
                                required: true
                            })}
                            placeholder="Your Name" />
                        {errors.email?.type && <span className="text-red-500">Name is required</span>}

                        {/* name */}
                        <label className="label">Your Name</label>
                        <input type="file"
                        onChange={handleImageUpload}
                        className="input"                       placeholder="Your Profile Picture" />
                       

                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email"
                            className="input"
                            {...register('email', {
                                required: true
                            })}
                            placeholder="Email" />
                        {errors.email?.type && <span className="text-red-500">Email is required</span>}

                        {/* password */}
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