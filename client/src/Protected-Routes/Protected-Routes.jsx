import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import  Login  from '../pages/Login';

const ProtectedRoutes = () => {
    const auth = useAuth();
    return auth ? <Outlet /> : <Login />
}


export default ProtectedRoutes;