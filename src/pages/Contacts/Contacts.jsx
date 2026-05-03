import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Contacts.css';

function Contacts(){
    const [showAddress, setShowAddress] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [showEmail, setShowEmail] = useState(false);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };
    return(
        <>
            <Helmet>
                <title>Контакты бара DeFAQto | Москва</title>
                <meta
                name="description"
                content="Адрес, телефон и часы работы бара DeFAQto в Москве. Мы находимся на Большой Лубянке, 30/2. Забронируйте стол прямо сейчас."
                />
                <meta
                name="keywords"
                content="контакты, адрес, DeFAQto, бар, Москва, телефон, бронирование"
                />
                <meta property="og:title" content="Контакты DeFAQto" />
                <meta
                property="og:description"
                content="Бар DeFAQto: Москва, Большая Лубянка, 30/2. Звоните +7 495 624 44 97 или бронируйте стол онлайн."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://defaqto.ru/contacts" />
                <meta property="og:image" content="https://defaqto.ru/og-image-contacts.jpg" />
                <meta property="og:locale" content="ru_RU" />
            </Helmet>
            <main className="contacts">
                <div className="contacts-info">                    
                    <span
                        className={`copyable ${showAddress ? 'show-tooltip' : ''}`}
                        onClick={() => {
                        copyText('Москва, Большая Лубянка, 30/2');
                        setShowAddress(true);
                        setTimeout(() => setShowAddress(false), 800);
                        }}
                    >
                        Москва, Большая Лубянка, 30/2
                        <span className="tooltip-text">Скопировано!</span>
                    </span>
                    <span
                        className={`copyable ${showPhone ? 'show-tooltip' : ''}`}
                        onClick={() => {
                        copyText('+7 495 624 44 97');
                        setShowPhone(true);
                        setTimeout(() => setShowPhone(false), 800);
                        }}
                    >
                        +7 495 624 44 97
                        <span className="tooltip-text">Скопировано!</span>
                    </span>
                    <span
                        className={`copyable ${showEmail ? 'show-tooltip' : ''}`}
                        onClick={() => {
                        copyText('bar@defaqto.ru');
                        setShowEmail(true);
                        setTimeout(() => setShowEmail(false), 800);
                        }}
                    >
                        bar@defaqto.ru
                        <span className="tooltip-text">Скопировано!</span>
                    </span>
                    <span className="contacts-info-schedule">
                        Часы работы: <br />
                        пн-чт: 12:00-06:00 <br />
                        пт: 12:00-06:00 понедельника <br />
                        сб-вс: круглосуточно
                    </span>
                </div>
                <div className="contacts-map_container">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A4605e606615527363917f404685bae4b031a0a90325a388df02e0d24c7a945f0&amp;source=constructor&scroll=false"
                        width="100%"
                        height="637"
                        frameBorder="0"
                        title="Bar Location Map"
                    />
                </div>
            </main>
        </>
    )
}
export default Contacts;