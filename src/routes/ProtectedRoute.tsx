import React from "react";
import { Navigate, useLocation} from "react-router-dom";
import { AuthContext} from "../provider/AuthProvider";

// @ts-ignore
const ProtectedRoute = ({ children }) => {
    const { user } = React.useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        return (
            <Navigate to='/login' state={{ from: location }} />
    };

    return children;
};

export default ProtectedRoute;