import { useState, useEffect } from 'react';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import Button from '../Button/Button'
import './AdminMenuModal.css';

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

const AdminMenuModal = ({ 
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
  const emptyForm = entityType === 'category' ? emptyCategoryForm : emptyItemForm;
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(
        initialData || (entityType === 'category' ? emptyCategoryForm : emptyItemForm)
      );
    }
  }, [isOpen, initialData, entityType]);

  const hasWeightValue = String(formData.weight_value || '').trim() !== '';

  
  const isValid = isCategory
    ? formData.name?.trim()
    : formData.name?.trim() && formData.price;


    const handleSubmit = () => {
      if (!isValid) {
        alert(isCategory ? 'Заполните название категории' : 'Заполните название и цену');
        return;
      }
  
      const dataToSend = isCategory
        ? {
            _id: formData._id,
            id: formData.id,
            name: formData.name.trim(),
            group,
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
            {isCategory ? 'категорию' : `"${category}"`}
          </h2>
  
          <label className="adminmenu_modal-label">
            Название:
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="adminmenu_modal-input"
            />
          </label>
  
          {!isCategory && (
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
  
  export default AdminMenuModal;