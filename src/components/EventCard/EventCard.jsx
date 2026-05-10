import "./EventCard.css";
import { API_BASE_URL } from "../../config";

function EventCard ({ img, name, description, date, time, entranceType,
    entrancePrice, onClick, className  }) {
    const formattedDate = date
    ? new Date(date).toLocaleDateString('ru-RU')
    : '';

    const entranceText =
    entranceType === 'paid'
      ? `Платный${
          entrancePrice !== null && entrancePrice !== undefined
            ? ` — ${entrancePrice} ₽`
            : ''
        }`
      : 'Бесплатный';
    return(
        <>
            <div className={`event_card ${className || ''}`} onClick={onClick} role="button" tabIndex={0}>
                <div className="event_card-img">
                    <img src={`${API_BASE_URL}${img}`} alt={name} />
                </div>
                <div className="event_card-info">
                    <h3 className="event_card-info-name">{name}</h3>
                    <p className="event_card-info-description desktop">{description}</p>
                    <p className="event_card-info-date">Дата: {formattedDate}</p>
                    <p className="event_card-info-time">Время: {time}</p>
                    <p className="event_card-info-entrance">Вход: {entranceText}</p>
                </div>
            </div>
        </>
    )
}
export default EventCard;