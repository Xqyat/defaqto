import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import EventCard from "../../components/EventCard/EventCard";
import EventCardModal from "../../components/EventCardModal/EventCardModal";
import Separator from "../../components/Separator/Separator";
import "./Home.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://localhost:3001/api/events");

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Ошибка загрузки событий:", err);
        setError("Не удалось загрузить события");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  function parseEventDate(date, time = "00:00") {
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }

  const upcomingEvents = useMemo(() => {
    const now = new Date();

    return [...events]
      .filter((event) => {
        if (!event.date) return false;
        return parseEventDate(event.date, event.time) >= now;
      })
      .sort((a, b) => parseEventDate(a.date, a.time) - parseEventDate(b.date, b.time))
      .slice(0, 3);
  }, [events]);

  const handleEventClick = (event) => {
      setSelectedEvent(event);
      setIsOpen(true);
  };

  function renderEvents() {
    if (loading) {
      return (
        <li className="home-events__status">
          Загрузка событий...
        </li>
      );
    }

    if (error) {
      return (
        <li className="home-events__status home-events__status--error">
          {error}
        </li>
      );
    }

    if (upcomingEvents.length === 0) {
      return (
        <li className="home-events__status">
          Ближайших событий пока нет
        </li>
      );
    }

    return upcomingEvents.map((event) => (
      <li className="home-events__item" key={event.id || event._id}>
        <EventCard
          img={event.img}
          name={event.name}
          description={event.description}
          date={event.date}
          time={event.time}
          entranceType={event.entranceType}
          entrancePrice={event.entrancePrice}
          onClick={() => handleEventClick(event)}
        />
      </li>
    ));
  }

  return (
    <>
      <Helmet>
        <title>DeFAQto — бар-клуб с живой музыкой</title>
        <meta
          name="description"
          content="DeFAQto — бар-клуб с живым джазом, соулом, рок-н-роллом и событиями 7 дней в неделю. Афиша ближайших выступлений и атмосфера ночного бара."
        />
        <meta
          name="keywords"
          content="DeFAQto, бар, клуб, живая музыка, джаз, афиша, концерты, Москва"
        />
        <meta property="og:title" content="DeFAQto — бар-клуб с живой музыкой" />
        <meta
          property="og:description"
          content="Живой джаз, соул, рок-н-ролл, вечерние события и атмосфера бара-клуба DeFAQto."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://defaqto.ru/" />
        <meta property="og:image" content="https://defaqto.ru/og-image.jpg" />
        <meta property="og:locale" content="ru_RU" />
      </Helmet>

      <main className="home page-container" aria-labelledby="home-title">
        <section className="home-hero" aria-labelledby="home-title">
          <h1 id="home-title" className="home-hero__title">
            DeFAQto — бар живой музыки
          </h1>

          <p className="home-hero__text">
            DeFAQto — бар-клуб, где живой джаз, соул, хип-хоп, рок-н-ролл и рок
            звучат 7 дней в неделю. Здесь легко сорваться в танцы на стойке, а по
            выходным к атмосфере добавляются ди-джеи. Алкоголь льётся рекой, а
            стейки подают с фирменной шпажкой с уникальным порядковым номером.
          </p>
        </section>

        <Separator />

        <section className="home-events" aria-labelledby="events-title">
          <h2 id="events-title" className="home-events__title">
            Ближайшие события
          </h2>

          <ul className="home-events__list">
            {renderEvents()}
          </ul>
        </section>

        <Separator />

        <EventCardModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          event={selectedEvent}
        />
      </main>
    </>
  );
}

export default Home;