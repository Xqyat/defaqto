import { useState, useEffect, useMemo } from "react";
import LogoBlack from "../../assets/images/DeFaqtoLogoBlack.png";
import EventCard from "../../components/EventCard/EventCard";
import Separator from "../../components/Separator/Separator";
import "./Home.css";

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
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
        };

        fetchEvents();
    }, []);

    const parseEventDate = (date, time = "00:00") => {
        const [year, month, day] = date.split("-").map(Number);
        const [hours, minutes] = time.split(":").map(Number);
        return new Date(year, month - 1, day, hours, minutes);
    };

    const upcomingEvents = useMemo(() => {
        const now = new Date();

        return [...events]
            .filter((event) => {
                if (!event.date) return false;
                return parseEventDate(event.date, event.time) >= now;
            })
            .sort((a, b) => {
                return parseEventDate(a.date, a.time) - parseEventDate(b.date, b.time);
            })
            .slice(0, 3);
    }, [events]);

    return (
        <main className="home">
            <div className="main-info">
                <div className="info-logo">
                    <img src={LogoBlack} alt="Defaqto" />
                </div>
                <p>
                    DeFAQto - бар‑клуб, где живой джаз, соул, хип‑хоп, рок‑н‑ролл и рок звучат 7 дней в 
                    неделю. Здесь легко сорваться в танцы на стойке, а по выходным к атмосфере 
                    добавляются ди‑джеи. Алкоголь льётся рекой, а стейки подают с фирменной 
                    шпажкой с уникальным порядковым номером.
                </p>
            </div>

            <Separator />

            <div className="main-events">
                <h2>Ближайшие события</h2>

                <div className="events-elems">
                    {loading ? (
                        <p>Загрузка событий...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : upcomingEvents.length === 0 ? (
                        <p>Ближайших событий пока нет</p>
                    ) : (
                        upcomingEvents.map((event) => (
                            <EventCard
                                key={event.id || event._id}
                                img={event.img}
                                name={event.name}
                                description={event.description}
                                date={event.date}
                                time={event.time}
                                entranceType={event.entranceType}
                                entrancePrice={event.entrancePrice}
                            />
                        ))
                    )}
                </div>
            </div>

            <Separator />
        </main>
    );
}

export default Home;