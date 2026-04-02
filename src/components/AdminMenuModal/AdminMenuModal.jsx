import { useState, useEffect } from 'react';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import Button from '../Button/Button'
import './AdminMenuModal.css';

const emptyForm = {
  _id: '',
  id: '',
  name: '',
  price: '',
  weight_value: '',
  weight_unit: '',
};

const AdminMenuModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  group, 
  category,
  newItem: initialNewItem, 
  mode = 'add'
}) => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialNewItem || emptyForm);
    }
  }, [isOpen, initialNewItem]);

  const handleSubmit = () => {
    console.log('formData в модалке:', formData);
    if (!formData.name.trim() || !formData.price) {
      alert('Заполните название и цену');
      return;
    }
    
    const dataToSend = ({
      ...formData,
      category,
      group
    });
    
    console.log('Отправляем onSubmit:', dataToSend);

    onSubmit(dataToSend);


    setFormData(emptyForm)
  };

  const hasWeightValue = String(formData.weight_value).trim() !== '';
  if (!isOpen) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <div className="adminmenu_modal-content">
        <h2 className="adminmenu_modal-title">
          {mode === 'edit' ? 'Редактировать' : 'Добавить'} "{category}"
        </h2>

        <label className="adminmenu_modal-label">
          Название:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="adminmenu_modal-input"
          />
        </label>

        <label className="adminmenu_modal-label">
          Цена (₽):
          <input
            type="number"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="adminmenu_modal-input"
          />
        </label>

        <label className="adminmenu_modal-label">
          Вес (опционально):
          <div className="adminmenu_modal-weight-row">
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.weight_value}
              onChange={(e) => {
                const value = e.target.value;
        
                setFormData({
                  ...formData,
                  weight_value: value,
                  weight_unit: value.trim() === '' ? '' : formData.weight_unit
                });
              }}
              className="adminmenu_modal-weight-input"
            />

            <select
              value={formData.weight_unit}
              onChange={(e) => setFormData({ ...formData, weight_unit: e.target.value })}
              className="adminmenu_modal-select"
              disabled={!hasWeightValue}
            >
              <option value="-">-</option>

              {group === 'food' && (
                <>
                  <option value="г">г</option>
                  <option value="шт">шт</option>
                </>
              )}

              {group === 'drinks' && (
                <>
                  <option value="мл">мл</option>
                  <option value="л">л</option>
                  <option value="шт">шт</option>
                </>
              )}
            </select>
          </div>
        </label>

        <div className="adminmenu_modal-actions">
          <Button onClick={onClose}>Отмена</Button>

          <button
            onClick={handleSubmit}
            disabled={!formData.name.trim() || !formData.price}
            className={`adminmenu_modal-submit ${
              formData.name.trim() && formData.price
                ? 'adminmenu_modal-submit--active'
                : 'adminmenu_modal-submit--disabled'
            }`}
          >
            Сохранить
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AdminMenuModal;