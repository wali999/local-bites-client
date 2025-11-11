import React, { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';

const Login = () => {
    const { signInUser, signInWithGoogle } = use(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    const handleSignIn = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Login Successfully', {
                    position: "top-right",
                });

                setTimeout(() => {
                    navigate(location.state ? location.state : '/');
                }, 500);
            })
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode);
                toast.error('Login failed!');
            })
    }



    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result);
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    }

    return (
        <div className='flex justify-center items-center my-20'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-2xl text-center'>Login your account</h2>
                <form onSubmit={handleSignIn} className="card-body">
                    <fieldset className="fieldset">

                        {/* Email */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name='email'
                            className="input"
                            placeholder="Email"
                            required
                        />

                        {/* Password */}
                        <div className='relative'>
                            <label className="label">Password</label>
                            <input
                                type={show ? "text" : "password"}
                                name='password'
                                className="input"
                                placeholder="Password"
                                required
                            />
                            <span
                                onClick={() => setShow(!show)}
                                className="absolute right-7 top-8 cursor-pointer z-50"
                            >
                                {show ? <FaEye /> : <IoEyeOff />}
                            </span>
                        </div>

                        {
                            error && <p className='text-red-500 text-xs'>{error}</p>
                        }
                        <button type='submit' className="btn bg-green-600 hover:bg-green-700 text-white mt-4">Login</button>

                        <button
                            onClick={handleGoogleSignIn}
                            type='button'
                            className="btn mt-2 cursor-pointer"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="google"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>

                        <p className='font-semibold text-center pt-5'>Don't Have An Account ?{' '} <Link className='text-green-700' to='/register'>Register</Link></p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Login;