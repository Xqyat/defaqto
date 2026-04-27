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

        const response = await fetch("http://localhost:3001/api/admin/dashboard", {
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
        <h1 className="admin-dashboard__title">Дэшборд</h1>
        <p className="admin-dashboard__subtitle">Загрузка данных...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="admin-dashboard">
        <h1 className="admin-dashboard__title">Дэшборд</h1>
        <p className="admin-dashboard__error">{error}</p>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Дэшборд</h1>
        <p className="admin-dashboard__subtitle">
          Краткий обзор данных сайта DeFAQto
        </p>
      </div>

      <section className="admin-dashboard__stats">
        <article className="admin-stat-card">
          <span className="admin-stat-card__label">События</span>
          <strong className="admin-stat-card__value">{summary.eventsCount}</strong>
          <p className="admin-stat-card__text">Все опубликованные события</p>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-card__label">Позиции меню</span>
          <strong className="admin-stat-card__value">{summary.itemsCount}</strong>
          <p className="admin-stat-card__text">Все блюда и напитки</p>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-card__label">Категории</span>
          <strong className="admin-stat-card__value">{summary.categoriesCount}</strong>
          <p className="admin-stat-card__text">Все разделы меню</p>
        </article>
      </section>

      <section className="admin-dashboard__actions">
        <h2 className="admin-dashboard__section-title">Быстрые действия</h2>
        <div className="admin-dashboard__links">
          <Link to="/admin/events" className="admin-dashboard__link">
            Управление событиями
          </Link>
          <Link to="/admin/menu" className="admin-dashboard__link">
            Управление меню
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AdminPanel;