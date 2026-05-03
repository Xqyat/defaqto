import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import LogoBlack from "../../assets/images/DeFaqtoLogoBlack.png";
import HeaderVideo from "../../assets/videos/HeaderVideo.mp4";
import Button from "../Button/Button.jsx";
import MobileMenu from '../MobileMenu/MobileMenu.jsx';
import BookingFormModal from '../BookingFormModal/BookingFormModal.jsx'
import "./Header.css";



function Header(){
    const { pathname } = useLocation();
    const isHome = pathname === '/';

    
    const [isOpen, setIsOpen] = useState(false);
    const handleBookingSubmit = (data) => {
        console.log(data);
      };
    return(
        <>
            <header className="site-header">
                <div className="site-header__bar"></div>
                <div className="site-header__main">
                    <div className="site-header__logo">
                        <NavLink to='/'>
                            <img src={LogoBlack} alt="DeFAQto" />
                        </NavLink>
                    </div>
                    <nav className="main-navbar">
                        <ul>
                            <li><NavLink to='/'>Главная</NavLink></li>
                            <li><NavLink to='/events'>Афиша</NavLink></li>
                            <li><NavLink to='/menu'>Меню</NavLink></li>
                            <li><NavLink to='/contacts'>Контакты</NavLink></li>
                        </ul>
                    </nav>
                    <MobileMenu />
                </div>
                <div className="header-hero">
                    {isHome && (
                        <video 
                        className="hero-video"
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        controls={false}>
                        <source src={HeaderVideo} type="video/mp4" alt="Фоновое видео бара DeFAQto с атмосферным освещением"/>
                        </video>
                    )}
                    <Button onClick={() => setIsOpen(true)}>Забронировать</Button>
                    <BookingFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleBookingSubmit}/>
                </div>
            </header>
        </>
    )
}
export default Header;