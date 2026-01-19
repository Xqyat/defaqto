import './styles/App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Stocks from './pages/Stocks/Stocks';
import Gallery from './pages/Gallery/Gallery';
import Partners from './pages/Partners/Partners';
import Contacts from './pages/Contacts/Contacts';
import Events from './pages/Events/Events';



function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/stocks" element={<Stocks/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/partners" element={<Partners/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="/events" element={<Events/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
