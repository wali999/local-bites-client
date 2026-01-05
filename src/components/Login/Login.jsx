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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAutoFill = () => {
        setEmail('fahid@gmail.com');
        setPassword('Asd123');

        toast.success('Demo credentials filled');
    };

    const handleSignIn = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(() => {
                toast.success('Login Successfully');
                setTimeout(() => {
                    navigate(location.state ? location.state : '/');
                }, 500);
            })
            .catch((error) => {
                setError(error.code);
                toast.error('Login failed!');
            });
    }



    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                toast.success(`Welcome, ${result.user.displayName || "User"}!`);
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className='flex justify-center items-center mt-10 mb-30 min-h-122'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='text-2xl text-center font-bold mt-5 text-base-content'><span className="text-green-600">Login</span > your account</h2>
                <form onSubmit={handleSignIn} className="card-body">
                    <fieldset className="fieldset">

                        {/* Email */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name='email'
                            className="input w-full"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* Password */}
                        <div className='relative'>
                            <label className="label">Password</label>
                            <input
                                type={show ? "text" : "password"}
                                name='password'
                                className="input w-full"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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


                        <button
                            type="button"
                            onClick={handleAutoFill}
                            className="btn btn-outline btn-sm mt-4"
                        >
                            Auto Fill Demo User
                        </button>

                        <button
                            type='submit'
                            className="btn bg-green-600 hover:bg-green-700 text-white mt-4"
                        >
                            Login
                        </button>

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