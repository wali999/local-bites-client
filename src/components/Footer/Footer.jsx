import React from 'react';
import logo from '../../assets/localbites.png'
import { Link } from 'react-router';
import { PiXLogo } from 'react-icons/pi';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
                <aside>
                    <img src={logo} className='w-50' alt="" />
                    <p className='font-semibold'>
                        Where locals share what's worth a bite!
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Links</h6>
                    <Link to='/' className="link link-hover">Home</Link>
                    <Link to='/allReviews' className="link link-hover">All Reviews</Link>
                    <Link to='/Register' className="link link-hover">Register</Link>
                </nav>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">

                        <a>
                            <PiXLogo className="w-6 h-6 " />
                        </a>


                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>

            </footer>
            <footer className="footer sm:footer-horizontal footer-center border-t border-gray-300 bg-base-300 text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by LocalBites</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;