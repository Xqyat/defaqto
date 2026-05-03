import ModalWrapper from "../ModalWrapper/ModalWrapper.jsx";
import "./EventCardModal.css";
import Texture from "../../assets/images/DefaqtoTexture.png";

const EventCardModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString('ru-RU')
    : '';

  const entranceText =
    event.entranceType === 'paid'
      ? `Платный${event.entrancePrice !== null && event.entrancePrice !== undefined ? ` — ${event.entrancePrice} ₽` : ''}`
      : 'Бесплатный';

  return (
    <ModalWrapper onClose={onClose}>
      <div
        className="event_modal_card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
      >
        <div className="event_modal_card-img">
          <img src={`${event.img}`} alt={event.name} />
        </div>
        <div className="event_modal_card-info">
          <h3 id="event-modal-title" className="event_modal_card-info-name">
            {event.name}
          </h3>
          <p
            id="event-modal-description"
            className="event_modal_card-info-description"
          >
            {event.description}
          </p>
          <p className="event_modal_card-info-date">
            Дата: {formattedDate}
          </p>
          <p className="event_modal_card-info-time">
            Время: {event.time}
          </p>
          <p className="event_modal_card-info-entrance">
            Вход: {entranceText}
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EventCardModal;