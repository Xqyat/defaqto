import './styles/App.css';
import './assets/fonts/fonts.css'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import Menu from './pages/Menu/Menu';
import Contacts from './pages/Contacts/Contacts';

import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';

import NotFound from './pages/NotFound/NotFound';

import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminPanel  from './pages/AdminPanel/AdminPanel';
import AdminMenu from './pages/AdminMenu/AdminMenu';
import AdminEvents from './pages/AdminEvents/AdminEvents';


const MainLayout = () => (
  <>
    <Header isHome={window.location.pathname === '/'} />
    <Outlet />
    <Footer />
  </>
);



function App() {
  return (
    <Router>
      <Routes>        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<AdminPanel />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="events" element={<AdminEvents />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
