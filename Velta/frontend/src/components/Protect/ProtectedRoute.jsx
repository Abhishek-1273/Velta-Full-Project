import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) { return (
            <>
                <div>
                    <h1>Loading....</h1>
                </div>
            </>
        );
    };

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;