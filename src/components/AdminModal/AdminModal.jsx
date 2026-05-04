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
  endDate: '',
  endTime: '',
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
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(
        initialData || (entityType === 'category'
          ? emptyCategoryForm
          : entityType === 'event'
          ? emptyEventForm
          : emptyItemForm)
      );
      setImageFile(null);
    }
  }, [isOpen, initialData, entityType]);

  const hasWeightValue = String(formData.weight_value || '').trim() !== '';
  const isPaidEvent = formData.entranceType === 'paid';
  
  const isValid = isCategory
  ? formData.name?.trim()
  : isEvent
  ? (imageFile || formData.img) &&
    formData.name?.trim() &&
    formData.description?.trim() &&
    formData.date &&
    formData.time &&
    formData.endDate &&
    formData.endTime &&
    formData.entranceType &&
    (!isPaidEvent || formData.entrancePrice !== '')
  : formData.name?.trim() && formData.price;


  const today = new Date().toISOString().split('T')[0];

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  const getDayOfWeek = (dateString) => {
    return new Date(`${dateString}T12:00:00`).getDay();
  };
  
  const getEventScheduleLabel = (dateString) => {
    if (!dateString) return 'Доступное время зависит от даты';
  
    const day = getDayOfWeek(dateString);
  
      if (day >= 1 && day <= 4) return 'Понедельник–четверг: 12:00–06:00';
      if (day === 5) return 'С пятницы 12:00 до понедельника 06:00';
      if (day === 6 || day === 0) return 'Круглосуточно';
  
    return 'Доступное время зависит от даты';
  };
  
  const isEventTimeAllowed = (dateString, timeString) => {
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

  const toDateTime = (date, time) => new Date(`${date}T${time}`);

  const handleSubmit = () => {      
    if (isEvent && formData.date && formData.date < today) {
      alert('Нельзя выбрать прошедшую дату');
      return;
    }
  
    if (isEvent && formData.date && formData.time && !isEventTimeAllowed(formData.date, formData.time)) {
      alert(`Укажите корректное время.\n${getEventScheduleLabel(formData.date)}`);
      return;
    }

    if (
      isEvent &&
      formData.date &&
      formData.time &&
      formData.endDate &&
      formData.endTime
    ) {
      const startDateTime = toDateTime(formData.date, formData.time);
      const endDateTime = toDateTime(formData.endDate, formData.endTime);
  
      if (endDateTime <= startDateTime) {
        alert('Дата и время окончания должны быть позже начала события');
        return;
      }
    }

    if (!isValid) {
      alert(isCategory 
        ? 'Заполните название категории'
        : isEvent
        ? 'Заполните все обязательные поля события' 
        : 'Заполните название и цену');
        return;
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
          img: formData.img || '',
          imageFile: imageFile,
          name: formData.name.trim(),
          description: formData.description.trim(),
          date: formData.date,
          time: formData.time,
          endDate: formData.endDate,
          endTime: formData.endTime,
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
    setImageFile(null);
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
              Изображение:
              <input
                type="file"
                accept="image/*"
                className="adminmenu_modal-file"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImageFile(file);
                }}
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
                rows={2}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="adminmenu_modal-input adminmenu_modal-textarea"
              />
            </label>
            
            <div className="adminmenu_modal-row">
              <label className="adminmenu_modal-label adminmenu_modal-label--half">
                Дата начала:
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={today}
                  className="adminmenu_modal-input"
                />
              </label>

              <label className="adminmenu_modal-label adminmenu_modal-label--half">
                Время:
                <input
                  type="time"
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="adminmenu_modal-input"
                />
              </label>
            </div>
            
            <div className="adminmenu_modal-row">
              <label className="adminmenu_modal-label adminmenu_modal-label--half">
                Дата окончания:
                <input
                  type="date"
                  value={formData.endDate || ''}
                  min={formData.date || today}
                  onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                  className="adminmenu_modal-input"
                />
              </label>

              <label className="adminmenu_modal-label adminmenu_modal-label--half">
                Время окончания:
                <input
                  type="time"
                  value={formData.endTime || ''}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="adminmenu_modal-input"
                />
              </label>
            </div>
            
            <div className="adminmenu_modal-row">
              <label className="adminmenu_modal-label adminmenu_modal-label--half">
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
                <label className="adminmenu_modal-label adminmenu_modal-label--half">
                  Цена (₽):
                  <input
                    type="number"
                    min="0"
                    value={formData.entrancePrice || ''}
                    onChange={(e) => setFormData({ ...formData, entrancePrice: e.target.value })}
                    className="adminmenu_modal-input"
                  />
                </label>
              )}
            </div>
            
            {(formData.date || formData.endDate) && (
              <div className="adminmenu_modal-hints">
                {formData.date && (
                  <span className="adminmenu_modal-hint">Начало: {getEventScheduleLabel(formData.date)}</span>
                )}
                {formData.endDate && (
                  <span className="adminmenu_modal-hint">Окончание: {getEventScheduleLabel(formData.endDate)}</span>
                )}
              </div>
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