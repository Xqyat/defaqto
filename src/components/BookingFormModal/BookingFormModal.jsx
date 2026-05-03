import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { IMaskInput } from 'react-imask';
import Button from '../Button/Button.jsx';
import ModalWrapper from '../ModalWrapper/ModalWrapper.jsx';
import './BookingFormModal.css';

const BookingFormModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        seats: '',
        privacyAccepted: false,
    });

    const [loading, setLoading] = useState(false);

    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const getDayOfWeek = (dateString) => {
        return new Date(`${dateString}T12:00:00`).getDay();
    };

    const getBookingScheduleLabel = (dateString) => {
        if (!dateString) return 'Выберите дату, чтобы увидеть часы бронирования';

        const day = getDayOfWeek(dateString);
        if (day >= 1 && day <= 4) return 'Понедельник–четверг: 12:00–06:00';
        if (day === 5) return 'С пятницы 12:00 до понедельника 06:00';
        if (day === 6 || day === 0) return 'Круглосуточно';

        return 'Выберите дату, чтобы увидеть часы бронирования';
    };

    const isBookingTimeAllowed = (dateString, timeString) => {
        if (!dateString || !timeString) return false;

        const day = getDayOfWeek(dateString);
        const minutes = timeToMinutes(timeString);

        const fromMidnightTo6 = minutes >= 0 && minutes <= 360;
        const fromNoonToEndOfDay = minutes >= 720 && minutes <= 1439;

        if (day === 1) return fromMidnightTo6 || fromNoonToEndOfDay;
        if (day >= 2 && day <= 4) return fromMidnightTo6 || fromNoonToEndOfDay;
        if (day === 5) return fromNoonToEndOfDay;
        if (day === 6) return true;
        if (day === 0) return true;

        return false;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handlePhoneAccept = (value) => {
        setFormData((prev) => ({
            ...prev,
            phone: value,
        }));
    };

    const validatePhone = (phone) => {
        return phone.replace(/\D/g, '').length === 11;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.privacyAccepted) {
            alert('Подтвердите согласие с политикой конфиденциальности');
            return;
        }

        if (!validatePhone(formData.phone)) {
            alert('Введите корректный номер телефона');
            return;
        }

        const seatsNumber = Number(formData.seats);
        if (seatsNumber < 1 || seatsNumber > 8) {
            alert('Количество гостей должно быть от 1 до 8');
            return;
        }

        if (!isBookingTimeAllowed(formData.date, formData.time)) {
            alert(`Выбранное время недоступно.\n${getBookingScheduleLabel(formData.date)}`);
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || 'Ошибка отправки заявки');
                return;
            }

            alert('Заявка отправлена');

            setFormData({
                name: '',
                phone: '',
                date: '',
                time: '',
                seats: '',
                privacyAccepted: false,
            });

            onClose();
        } catch (error) {
            console.error('Ошибка отправки:', error);
            alert('Ошибка сети');
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    if (!isOpen) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <form onSubmit={handleSubmit} className="booking_form">
                <div className="booking_form-header">
                    <h2 className="booking_form-header-title">Забронировать</h2>
                    <p className="booking_form-header-info">
                        Бронирование стола на 6 и более персон
                        включает обязательный сервисный сбор
                        в размере 10% от итоговой суммы счёта
                    </p>
                </div>

                <div className="booking_form-input_list">
                    <section className="booking_form-input_list-elem">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Ваше имя"
                        />
                    </section>

                    <section className="booking_form-input_list-elem">
                        <IMaskInput
                            mask="+{7} (000) 000-00-00"
                            name="phone"
                            value={formData.phone}
                            onAccept={handlePhoneAccept}
                            inputMode="tel"
                            placeholder="+7 (___) ___-__-__"
                            required
                        />
                    </section>
                  <div className="booking_form-input_list-elem-wrapper">
                    <section className="booking_form-input_list-elem">
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={today}
                            required
                        />
                    </section>
                    <span className="booking_form-date_hint">
                            {getBookingScheduleLabel(formData.date)}
                        </span>
                  </div>
                    <section className="booking_form-input_list-elem">
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </section>

                    <section className="booking_form-input_list-elem">
                        <input
                            type="number"
                            name="seats"
                            value={formData.seats}
                            onChange={handleChange}
                            required
                            min="1"
                            max="8"
                            placeholder="Количество гостей 1-8"
                        />
                    </section>
                </div>

                <div className="booking_form-footer">                    
                    <section className="booking_form-checkbox">
                        <input
                            type="checkbox"
                            name="privacyAccepted"
                            checked={formData.privacyAccepted}
                            onChange={handleChange}
                            required
                        />
                        <span className="booking_form-checkbox-info">
                            Я подтверждаю, что ознакомлен(а) с{' '}
                            <NavLink to="/privacy-policy" onClick={onClose}>
                                <b>политикой обработки персональных данных</b>
                            </NavLink>
                        </span>
                    </section>

                    <p className="booking_form-footer-info">
                        Нажимая кнопку, вы отправляете заявку на бронирование.
                        После рассмотрения заявки с вами свяжутся
                    </p>

                    <Button
                        className="booking_form-footer-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Отправка...' : 'Подтвердить'}
                    </Button>
                </div>
            </form>
        </ModalWrapper>
    );
};

export default BookingFormModal;