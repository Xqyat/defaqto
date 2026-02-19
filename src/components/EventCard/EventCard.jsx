import LogoBlack from "../../assets/images/DeFaqtoLogoBlack.png";
import "./EventCard.css";

function EventCard () {
    return(
        <>
            <div className="event_card">
                <div className="event_card-img">
                    <img src={LogoBlack} alt="" />
                </div>
                <div className="event_card-info">
                    <h3 className="event_card-info-name">Text</h3>
                    <p className="event_card-info-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.consectetur adipisicing elit.</p>
                    <p className="event_card-info-date">xx.xx.xxxx</p>
                    <p className="event_card-info-entarance">text</p>
                </div>
            </div>
        </>
    )
}
export default EventCard;