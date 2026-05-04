import { useState, useEffect } from "react";
import AdminModal from "../../components/AdminModal/AdminModal";
import "./AdminEvents.css";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);
  const allEventIds = events.map((event) => event._id || event.id);
  const selectAll = events.length > 0 && selectedItems.length === allEventIds.length;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [newItem, setNewItem] = useState({
    _id: "",
    id: "",
    img: "",
    name: "",
    description: "",
    date: "",
    time: "",
    endDate: "",
    endTime: "",
    entranceType: "free",
    entrancePrice: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");

        const response = await fetch("/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Ошибка загрузки событий:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="adminevents_state">Загрузка событий...</div>;
  }

  if (error) {
    return <div className="adminevents_state adminevents_state--error">{error}</div>;
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
      setSelectedItems(allEventIds);
    }
  };

  const handleAddItem = async (data) => {
    try {
      const token = localStorage.getItem("adminToken");

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("date", data.date);
      formData.append("time", data.time);
      formData.append("endDate", data.endDate);
      formData.append("endTime", data.endTime);
      formData.append("entranceType", data.entranceType);

      if (data.entrancePrice !== null && data.entrancePrice !== undefined) {
        formData.append("entrancePrice", data.entrancePrice);
      }

      if (data.imageFile) {
        formData.append("image", data.imageFile);
      } else if (data.img) {
        formData.append("img", data.img);
      }

      const response = await fetch("/api/admin/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        alert("Ошибка: " + (err.error || response.status));
        return;
      }
      const created = await response.json();
      setEvents((prev) => [...prev, created]);
      setSelectedItems([]);
      setIsAddModalOpen(false);
      setNewItem({
        _id: "",
        id: "",
        img: "",
        name: "",
        description: "",
        date: "",
        time: "",
        endDate: "",
        endTime: "",
        entranceType: "free",
        entrancePrice: "",
      });
    } catch (e) {
      console.error("Ошибка добавления:", e);
      alert("Ошибка сети");
    }
  };

  const openEditModal = () => {
    if (selectedItems.length !== 1) {
      alert("Выделите одно событие");
      return;
    }

    const currentItem = events.find(
      (event) => (event._id || event.id) === selectedItems[0]
    );

    if (!currentItem) {
      alert("Событие не найдено");
      return;
    }

    setEditingItem(currentItem);
    setIsEditModalOpen(true);
  };

  const handleEditItem = async (data) => {
    try {
      const token = localStorage.getItem("adminToken");
      const itemId = data._id || data.id;

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("date", data.date);
      formData.append("time", data.time);
      formData.append("endDate", data.endDate);
      formData.append("endTime", data.endTime);
      formData.append("entranceType", data.entranceType);

      if (
        data.entrancePrice !== null &&
        data.entrancePrice !== undefined &&
        data.entrancePrice !== ""
      ) {
        formData.append("entrancePrice", data.entrancePrice);
      }

      if (data.imageFile) {
        formData.append("image", data.imageFile);
      } else if (data.img) {
        formData.append("img", data.img);
      }

      const response = await fetch(`/api/admin/events/${itemId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        alert("Ошибка: " + (err.error || response.status));
        return;
      }

      const updated = await response.json();

      setEvents((prev) =>
        prev.map((event) =>
          (event._id || event.id) === itemId ? updated : event
        )
      );
      setSelectedItems([]);
      setIsEditModalOpen(false);
      setEditingItem(null);
    } catch (e) {
      console.error("Ошибка редактирования:", e);
      alert("Ошибка сети");
    }
  };

  const deleteSelected = async () => {
    if (!selectedItems.length) {
      alert("Выделите события");
      return;
    }

    if (!window.confirm(`Удалить ${selectedItems.length} событий?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const promises = selectedItems.map((id) =>
        fetch(`/api/admin/events/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
      );

      const responses = await Promise.all(promises);
      const errors = responses.filter((r) => !r.ok);

      if (errors.length) {
        alert(`Ошибки: ${errors.length}/${selectedItems.length}`);
        return;
      }

      setEvents((prev) =>
        prev.filter((event) => !selectedItems.includes(event._id || event.id))
      );

      setSelectedItems([]);
    } catch (err) {
      console.error("Ошибка удаления:", err);
      alert("Ошибка сети");
    }
  };

  return (
    <section className="adminevents">
      <div className="adminevents_topbar">
        <div className="adminevents_topbar-heading">
          <h1 className="adminevents_title">Управление событиями</h1>
          <p className="adminevents_subtitle">
            Добавляйте, редактируйте и удаляйте события афиши
          </p>
        </div>

        <div className="adminevents_topbar-crud">
          <label className="adminevents_select-all">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
            <span>Выделить все ({events.length})</span>
          </label>

          <button
            type="button"
            className="adminevents_action-button"
            onClick={() => setIsAddModalOpen(true)}
          >
            Добавить
          </button>

          <button
            type="button"
            className="adminevents_action-button"
            onClick={openEditModal}
            disabled={selectedItems.length !== 1}
          >
            Редактировать
          </button>

          <button
            type="button"
            className="adminevents_action-button adminevents_action-button--danger"
            onClick={deleteSelected}
            disabled={selectedItems.length === 0}
          >
            Удалить
          </button>
        </div>
      </div>

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

      <div className="adminevents_items">
        {events.map((event, index) => {
          const itemId = event._id || event.id || `temp-${index}`;
          const isSelected = selectedItems.includes(itemId);

          const entranceText =
            event.entranceType === "paid"
              ? `Платный${
                  event.entrancePrice !== null && event.entrancePrice !== undefined
                    ? ` — ${event.entrancePrice} ₽`
                    : ""
                }`
              : "Бесплатный";

          return (
            <article
              key={itemId}
              className={`adminevents_item ${
                isSelected ? "adminevents_item--selected" : ""
              }`}
            >
              <div className="adminevents_item-top">
                <label className="adminevents_item-check">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleItem(itemId)}
                    className="adminevents_item-checkbox"
                  />
                  <span>Выбрать</span>
                </label>
              </div>

              <div className="adminevents_item-content">
                <div className="adminevents_item-content-img">
                  <img src={`${event.img}`} alt={event.name} /> 
                </div>
                <h3 className="adminevents_item-title">{event.name}</h3>
                <p className="adminevents_item-description">{event.description}</p>

                <div className="adminevents_item-meta">
                  <p><span>Дата:</span> {event.date}</p>
                  <p><span>Время:</span> {event.time}</p>
                  <p><span>Вход:</span> {entranceText}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default AdminEvents;