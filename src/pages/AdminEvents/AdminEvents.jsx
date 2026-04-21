import { useState, useEffect } from 'react';
import AdminModal from '../../components/AdminModal/AdminModal';
import './AdminEvents.css';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [newItem, setNewItem] = useState({
    _id: '',
    id: '',
    img: '',
    name: '',
    description: '',
    date: '',
    time: '',
    entranceType: 'free',
    entrancePrice: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('adminToken');

        const response = await fetch('http://localhost:3001/api/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        console.log('EVENTS RESPONSE:', data);
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Ошибка загрузки событий:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Загрузка событий...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const toggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allIds = events.map((event) => event._id || event.id);
      setSelectedItems(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleAddItem = async (data) => {
    try {
        const token = localStorage.getItem('adminToken');

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('date', data.date);
        formData.append('time', data.time);
        formData.append('entranceType', data.entranceType);

        if (data.entrancePrice !== null && data.entrancePrice !== undefined) {
            formData.append('entrancePrice', data.entrancePrice);
        }

        if (data.imageFile) {
            formData.append('image', data.imageFile);
        }else if (data.img) {
            formData.append('img', data.img);
        }

        const response = await fetch('http://localhost:3001/api/admin/events', {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const err = await response.json();
            alert('Ошибка: ' + (err.error || response.status));
            return;
        }

        const created = await response.json();
        console.log('Добавлено:', created);

        setIsAddModalOpen(false);
        setNewItem({
            _id: '',
            id: '',
            img: '',
            name: '',
            description: '',
            date: '',
            time: '',
            entranceType: 'free',
            entrancePrice: '',
        });

        window.location.reload();
        } catch (e) {
        console.error('Ошибка добавления:', e);
        alert('Ошибка сети');
        }
  };

  const openEditModal = () => {
    if (selectedItems.length !== 1) {
      alert('Выделите одно событие');
      return;
    }

    const currentItem = events.find(
      (event) => (event._id || event.id) === selectedItems[0]
    );

    if (!currentItem) {
      alert('Событие не найдено');
      return;
    }

    setEditingItem(currentItem);
    setIsEditModalOpen(true);
  };

  const handleEditItem = async (data) => {
    try {
        const token = localStorage.getItem('adminToken');
        const itemId = data._id || data.id;

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('date', data.date);
        formData.append('time', data.time);
        formData.append('entranceType', data.entranceType);

        if (data.entrancePrice !== null && data.entrancePrice !== undefined && data.entrancePrice !== '') {
        formData.append('entrancePrice', data.entrancePrice);
        }

        if (data.imageFile) {
        formData.append('image', data.imageFile);
        } else if (data.img) {
        formData.append('img', data.img);
        }

        const response = await fetch(`http://localhost:3001/api/admin/events/${itemId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const err = await response.json();
            alert('Ошибка: ' + (err.error || response.status));
            return;
        }

        const updated = await response.json();
        console.log('Обновлено:', updated);

        setEvents((prev) =>
            prev.map((event) =>
            (event._id || event.id) === itemId ? updated : event
            )
        );

        setIsEditModalOpen(false);
        setEditingItem(null);

        window.location.reload();
        } catch (e) {
        console.error('Ошибка редактирования:', e);
        alert('Ошибка сети');
        }
  };

  const deleteSelected = async () => {
    if (!selectedItems.length) {
      alert('Выделите события');
      return;
    }

    if (!window.confirm(`Удалить ${selectedItems.length} событий?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');

      const promises = selectedItems.map((id) =>
        fetch(`http://localhost:3001/api/admin/events/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        })
      );

      const responses = await Promise.all(promises);
      const errors = responses.filter((r) => !r.ok);

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

  return (
    <>
      <div className="adminevents_topbar">
        <h1>Управление событиями</h1>

        <div className="adminevents_topbar-crud">
          <label className="adminevents_select-all">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
            Выделить все ({events.length})
          </label>

          <button onClick={() => setIsAddModalOpen(true)}>Добавить</button>

          <AdminModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddItem}
            group=""
            category=""
            newItem={newItem}
            mode="add"
            entityType="event"
          />

          <button
            onClick={openEditModal}
            disabled={selectedItems.length !== 1}
          >
            Редактировать
          </button>

          <AdminModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleEditItem}
            group=""
            category=""
            newItem={editingItem}
            mode="edit"
            entityType="event"
          />

          <button
            onClick={deleteSelected}
            disabled={selectedItems.length === 0}
          >
            Удалить
          </button>
        </div>
      </div>

      <div className="adminevents_items">
        {events.map((event, index) => {
          const itemId = event._id || event.id || `temp-${index}`;
          const isSelected = selectedItems.includes(itemId);

          const entranceText =
            event.entranceType === 'paid'
              ? `Платный${
                  event.entrancePrice !== null && event.entrancePrice !== undefined
                    ? ` — ${event.entrancePrice} ₽`
                    : ''
                }`
              : 'Бесплатный';

          return (
            <div
              key={itemId}
              className={`adminevents_item ${
                isSelected ? 'adminevents_item--selected' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleItem(itemId)}
                className="adminevents_item-checkbox"
              />

              <div className="adminevents_item-content">
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p>Дата: {event.date}</p>
                <p>Время: {event.time}</p>
                <p>Вход: {entranceText}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AdminEvents;