import { useState, useEffect } from 'react';
import EventCard from '../../components/EventCard/EventCard.jsx';
import EventCardModal from '../../components/EventCardModal/EventCardModal.jsx';
import Button from "../../components/Button/Button.jsx";
import './Events.css';

function Events(){
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);  
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/api/events')
        .then(r => r.json())
        .then(setEvents)
        .catch(console.error)
        .finally(() => setLoading(false))
    }, [])     

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsOpen(true);  
      };
    
      
    if (loading) return <div>Загрузка событий...</div>

    return(
        <>
        <main className="events">
            <div className='events-cardlist'>
                {events.map(event => (
                    <EventCard 
                        key={event.id}
                        img={event.img}
                        name={event.name}
                        description={event.description}
                        date={event.date}
                        time={event.time}
                        entranceType={event.entranceType}
                        entrancePrice={event.entrancePrice}
                        onClick={() => {handleEventClick(event);}}                      
                    />
                ))}
            </div>
            {events.length === 0 && <p>Событий пока нет</p>}
            <Button>Далее...</Button>
            <EventCardModal 
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            event={selectedEvent}
            />
        </main>
        </>
    )
}
export default Events;