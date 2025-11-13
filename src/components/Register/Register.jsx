import React, { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router';

const Register = () => {

    const { signInWithGoogle, createUser, setUser, updateUser } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);


    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;


        const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!regExp.test(password)) {
            toast.error(
                "Password must be at least 6 characters long, include at least one Uppercase letter and one Lowercase letter"
            );
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match. Please confirm your password again.");
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                    })
                    .catch((error) => {
                        toast.error(error);
                    });
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast(errorCode, errorMessage);
            });

    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                toast.success(`Welcome, ${result.user.displayName || "User"}!`);
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className='flex justify-center items-center my-10'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='text-2xl text-center font-bold text-gray-800'><span className="text-green-600">Register</span> your account</h2>
                <form onSubmit={handleRegister} className="card-body">
                    <fieldset className="fieldset">
                        {/* Name */}
                        <label className="label">Name</label>
                        <input
                            type="text"
                            name='name'
                            className="input"
                            placeholder="Name"
                            required
                        />


                        {/* Email */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name='email'
                            className="input"
                            placeholder="Email"
                            required
                        />

                        {/* Photo URL */}
                        <label className="label">Photo URL</label>
                        <input
                            type="text"
                            name='photo'
                            className="input"
                            placeholder="Photo URL"
                            required
                        />


                        {/* Password */}
                        <div className="relative">
                            <label className="label">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input"
                                placeholder="Password"
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-7 top-8 cursor-pointer z-50"
                            >
                                {showPassword ? <FaEye /> : <IoEyeOff />}
                            </span>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label className="label">Confirm Password</label>
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                className="input"
                                placeholder="Confirm Password"
                                required
                            />
                            <span
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-7 top-8 cursor-pointer z-50"
                            >
                                {showConfirm ? <FaEye /> : <IoEyeOff />}
                            </span>
                        </div>


                        <button type='submit' className="btn bg-green-600 hover:bg-green-700 text-white mt-4">Register</button>

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

                        <p className='font-semibold text-center pt-5'>Allready Have An Account ?{' '} <Link className='text-green-700' to='/login'>Login</Link></p>
                    </fieldset>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;