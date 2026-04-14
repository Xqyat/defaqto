import { Outlet, Link, useLocation } from 'react-router-dom';
import './AdminLayout.css';
import Button from '../Button/Button';

const AdminLayout = () => {
  const location = useLocation();
  
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };
  return (
    <div>
      <div className="admin-sidebar" >
        <h2>DeFAQto Admin</h2>
        <nav className="admin-sidebar-navbar">
            <ul>
                <li>
                    <Link to="/admin" 
                    className={location.pathname === "/admin" ? "active" : ""}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin/menu">
                        Меню
                    </Link>
                </li>
                <li>
                    <Link to="/admin/events">
                        События
                    </Link>
                </li>
                <li>
                    <Link to="/admin/gallery">
                        Галерея
                    </Link>
                </li>
            </ul>              
        </nav>
        <Button onClick={logout}>Выход</Button>
      </div>
      <main className="admin">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
