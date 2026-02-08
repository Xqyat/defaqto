import { NavLink } from "react-router-dom";
import LogoBlack from "../../assets/images/DeFaqtoLogoBlack.png";
import HeaderVideo from "../../assets/videos/HeaderVideo.mp4";
import Button from "../Button/Button.jsx";
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
                        <img src={LogoBlack} alt="DeFAQto" className="logo-black" style={{ width: 366, height: 110 }}/>
                        </NavLink>
                    </div>
                    <nav>
                        <ul>
                            <li><NavLink to='/'>Главная</NavLink></li>
                            <li><NavLink to='/events'>Афиша</NavLink></li>
                            <li><NavLink to='/menu'>Меню</NavLink></li>
                            <li><NavLink to='/gallery'>Галерея</NavLink></li>
                            <li><NavLink to='/contacts'>Контакты</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="header-hero">
                    <video className="hero-video"autoPlay muted loop playsInline 
                    style={{ width: '100%', height: '518px', objectFit: 'cover'}}>
                    <source src={HeaderVideo} type="video/mp4"/>
                    </video>
                    {/* Нужно сделать запасной вариант */}
                    <Button>Забронировать</Button>
                </div>
            </header>
        </>
    )
}
export default Header;