import './MenuSection.css';
import MenuItem from '../MenuItem/MenuItem.jsx';

function MenuSection ({title, items}) {
    const MAX_PER_COLUMN = 5;
    const columns = [];

    for (let i = 0; i < items.length; i += MAX_PER_COLUMN) {
        columns.push(items.slice(i, i + MAX_PER_COLUMN));
    }
    
    return(
        <>
        <section className="menu_elem">
            <h4 className="menu_elem_title">-{title}-</h4>
            <div className="menu-elem-columns">
            {columns.map((columnItems, columnIndex) => (
                <div key={columnIndex} className="menu_elem_column">
                    {columnItems.map((item) => (
                        <MenuItem key={item.id} {...item} />
                    ))}
                </div>
                ))}
            </div>
        </section>
        </>
    )
}

export default MenuSection;