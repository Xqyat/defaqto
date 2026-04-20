import { useState, useEffect } from 'react';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import Button from '../Button/Button'
import './AdminModal.css';

const emptyItemForm = {
  _id: '',
  id: '',
  name: '',
  price: '',
  weight_value: '',
  weight_unit: '',
};

const emptyCategoryForm = {
  _id: '',
  id: '',
  name: '',
};

const emptyEventForm = {
  _id: '',
  id: '',
  img: '',
  name: '',
  description: '',
  date: '',
  time: '',
  entranceType: 'free',
  entrancePrice: '',
};

const AdminModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  group, 
  category,
  newItem: initialData, 
  mode = 'add',
  entityType = 'item',
}) => {
  
  const isCategory = entityType === 'category';
  const isEvent = entityType === 'event';
  const emptyForm = isCategory
  ? emptyCategoryForm
  : isEvent
  ? emptyEventForm
  : emptyItemForm;
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(
        initialData || (entityType === 'category'
          ? emptyCategoryForm
          : entityType === 'event'
          ? emptyEventForm
          : emptyItemForm)
      );
    }
  }, [isOpen, initialData, entityType]);

  const hasWeightValue = String(formData.weight_value || '').trim() !== '';
  const isPaidEvent = formData.entranceType === 'paid';
  
  const isValid = isCategory
  ? formData.name?.trim()
  : isEvent
  ? formData.img?.trim() &&
    formData.name?.trim() &&
    formData.description?.trim() &&
    formData.date &&
    formData.time &&
    formData.entranceType &&
    (!isPaidEvent || formData.entrancePrice !== '')
  : formData.name?.trim() && formData.price;


    const handleSubmit = () => {
      if (!isValid) {
        alert(isCategory 
          ? 'Заполните название категории'
          : isEvent
          ? 'Заполните все обязательные поля события' 
          : 'Заполните название и цену');
      }
  
      const dataToSend = isCategory
        ? {
            _id: formData._id,
            id: formData.id,
            name: formData.name.trim(),
            group,
          }
        : isEvent
        ? {
            _id: formData._id,
            id: formData.id,
            img: formData.img.trim(),
            name: formData.name.trim(),
            description: formData.description.trim(),
            date: formData.date,
            time: formData.time,
            entranceType: formData.entranceType,
            entrancePrice: formData.entranceType === 'paid'
              ? Number(formData.entrancePrice)
              : null,
          }
        : {
            ...formData,
            name: formData.name.trim(),
            category,
            group,
          };
  
      onSubmit(dataToSend);
      setFormData(emptyForm);
    };
  
    if (!isOpen) return null;
  
    return (
      <ModalWrapper onClose={onClose}>
        <div className="adminmenu_modal-content">
          <h2 className="adminmenu_modal-title">
            {mode === 'edit' ? 'Редактировать' : 'Добавить'}{' '}
            {isCategory ? 'категорию' : isEvent ? 'событие' : `"${category}"`}
          </h2>
          {!isEvent && (
            <label className="adminmenu_modal-label">
              Название:
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="adminmenu_modal-input"
              />
            </label>
          )}
          {!isCategory && !isEvent && (
            <>
              <label className="adminmenu_modal-label">
                Цена (₽):
                <input
                  type="number"
                  min="0"
                  value={formData.price || ''}
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
                    value={formData.weight_value || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({
                        ...formData,
                        weight_value: value,
                        weight_unit: value.trim() === '' ? '' : formData.weight_unit,
                      });
                    }}
                    className="adminmenu_modal-weight-input"
                  />
  
                  <select
                    value={formData.weight_unit || ''}
                    onChange={(e) => setFormData({ ...formData, weight_unit: e.target.value })}
                    className="adminmenu_modal-select"
                    disabled={!hasWeightValue}
                  >
                    <option value="">-</option>
  
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
            </>
          )}

          {isEvent && (
            <>
              <label className="adminmenu_modal-label">
                Ссылка на изображение:
                <input
                  type="text"
                  value={formData.img || ''}
                  onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                  className="adminmenu_modal-input"
                />
              </label>

              <label className="adminmenu_modal-label">
                Название:
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="adminmenu_modal-input"
                />
              </label>

              <label className="adminmenu_modal-label">
                Описание:
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="adminmenu_modal-input"
                />
              </label>

              <label className="adminmenu_modal-label">
                Дата:
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="adminmenu_modal-input"
                />
              </label>

              <label className="adminmenu_modal-label">
                Время:
                <input
                  type="time"
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="adminmenu_modal-input"
                />
              </label>

              <label className="adminmenu_modal-label">
                Тип входа:
                <select
                  value={formData.entranceType || 'free'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      entranceType: e.target.value,
                      entrancePrice: e.target.value === 'free' ? '' : formData.entrancePrice,
                    })
                  }
                  className="adminmenu_modal-select"
                >
                  <option value="free">Бесплатный</option>
                  <option value="paid">Платный</option>
                </select>
              </label>

              {formData.entranceType === 'paid' && (
                <label className="adminmenu_modal-label">
                  Цена входа (₽):
                  <input
                    type="number"
                    min="0"
                    value={formData.entrancePrice || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, entrancePrice: e.target.value })
                    }
                    className="adminmenu_modal-input"
                  />
                </label>
              )}
            </>
          )}
  
          <div className="adminmenu_modal-actions">
            <Button onClick={onClose}>Отмена</Button>
  
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`adminmenu_modal-submit ${
                isValid
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
  
  export default AdminModal;