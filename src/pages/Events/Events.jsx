import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import EventCard from '../../components/EventCard/EventCard.jsx';
import EventCardModal from '../../components/EventCardModal/EventCardModal.jsx';
import Button from "../../components/Button/Button.jsx";
import './Events.css';

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(7); 
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch('/api/events')
            .then(r => r.json())
            .then(setEvents)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsOpen(true);
    };

    if (loading) return <div className="events-loader">Загрузка событий...</div>;

    const displayedEvents = events.slice(0, visibleCount);

    return (
        <>
            <Helmet>
                <title>Афиша — DeFAQto</title>
                <meta
                    name="description"
                    content="Афиша бара DeFAQto: ближайшие концерты, вечеринки и специальные события."
                />
                <meta property="og:title" content="Афиша — DeFAQto" />
                <meta
                    property="og:description"
                    content="Смотрите ближайшие события бара DeFAQto: концерты, вечеринки и музыкальные вечера."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://defaqto.ru/events" />
                <meta property="og:image" content="https://defaqto.ru/og-image.jpg" />
                <meta property="og:locale" content="ru_RU" />
            </Helmet>
            <main className="events page-container">
                <div className="events-cardlist">
                    {displayedEvents.map(event => (
                        <EventCard
                            key={event.id}
                            {...event}
                            onClick={() => handleEventClick(event)}
                        />
                    ))}
                </div>

                {events.length === 0 && <p className="events-empty">Событий пока нет</p>}

                {visibleCount < events.length && (
                    <div className="events-controls">
                        <Button className="events-more-button" onClick={() => setVisibleCount(prev => prev + 7)}>
                            Далее...
                        </Button>
                    </div>
                )}

                <EventCardModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    event={selectedEvent}
                />
            </main>
        </>
    );
}

export default Events;