import ModalWrapper from '../ModalWrapper/ModalWrapper.jsx';
import "./EventCardModal.css";

const EventCardModal = ({ isOpen, onClose, event }) => {

    if (!isOpen) return null;  
      
    return (
      <ModalWrapper onClose={onClose}>
        <div className="event_modal_card">
          <div className="event_modal_card-img">
            <img src={`http://localhost:3001${event.img}`} alt={event.name} /> 
          </div>
          <div className="event_modal_card-info">
            <h3 className="event_modal_card-info-name">{event.name}</h3>
            <p className="event_modal_card-info-description">{event.description}</p>
            <p className="event_modal_card-info-date">Дата: {event.date}</p>
            <p className="event_modal_card-info-time">Время: {event.time}</p>
            <p className="event_modal_card-info-entarance">Вход: {event.entrance}</p>
          </div>
        </div>
      </ModalWrapper>
    );
  }
  
  export default EventCardModal;