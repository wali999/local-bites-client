import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);


    const location = useLocation();


    if (loading) {
        return <Loading />;
    }

    //if user logged in then return children
    if (user && user?.email) {
        return children;
    }
    //if user logged out then navigate to Login
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;