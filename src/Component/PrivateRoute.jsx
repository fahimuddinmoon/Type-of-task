import { useContext } from "react";


import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <Loading></Loading>
    }
    if (user) {
        return children
    }
    return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;