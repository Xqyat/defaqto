import { useState } from 'react';
import './MenuSection.css';
import Button from '../Button/Button.jsx';
import MenuItem from '../MenuItem/MenuItem.jsx';

function MenuSection ({title, items, maxInitial = 8}) {
    const [visibleCount, setVisibleCount] = useState(maxInitial);
    const visibleItems = items.slice(0, visibleCount);
    const showButton = items.length > maxInitial && visibleCount < items.length;

    return(
            <section className="menu_elem">
                <h4 className="menu_elem_title">-{title}-</h4>
                    <div className="menu_elem_column">
                        {visibleItems.map((item) => (
                            <MenuItem key={item._id} {...item} />
                        ))}
                    </div>
                    {showButton && (
                        <div className="show-more-container">
                            <Button
                            variant="primary"
                            size="medium"
                            onClick={() => setVisibleCount(c => c + 8)}>
                                Показать ещё {items.length - visibleCount} позиций
                            </Button>
                        </div>
                    )}
            </section>
    );
}

export default MenuSection;