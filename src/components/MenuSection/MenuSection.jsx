import './MenuSection.css';
import MenuItem from '../MenuItem/MenuItem.jsx';

function MenuSection ({title, items}) {
    return(
        <>
        <section className="menu_elem">
            <h4 className="menu_elem_title">-{title}-</h4>
            <div className="menu_elem_items">
                {items.map((item, index) => (
                    <MenuItem key={item.id || index} {...item} />
                ))}
            </div>
        </section>
        </>
    )
}

export default MenuSection;