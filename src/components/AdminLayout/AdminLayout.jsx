import { Outlet, Link, useLocation } from "react-router-dom";
import "./AdminLayout.css";
import Button from "../Button/Button";

const AdminLayout = () => {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__top">
          <h2 className="admin-sidebar__title">DeFAQto Admin</h2>

          <nav className="admin-sidebar-navbar">
            <ul className="admin-sidebar-navbar__list">
              <li>
                <Link
                  to="/admin"
                  className={isActive("/admin") ? "admin-sidebar__link active" : "admin-sidebar__link"}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/menu"
                  className={isActive("/admin/menu") ? "admin-sidebar__link active" : "admin-sidebar__link"}
                >
                  Меню
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/events"
                  className={isActive("/admin/events") ? "admin-sidebar__link active" : "admin-sidebar__link"}
                >
                  События
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="admin-sidebar__bottom">
          <Button onClick={logout}>Выход</Button>
        </div>
      </aside>

      <main className="admin-layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;