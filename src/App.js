import './styles/App.css';
import './assets/fonts/fonts.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import Menu from './pages/Menu/Menu';
import Gallery from './pages/Gallery/Gallery';
import Contacts from './pages/Contacts/Contacts';



function App() {
  return (
    <Router>
      <Header isHome={window.location.pathname === '/'}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
