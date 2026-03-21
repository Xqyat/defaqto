import LogoBlack from "../../assets/images/DeFaqtoLogoBlack.png";
import "./EventCard.css";

function EventCard ({ img, name, description, date, time, entrance, onClick  }) {
    return(
        <>
            <div className="event_card" onClick={onClick}>
                <div className="event_card-img">
                    <img src={`http://localhost:3001${img}`} alt={LogoBlack} />
                </div>
                <div className="event_card-info">
                    <h3 className="event_card-info-name">{name}</h3>
                    <p className="event_card-info-description">{description}</p>
                    <p className="event_card-info-date">Дата: {date}</p>
                    <p className="event_card-info-time">Время: {time}</p>
                    <p className="event_card-info-entarance">Вход: {entrance}</p>
                </div>
            </div>
        </>
    )
}
export default EventCard;