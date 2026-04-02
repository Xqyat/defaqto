import './MenuItem.css';

function MenuItem({ name, price, weight_value, weight_unit }) {
    return (
        <>
        <div className="menu_elem_item">
            <div className="menu_item_main">
                <span className="menu-item-name">{name}</span>
                <span className="menu-item-price">{price} ₽</span>
            </div>
            <hr />
            <div className="menu-item-weight">
                <span>{weight_value}{weight_unit}</span>
            </div>
        </div>
        </>
    );
}

export default MenuItem;