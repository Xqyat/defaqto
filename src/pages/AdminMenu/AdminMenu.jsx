import { useEffect, useMemo, useState } from "react";
import AdminModal from "../../components/AdminModal/AdminModal";
import "../../styles/admin.css";
import "./AdminMenu.css";
import "../../styles/admin.css"

const AdminMenu = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeGroup, setActiveGroup] = useState("food");
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    weight_value: "",
    weight_unit: "",
  });

  const allItemIds = useMemo(
    () => menuItems.map((item) => item._id || item.id),
    [menuItems]
  );

  const selectAll =
    menuItems.length > 0 && selectedItems.length === allItemIds.length;

  useEffect(() => {
    setSelectedItems([]);
  }, [activeCategoryId, activeGroup]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("adminToken");
        const response = await fetch(
          `http://localhost:3001/api/admin/categories?group=${activeGroup}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const normalizedCategories = Array.isArray(data) ? data : [];
        setCategories(normalizedCategories);

        if (normalizedCategories.length > 0) {
          setActiveCategoryId((prev) => {
            const exists = normalizedCategories.some((cat) => cat._id === prev);
            return exists ? prev : normalizedCategories[0]._id;
          });
        } else {
          setActiveCategoryId(null);
          setMenuItems([]);
        }
      } catch (err) {
        console.error("Ошибка загрузки категорий:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [activeGroup]);

  useEffect(() => {
    const fetchItems = async () => {
      if (!activeCategoryId) {
        setMenuItems([]);
        return;
      }

      try {
        setError(null);
        const token = localStorage.getItem("adminToken");
        const response = await fetch(
          `http://localhost:3001/api/menu?categoryId=${activeCategoryId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        setMenuItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Ошибка загрузки позиций:", err);
        setError(err.message);
      }
    };

    fetchItems();
  }, [activeCategoryId]);

  const toggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(selectAll ? [] : allItemIds);
  };

  const handleGroupChange = (group) => {
    setActiveGroup(group);
    setActiveCategoryId(null);
  };

  const handleAddItem = async (data) => {
    try {
      const token = localStorage.getItem("adminToken");
      const payload = {
        ...data,
        categoryId: activeCategoryId,
      };

      const response = await fetch("http://localhost:3001/api/admin/menu", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const created = await response.json();

      if (!response.ok) {
        alert("Ошибка: " + (created.error || response.status));
        return;
      }

      setMenuItems((prev) => [...prev, created]);
      setIsAddModalOpen(false);
      setNewItem({ name: "", price: "", weight_value: "", weight_unit: "" });
    } catch (e) {
      console.error("Ошибка добавления:", e);
      alert("Ошибка сети");
    }
  };

  const openEditModal = () => {
    if (selectedItems.length !== 1) {
      alert("Выделите одну позицию");
      return;
    }

    const currentItem = menuItems.find(
      (item) => (item._id || item.id) === selectedItems[0]
    );

    if (!currentItem) {
      alert("Позиция не найдена");
      return;
    }

    setEditingItem(currentItem);
    setIsEditModalOpen(true);
  };

  const handleEditItem = async (data) => {
    try {
      const token = localStorage.getItem("adminToken");
      const itemId = data._id || data.id;

      const response = await fetch(
        `http://localhost:3001/api/admin/menu/${itemId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const updated = await response.json();

      if (!response.ok) {
        alert("Ошибка: " + (updated.error || response.status));
        return;
      }

      setMenuItems((prev) =>
        prev.map((item) => ((item._id || item.id) === itemId ? updated : item))
      );
      setSelectedItems([]);
      setEditingItem(null);
      setIsEditModalOpen(false);
    } catch (e) {
      console.error("Ошибка редактирования:", e);
      alert("Ошибка сети");
    }
  };

  const deleteSelected = async () => {
    if (!selectedItems.length) {
      alert("Выделите позиции");
      return;
    }

    if (!window.confirm(`Удалить ${selectedItems.length} позиций?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const responses = await Promise.all(
        selectedItems.map((id) =>
          fetch(`http://localhost:3001/api/admin/menu/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      const errors = responses.filter((r) => !r.ok);

      if (errors.length) {
        alert(`Ошибки: ${errors.length}/${selectedItems.length}`);
        return;
      }

      setMenuItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item._id || item.id))
      );
      setSelectedItems([]);
    } catch (err) {
      console.error("Ошибка удаления:", err);
      alert("Ошибка сети");
    }
  };

  const openEditCategoryModal = () => {
    if (!activeCategoryId) {
      alert("Выберите категорию");
      return;
    }

    const category = categories.find((cat) => cat._id === activeCategoryId);
    setEditingCategory(category);
    setIsEditCategoryModalOpen(true);
  };

  const handleAddCategory = async (data) => {
    try {
      const token = localStorage.getItem("adminToken");
      const payload = { name: data.name, group: activeGroup };

      const response = await fetch("http://localhost:3001/api/admin/categories", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const created = await response.json();

      if (!response.ok) {
        alert("Ошибка: " + (created.error || response.status));
        return;
      }

      setCategories((prev) => [...prev, created]);
      setActiveCategoryId(created._id);
      setIsAddCategoryModalOpen(false);
    } catch (e) {
      alert("Ошибка сети");
    }
  };

  const handleEditCategory = async (data) => {
    try {
      const token = localStorage.getItem("adminToken");
      const categoryId = data._id || data.id;

      const response = await fetch(
        `http://localhost:3001/api/admin/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            group: activeGroup,
          }),
        }
      );

      const updated = await response.json();

      if (!response.ok) {
        alert("Ошибка: " + (updated.error || response.status));
        return;
      }

      setCategories((prev) =>
        prev.map((cat) => (cat._id === categoryId ? updated : cat))
      );
      setEditingCategory(null);
      setIsEditCategoryModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("Ошибка сети");
    }
  };

  const deleteCategory = async () => {
    if (!activeCategoryId) return;
    if (!window.confirm("Удалить категорию? Позиции останутся без категории!")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:3001/api/admin/categories/${activeCategoryId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        alert("Ошибка удаления");
        return;
      }

      setCategories((prev) => prev.filter((cat) => cat._id !== activeCategoryId));
      setMenuItems([]);
      setActiveCategoryId(null);
    } catch (e) {
      alert("Ошибка сети");
    }
  };

  const currentCategory =
    categories.find((cat) => cat._id === activeCategoryId) || null;

  if (loading) {
    return <div className="adminmenu__state">Загрузка меню...</div>;
  }

  if (error) {
    return <div className="adminmenu__state adminmenu__state--error">{error}</div>;
  }

  return (
    <section className="adminmenu">
      <header className="adminmenu__topbar">
        <div className="adminmenu__topbar-heading">
          <h1 className="adminmenu__title">Управление меню</h1>
          <p className="adminmenu__subtitle">
            Управление категориями и позициями меню бара
          </p>
        </div>

        <div className="adminmenu__panel">
          <h2 className="adminmenu__section-title">Категории</h2>
          <div className="adminmenu__actions">
            <button
              type="button"
              className="adminmenu__button"
              onClick={() => setIsAddCategoryModalOpen(true)}
            >
              Добавить категорию
            </button>
            <button
              type="button"
              className="adminmenu__button adminmenu__button--secondary"
              onClick={openEditCategoryModal}
              disabled={!activeCategoryId}
            >
              Редактировать
            </button>
            <button
              type="button"
              className="adminmenu__button adminmenu__button--danger"
              onClick={deleteCategory}
              disabled={!activeCategoryId}
            >
              Удалить
            </button>
          </div>
        </div>

        <div className="adminmenu__panel">
          <h2 className="adminmenu__section-title">Позиции</h2>
          <div className="adminmenu__toolbar">
            <label className="adminmenu__select">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
              <span>Выделить все ({menuItems.length})</span>
            </label>

            <div className="adminmenu__actions">
              <button
                type="button"
                className="adminmenu__button"
                onClick={() => setIsAddModalOpen(true)}
              >
                Добавить позицию
              </button>
              <button
                type="button"
                className="adminmenu__button adminmenu__button--secondary"
                onClick={openEditModal}
                disabled={selectedItems.length !== 1}
              >
                Редактировать
              </button>
              <button
                type="button"
                className="adminmenu__button adminmenu__button--danger"
                onClick={deleteSelected}
                disabled={selectedItems.length === 0}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="adminmenu__tabs">
        <button
          type="button"
          className={`adminmenu__tab ${
            activeGroup === "food" ? "adminmenu__tab--active" : ""
          }`}
          onClick={() => handleGroupChange("food")}
        >
          Еда
        </button>

        <button
          type="button"
          className={`adminmenu__tab ${
            activeGroup === "drinks" ? "adminmenu__tab--active" : ""
          }`}
          onClick={() => handleGroupChange("drinks")}
        >
          Напитки
        </button>
      </div>

      <div className="adminmenu__chips">
        {categories.map((category) => (
          <button
            key={category._id}
            type="button"
            className={`adminmenu__chip ${
              activeCategoryId === category._id ? "adminmenu__chip--active" : ""
            }`}
            onClick={() => setActiveCategoryId(category._id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <section className="adminmenu__content">
        <h2 className="adminmenu__category-title">
          {currentCategory ? currentCategory.name : "Нет категории"}
        </h2>

        {menuItems.length > 0 ? (
          <div className="adminmenu__list">
            {menuItems.map((item, index) => {
              const itemId = item._id || item.id || `temp-${index}`;
              const isSelected = selectedItems.includes(itemId);

              return (
                <article
                  key={itemId}
                  className={`adminmenu__card ${
                    isSelected ? "adminmenu__card--selected" : ""
                  }`}
                >
                  <div className="adminmenu__card-check">
                    <label className="adminmenu__select">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleItem(itemId)}
                      />
                      <span>Выбрать</span>
                    </label>
                  </div>

                  <div className="adminmenu__card-body">
                    <h3 className="adminmenu__card-title">{item.name}</h3>
                    <p className="adminmenu__card-price">{item.price} ₽</p>
                    <p className="adminmenu__card-meta">
                      {item.weight_value}
                      {item.weight_unit}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="adminmenu__state">В этой категории пока нет позиций</div>
        )}
      </section>

      <AdminModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onSubmit={handleAddCategory}
        group={activeGroup}
        category=""
        newItem={{ name: "" }}
        mode="add"
        entityType="category"
      />

      <AdminModal
        isOpen={isEditCategoryModalOpen}
        onClose={() => setIsEditCategoryModalOpen(false)}
        onSubmit={handleEditCategory}
        group={activeGroup}
        category=""
        newItem={editingCategory}
        mode="edit"
        entityType="category"
      />

      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddItem}
        group={activeGroup}
        category={currentCategory?.name || ""}
        newItem={newItem}
        mode="add"
        entityType="item"
      />

      <AdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditItem}
        group={activeGroup}
        category={currentCategory?.name || ""}
        newItem={editingItem}
        mode="edit"
        entityType="item"
      />
    </section>
  );
};

export default AdminMenu;