import { useState, useEffect } from 'react';
import AdminMenuModal from '../../components/AdminMenuModal/AdminMenuModal';
import './AdminMenu.css';

const AdminMenu = () => {
    const [menuData, setMenuData] = useState({ food: {}, drinks: {} });
    const [activeGroup, setActiveGroup] = useState('food');
    const [activeSectionKey, setActiveSectionKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false); 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newItem, setNewItem] = useState(
      {name: '', price: '', weight_value: '', weight_unit: '', });

    useEffect(() => {
        const fetchMenu = async () => {
          try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:3001/api/menu', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            setMenuData(data || { food: {}, drinks: {} });
            
            if (data.food && Object.keys(data.food).length > 0) {
              setActiveSectionKey(Object.keys(data.food)[0]);
            } else if (data.drinks && Object.keys(data.drinks).length > 0) {
              setActiveSectionKey(Object.keys(data.drinks)[0]);
            }
          } catch (err) {
            console.error('Ошибка:', err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        
        fetchMenu();
      }, []);
    if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Загрузка меню...</div>;
    if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
    const toggleItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
        if (selectAll) {
        setSelectedItems([]);
        } else {
        const allIds = currentSectionContent.items.map(item => item.id);
        setSelectedItems(allIds);
        }
        setSelectAll(!selectAll);
    };

const handleAddItem = async (data) => {
  try {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch('http://localhost:3001/api/admin/menu', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const err = await response.json();
      alert('Ошибка: ' + (err.error || response.status));
      return;
    }

    const created = await response.json();
    console.log('Добавлено:', created);
    
    setIsAddModalOpen(false);
    setNewItem({ name: '', price: '', weight_value: '', weight_unit: '' });
    
    window.location.reload();
  } catch (e) {
    console.error('Ошибка добавления:', e);
    alert('Ошибка сети');
  }
};

const deleteSelected = async () => {
  if (!selectedItems.length) {
    alert('Выделите позиции');
    return;
  }
  
  if (!window.confirm(`Удалить ${selectedItems.length} позиций?`)) {
    return;
  }
 
  try {
    const token = localStorage.getItem('adminToken');
    
    const promises = selectedItems.map(id =>
      fetch(`http://localhost:3001/api/admin/menu/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
    );
 
    const responses = await Promise.all(promises);
    
    const errors = responses.filter(r => !r.ok);
    if (errors.length) {
      alert(`Ошибки: ${errors.length}/${selectedItems.length}`);
      return;
    }
 
    console.log('Удалено:', selectedItems.length);
    setSelectedItems([]);
    setSelectAll(false);
    
    setTimeout(() => window.location.reload(), 500);
  } catch (err) {
    console.error('Ошибка удаления:', err);
    alert('Ошибка сети');
  }
};

const openEditModal = () => {
  if (selectedItems.length !== 1) {
    alert('Выделите одну позицию');
    return;
  }

  const currentItem = currentSectionContent.items.find(
    item => (item._id || item.id) === selectedItems[0]
  );

  if (!currentItem) {
    alert('Позиция не найдена');
    return;
  }

  setEditingItem(currentItem);
  setIsEditModalOpen(true);
};

const handleEditItem = async (data) => {
  console.log('itemId:', data._id || data.id);
  try {
    const token = localStorage.getItem('adminToken');
    const itemId = data._id || data.id;
    const response = await fetch(`http://localhost:3001/api/admin/menu/${itemId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const err = await response.json();
      alert('Ошибка: ' + (err.error || response.status));
      return;
    }

    const updated = await response.json();
    console.log('Обновлено:', updated);

    setIsEditModalOpen(false);
    setEditingItem(null);

    window.location.reload();
  } catch (e) {
    console.error('Ошибка редактирования:', e);
    alert('Ошибка сети');
  }
};

  
    const currentDataSections = activeGroup === 'food' ? (menuData.food || {}) : (menuData.drinks || {});
    const currentNavSections = Object.entries(currentDataSections).map(([key, section]) => ({
        key,
        name: section.title || key
    }));

    const currentSectionContent = currentDataSections[activeSectionKey] || { title: 'Нет данных', items: [] };  
    const handleGroupChange = (group) => {
        setActiveGroup(group);
        const sections = group === 'food' ? menuData.food : menuData.drinks;
        if (sections && Object.keys(sections).length > 0) {
          const firstSection = Object.keys(sections)[0];
          setActiveSectionKey(firstSection);
        }
      };
    
    return(
        <>
            <div className="adminmenu_topbar">
              <h1>Управление меню</h1>

              <div className="adminmenu_topbar-crud">
                <label className="adminmenu_select-all">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                  Выделить все ({currentSectionContent.items.length})
                </label>

                <button onClick={() => setIsAddModalOpen(true)}>Добавить</button>

                <AdminMenuModal
                  isOpen={isAddModalOpen}
                  onClose={() => setIsAddModalOpen(false)}
                  onSubmit={handleAddItem}
                  group={activeGroup}
                  category={currentSectionContent.title}
                  newItem={newItem}
                  mode="add"
                />

                <button
                  onClick={openEditModal}
                  disabled={selectedItems.length !== 1}
                >
                  Редактировать
                </button>

                <AdminMenuModal
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  onSubmit={handleEditItem}
                  group={activeGroup}
                  category={currentSectionContent.title}
                  newItem={editingItem}
                  mode="edit"
                />

                <button
                  onClick={deleteSelected}
                  disabled={selectedItems.length === 0}
                >
                  Удалить
                </button>
              </div>
            </div>

            <div className="adminmenu_gropus">
              <button
                className={`adminmenu_gropus-elem ${
                  activeGroup === 'food'
                    ? 'adminmenu_gropus-elem--active'
                    : 'adminmenu_gropus-elem--inactive'
                }`}
                onClick={() => handleGroupChange('food')}
              >
                Еда
              </button>

              <button
                className={`adminmenu_gropus-elem ${
                  activeGroup === 'drinks'
                    ? 'adminmenu_gropus-elem--active'
                    : 'adminmenu_gropus-elem--inactive'
                }`}
                onClick={() => handleGroupChange('drinks')}
              >
                Напитки
              </button>
            </div>

            <div className="adminmenu_gropus-elem-categories">
              {currentNavSections.map(({ key, name }) => (
                <button
                  key={key}
                  onClick={() => setActiveSectionKey(key)}
                  className={`adminmenu_category-btn ${
                    activeSectionKey === key
                      ? 'adminmenu_category-btn--active'
                      : 'adminmenu_category-btn--inactive'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            <div>
              <h2>{currentSectionContent.title}</h2>

              <div className="adminmenu_items">
                {currentSectionContent.items.map((item, index) => {
                  const itemId = item.id || `temp-${index}`;
                  const isSelected = selectedItems.includes(itemId);

                  return (
                    <div
                      key={itemId}
                      className={`adminmenu_item ${
                        isSelected ? 'adminmenu_item--selected' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleItem(itemId)}
                        className="adminmenu_item-checkbox"
                      />

                      <div className="adminmenu_item-content">
                        <h3>{item.name}</h3>
                        <p>{item.price} ₽</p>
                        <p>{item.weight_value}{item.weight_unit}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
        </>
  );
};

export default AdminMenu;