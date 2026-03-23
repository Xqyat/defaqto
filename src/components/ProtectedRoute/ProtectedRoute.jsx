import { Navigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout/AdminLayout';

const ProtectedRoute = () => {
  const token = localStorage.getItem('adminToken');
  console.log(token);
  return token ? <AdminLayout /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;