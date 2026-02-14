import LogoBlack from "../../assets/images/DeFaqtoLogoBlack.png";
import "./Footer.css";

function Footer(){
    const copyText = async (text, e) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Ошибка копирования');
        }
    };
    return(
        <>
        <footer>
            <div className="logo">
                <img src={LogoBlack} alt="DeFAQto" className="logo-black" style={{ width: 192, height: 58 }}/>
            </div>
            <div className="footer-main">
                <div className="main left-col">
                    <p>Наши партнёры:  <a href="https://hiddenbar.ru/" className="copyable"
                    style={{
                        color:'#A33333', 
                        borderBottom: '1px solid #A33333'
                        }}>Hidden BAR</a></p>
                    <div className="left-col social-links">
                        {/* Под большим вопросом. В инстграм люди не смогут зайти */}
                        <p>Наши соцсети:</p>
                        <div className="social-links-icons">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.0576 0C17.2998 0.000197121 19.914 2.51302 19.998 5.71289V13.9736C19.998 17.3205 17.3205 19.998 13.9736 19.998H6.02441C2.67753 19.998 3.78153e-05 17.3205 0 13.9736V6.02441C6.14331e-05 2.67751 2.6778 0 6.1084 0H14.0576ZM6.02441 1.9248C3.6816 1.92487 1.84082 3.84924 1.84082 6.1084V14.0576C1.84103 16.4003 3.76539 18.2411 6.02441 18.2412H13.9736C16.3163 18.2412 18.157 16.3166 18.1572 14.0576V6.1084C18.1572 3.76555 16.2328 1.92484 13.9736 1.9248H6.02441ZM10.041 5.1875C12.8023 5.1875 14.9775 7.44743 14.9775 10.125C14.9773 12.8024 12.7184 15.0615 10.041 15.0615C7.36372 15.0614 5.10477 12.8023 5.10449 10.125C5.10449 7.44751 7.27989 5.18763 10.041 5.1875ZM10.041 6.94531C8.28397 6.94544 6.86133 8.36793 6.86133 10.125C6.86159 11.8818 8.28414 13.3036 10.041 13.3037C11.798 13.3037 13.2204 11.8819 13.2207 10.125C13.2207 8.36785 11.7982 6.94531 10.041 6.94531ZM15.3125 3.68164C15.9817 3.68186 16.4834 4.18427 16.4834 4.85352C16.4832 5.52254 15.9815 6.02419 15.3125 6.02441C14.6433 6.02441 14.1408 5.52269 14.1406 4.85352C14.1406 4.18412 14.6431 3.68164 15.3125 3.68164Z" fill="#2B2B2B"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="main right-col">
                <p>Адрес: 
                    <span className="copyable" 
                    onClick={(e) => copyText('Москва, Большая Лубянка, 30/2')}>Москва, Большая Лубянка, 30/2</span>
                </p>
                <p>Телефон: 
                    <span className="copyable" 
                    onClick={(e) => copyText('+7 495 624 44 97')}>+7 495 624 44 97</span>
                </p>
                <p>Почта: 
                    <span className="copyable" 
                    onClick={(e) => copyText('bar@defaqto.ru')}>bar@defaqto.ru</span>
                </p>
                </div>
            </div>
            <p>Copyright © 2010-2022 Дефакто</p>
        </footer>
        </>
    )
}
export default Footer;