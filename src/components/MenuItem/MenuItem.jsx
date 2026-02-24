import './MenuItem.css';

function MenuItem({ name, price, weight }) {
    return (
        <>
        <div className="menu_elem_item">
            <div className="menu_item_main">
                <span className="menu-item-name">{name}</span>
                <span className="menu-item-price">{price}</span>
            </div>
            <hr />
            <div className="menu-item-weight">
                <span>{weight}</span>
            </div>
        </div>
        </>
    );
}

export default MenuItem;