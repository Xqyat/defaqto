import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [summary, setSummary] = useState({
    eventsCount: 0,
    itemsCount: 0,
    categoriesCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");

        const response = await fetch("/api/admin/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Не удалось загрузить данные");
        }

        setSummary(data);
      } catch (err) {
        setError(err.message || "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <main className="admin-dashboard">
        <div className="admin-dashboard__container">
          <div className="admin-dashboard__hero">
            <h1 className="admin-dashboard__title">Дэшборд</h1>
            <p className="admin-dashboard__subtitle">Загрузка данных...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="admin-dashboard">
        <div className="admin-dashboard__container">
          <div className="admin-dashboard__hero">
            <h1 className="admin-dashboard__title">Дэшборд</h1>
            <p className="admin-dashboard__error">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard__container">
        <section className="admin-dashboard__hero">
          <span className="admin-dashboard__eyebrow">Админ-панель DeFAQto</span>
          <h1 className="admin-dashboard__title">Дэшборд</h1>
          <p className="admin-dashboard__subtitle">
            Краткий обзор контента сайта и быстрый переход к управлению событиями и меню
          </p>
        </section>

        <section className="admin-dashboard__stats">
          <article className="admin-stat-card">
            <span className="admin-stat-card__label">События</span>
            <strong className="admin-stat-card__value">{summary.eventsCount}</strong>
            <p className="admin-stat-card__text">Все опубликованные события и афиша бара</p>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-card__label">Позиции меню</span>
            <strong className="admin-stat-card__value">{summary.itemsCount}</strong>
            <p className="admin-stat-card__text">Все блюда, закуски, коктейли и напитки</p>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-card__label">Категории</span>
            <strong className="admin-stat-card__value">{summary.categoriesCount}</strong>
            <p className="admin-stat-card__text">Разделы, которые структурируют меню</p>
          </article>
        </section>

        <section className="admin-dashboard__actions">
          <div className="admin-dashboard__actions-header">
            <h2 className="admin-dashboard__section-title">Быстрые действия</h2>
            <p className="admin-dashboard__section-text">
              Выбери нужный раздел для редактирования контента сайта
            </p>
          </div>

          <div className="admin-dashboard__links">
            <Link to="/admin/events" className="admin-dashboard__link">
              <span className="admin-dashboard__link-title">Управление событиями</span>
              <span className="admin-dashboard__link-text">
                Добавление, редактирование и удаление афиши
              </span>
            </Link>

            <Link to="/admin/menu" className="admin-dashboard__link">
              <span className="admin-dashboard__link-title">Управление меню</span>
              <span className="admin-dashboard__link-text">
                Работа с категориями, блюдами и напитками
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminPanel;