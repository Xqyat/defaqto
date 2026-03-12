import React, { useState } from 'react';
import Button from '../Button/Button.jsx'
import ModalWrapper from '../ModalWrapper/ModalWrapper.jsx';
import './BookingFormModal.css';

const BookingFormModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '', phone: '', date: '', time: '', seats: ''
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };

    if (!isOpen) return null;

    return(
        <ModalWrapper onClose={onClose}>
            <form onSubmit={handleSubmit} className="booking_form">
                <div className="booking_form-header">
                    <h2 className="booking_form-header-title">Забронировать</h2>
                    <p className="booking_form-header-info">
                        Бронирование стола на 6 и более персон 
                        включает обязательный  сервисный сбор 
                        в размере 10% от итоговой суммы счёта</p>
                </div>
                <div className="booking_form-input_list">
                    <section className="booking_form-input_list-elem">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Ваше имя" />
                    </section>
                    <section className="booking_form-input_list-elem">
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Номер телефона" />
                    </section>
                    <section className="booking_form-input_list-elem">
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required placeholder="Дата посещения" />
                    </section>
                    <section className="booking_form-input_list-elem">
                        <input type="time" name="time" value={formData.time} onChange={handleChange} required placeholder="Время" />
                    </section>
                    <section className="booking_form-input_list-elem">
                        <input type="number" name="seats" value={formData.seats} onChange={handleChange} required placeholder="Количество гостей" />
                    </section>
                </div>
                <div className="booking_form-footer">
                    <p className="booking_form-footer-info">
                        Нажимая кнопку, вы соглашаетесь на 
                        обработку персональных данных</p>
                    <Button className="booking_form-footer-button" onClick={handleSubmit} type="submit">Подтвердить</Button>
                </div>
            </form>
        </ModalWrapper>
    );
};

export default BookingFormModal;