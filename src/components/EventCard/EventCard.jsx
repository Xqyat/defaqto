import "./EventCard.css";

function EventCard ({ img, name, description, date, time, entranceType,
    entrancePrice, onClick  }) {
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
            <div className="event__card" onClick={onClick} role="button" tabIndex={0}>
                <div className="event__card-img">
                    <img src={`http://localhost:3001${img}`} alt={name} />
                </div>
                <div className="event__card-info">
                    <h3 className="event__card-info-name">{name}</h3>
                    <p className="event__card-info-description--desktop">{description}</p>
                    <p className="event__card-info-date">Дата: {formattedDate}</p>
                    <p className="event__card-info-time">Время: {time}</p>
                    <p className="event__card-info-entarance">Вход: {entranceText}</p>
                </div>
            </div>
        </>
    )
}
export default EventCard;