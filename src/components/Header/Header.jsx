import { NavLink } from "react-router-dom";
import "./Header.css";

function Header(){
    return(
        <>
        <header>
            <nav>
                <NavLink to='/'>
                    Главная
                </NavLink>
                <NavLink to='/menu'>
                    Меню
                </NavLink>
                <NavLink to='/stocks'>
                    Акции
                </NavLink>
                <NavLink to='/gallery'>
                    Фотоотчёты
                </NavLink>
                <NavLink to='/partners'>
                    Партнёры
                </NavLink>
                <NavLink to='/contacts'>
                    Контакты
                </NavLink>
                <NavLink to='/events'>
                    Афиша
                </NavLink>
            </nav>
        </header>
        </>
    )
}
export default Header;