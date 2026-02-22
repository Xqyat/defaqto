import AfishaCard from '../../components/EventCard/EventCard.jsx';
import Button from "../../components/Button/Button.jsx";
import './Events.css';

function Events(){
    return(
        <>
        <main className="events">
            <div className='events-cardlist'>
                <AfishaCard/>
                <AfishaCard/>
                <AfishaCard/>
                <AfishaCard/>
                <AfishaCard/>
                <AfishaCard/>
                <AfishaCard/>
                <AfishaCard/>
            </div>
            <Button>Далее...</Button>
        </main>
        </>
    )
}
export default Events;