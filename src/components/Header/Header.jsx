import { NavLink } from "react-router-dom";
import LogoBlack from "../../assets/images/DeFaqtoLogoBlack.png";
import HeaderVideo from "../../assets/videos/HeaderVideo.mp4";
import Button from "../Button/Button.jsx";
import MobileMenu from '../MobileMenu/MobileMenu.jsx';
import "./Header.css";



function Header(){
    
    return(
        <>
            <header>
                <div className="header-infobar">
                    <div>
                        <p>Большая Лубянка, 30/2</p>
                        <p>Сегодня до 06:00</p>
                    </div>
                    <p>ЗАКАЗЫ: +7 495 624 44 97</p>
                </div>
                <div className="header-main">
                    <div className="logo">
                        <NavLink to='/'>
                        <img src={LogoBlack} alt="DeFAQto" />
                        </NavLink>
                    </div>
                    <nav className="main-navbar">
                        <ul>
                            <li><NavLink to='/'>Главная</NavLink></li>
                            <li><NavLink to='/events'>Афиша</NavLink></li>
                            <li><NavLink to='/menu'>Меню</NavLink></li>
                            <li><NavLink to='/gallery'>Галерея</NavLink></li>
                            <li><NavLink to='/contacts'>Контакты</NavLink></li>
                        </ul>
                    </nav>
                    <MobileMenu />
                </div>
                <div className="header-hero">
                    <video 
                    className="hero-video"
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    controls={false}>
                    <source src={HeaderVideo} type="video/mp4" alt="Фоновое видео бара DeFAQto с атмосферным освещением"/>
                    </video>
                    <Button>Забронировать</Button>
                </div>
            </header>
        </>
    )
}
export default Header;