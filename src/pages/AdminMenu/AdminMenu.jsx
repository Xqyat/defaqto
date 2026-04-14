import { useState, useEffect } from 'react';
import AdminMenuModal from '../../components/AdminMenuModal/AdminMenuModal';
import './AdminMenu.css';

const AdminMenu = () => {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [activeGroup, setActiveGroup] = useState('food');
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false); 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newItem, setNewItem] = useState(
      {name: '', price: '', weight_value: '', weight_unit: '', });

    useEffect(() => {
        const fetchCategories  = async () => {
          try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:3001/api/admin/categories?group=${activeGroup}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            console.log('CATEGORIES RESPONSE:', data);
            const normalizedCategories = Array.isArray(data) ? data : [];

            setCategories(normalizedCategories);

            if (normalizedCategories.length > 0) {
              setActiveCategoryId(normalizedCategories[0]._id);
            } else {
              setActiveCategoryId(null);
              setMenuItems([]);
            }
          } catch (err) {
            console.error('Ошибка загрузки категорий:', err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        
        fetchCategories();
    }, [activeGroup]);

    useEffect(() => {
      const fetchItems = async () => {
        if (!activeCategoryId) return;
    
        try {
          const token = localStorage.getItem('adminToken');
    
          const response = await fetch(`http://localhost:3001/api/menu?categoryId=${activeCategoryId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
    
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
          const data = await response.json();
          console.log('ITEMS RESPONSE:', data);
          setMenuItems(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error('Ошибка загрузки позиций:', err);
          setError(err.message);
        }
      };
    
      fetchItems();
    }, [activeCategoryId]);

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
        const allIds = menuItems.map(item => item._id || item.id);
        setSelectedItems(allIds);
        }
        setSelectAll(!selectAll);
    };

const handleAddItem = async (data) => {
  try {
    const token = localStorage.getItem('adminToken');
    const payload = {
      ...data,
      categoryId: activeCategoryId
    };
    const response = await fetch('http://localhost:3001/api/admin/menu', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
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

  const currentItem = menuItems.find(
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

const openEditCategoryModal = () => {
  if (!activeCategoryId) {
    alert('Выберите категорию');
    return;
  }
  const category = categories.find(cat => cat._id === activeCategoryId);
  setEditingCategory(category);
  setIsEditCategoryModalOpen(true);
};

const handleAddCategory = async (data) => {
  try {
    const token = localStorage.getItem('adminToken');
    const payload = { name: data.name, group: activeGroup };
    
    const response = await fetch('http://localhost:3001/api/admin/categories', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.json();
      alert('Ошибка: ' + (err.error || response.status));
      return;
    }

    setIsAddCategoryModalOpen(false);
    window.location.reload();
  } catch (e) {
    alert('Ошибка сети');
  }
};

const handleEditCategory = async (data) => {
  try {
    const token = localStorage.getItem('adminToken');
    const categoryId = data._id || data.id;

    const response = await fetch(`http://localhost:3001/api/admin/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        group: activeGroup,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      alert('Ошибка: ' + (err.error || response.status));
      return;
    }

    setIsEditCategoryModalOpen(false);
    setEditingCategory(null);
    window.location.reload();
  } catch (e) {
    console.error(e);
    alert('Ошибка сети');
  }
};

const deleteCategory = async () => {
  if (!activeCategoryId) return;
  if (!window.confirm('Удалить категорию? Позиции останутся без категории!')) return;

  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`http://localhost:3001/api/admin/categories/${activeCategoryId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      alert('Ошибка удаления');
      return;
    }

    setActiveCategoryId(null);
    setMenuItems([]);
    window.location.reload();
  } catch (e) {
    alert('Ошибка сети');
  }
};

  
    const currentCategory = categories.find(cat => cat._id === activeCategoryId) || null;
    const handleGroupChange = (group) => {
        setActiveGroup(group);
        setActiveCategoryId(null);
        setSelectedItems([]);
        setSelectAll(false);
      };
    
    return(
        <>
            <div className="adminmenu_topbar">
              <h1>Управление меню</h1>

              <div className="adminmenu_topbar-crud">
              <div className="adminmenu_gropus-elem-categories">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setActiveCategoryId(category._id)}
                    className={`adminmenu_category-btn ${
                      activeCategoryId === category._id
                        ? 'adminmenu_category-btn--active'
                        : 'adminmenu_category-btn--inactive'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
                <label className="adminmenu_select-all">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                  Выделить все ({menuItems.length})
                </label>

                <button onClick={() => setIsAddModalOpen(true)}>Добавить</button>

                <AdminMenuModal
                  isOpen={isAddModalOpen}
                  onClose={() => setIsAddModalOpen(false)}
                  onSubmit={handleAddItem}
                  group={activeGroup}
                  category={currentCategory?.name || ''}
                  newItem={newItem}
                  mode="add"
                  entityType="item"
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
                  category={currentCategory?.name || ''}
                  newItem={editingItem}
                  mode="edit"
                  entityType="item"
                />

                <button
                  onClick={deleteSelected}
                  disabled={selectedItems.length === 0}
                >
                  Удалить
                </button>
              </div>
            </div>
            <div className="adminmenu_topbar-crud_categories">
              <button onClick={() => setIsAddCategoryModalOpen(true)}>
                Добавить категорию
              </button>

              <AdminMenuModal
                isOpen={isAddCategoryModalOpen}
                onClose={() => setIsAddCategoryModalOpen(false)}
                onSubmit={handleAddCategory}
                group={activeGroup}
                category=""
                newItem={{ name: '' }}
                mode="add"
                entityType="category"
              />

              <button
                onClick={openEditCategoryModal}
                disabled={!activeCategoryId}
              >
                Редактировать
              </button>

              <AdminMenuModal
                isOpen={isEditCategoryModalOpen}
                onClose={() => setIsEditCategoryModalOpen(false)}
                onSubmit={handleEditCategory}
                group={activeGroup}
                category=""
                newItem={editingCategory}
                mode="edit"
                entityType="category"
              />

              <button
                onClick={deleteCategory}
                disabled={!activeCategoryId}
              >
                Удалить
              </button>
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
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setActiveCategoryId(category._id)}
                  className={`adminmenu_category-btn ${
                    activeCategoryId === category._id
                      ? 'adminmenu_category-btn--active'
                      : 'adminmenu_category-btn--inactive'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div>
              <h2>{currentCategory ? currentCategory.name : 'Нет категории'}</h2>

              <div className="adminmenu_items">
                {menuItems.map((item, index) => {
                  const itemId = item._id || item.id || `temp-${index}`;
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