import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './AgeGate.css'

const AgeGate = () => {
  const [showGate, setShowGate] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setShowGate(false);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowGate(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://ya.ru/';
  };

  if (!showGate) return null;

  return (
        <div className="age-gate" role="dialog" aria-modal="true">
        <div className="age-gate__card">
            <h2 className="age-gate__title">Подтверждение возраста</h2>
            <p className="age-gate__text">
            Для доступа на сайт бара DeFAQto вам должно быть не менее 18 лет.
            </p>
            <div className="age-gate__actions">
            <Button className="age-gate__btn age-gate__btn--confirm" onClick={handleConfirm}>
                Да, мне есть 18
            </Button>
            <Button className="age-gate__btn age-gate__btn--decline" onClick={handleDecline}>
                Нет, мне нет 18
            </Button>
            </div>
        </div>
        </div>
  );
};

export default AgeGate;