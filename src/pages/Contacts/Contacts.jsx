import { useState } from 'react';
import './Contacts.css';

function Contacts(){
    const [showAddress, setShowAddress] = useState(false);
    const [showPhone, setShowPhone] = useState(false);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };
    return(
        <>
        <main className="contacts">
            <div className="contacts-info">
                <h1 className="contacts-info-title">Контактные данные</h1>
                <span 
                        className={`copyable ${showAddress ? 'show-tooltip' : ''}`}
                        onClick={() => {
                            copyText('Москва, Большая Лубянка, 30/2');
                            setShowAddress(true);
                            setTimeout(() => setShowAddress(false), 800);
                        }}
                    >Москва, Большая Лубянка, 30/2
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
                    frameBorder="0">
                </iframe>
            </div>
        </main>
        </>
    )
}
export default Contacts;