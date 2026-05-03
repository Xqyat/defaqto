import { useState, useEffect } from 'react';
import MenuSection from '../../components/MenuSection/MenuSection.jsx';
import './Menu.css';
import { Helmet } from 'react-helmet-async';

function Menu(){
    const [activeGroup, setActiveGroup] = useState('food');
    const [activeSectionKey, setActiveSectionKey] = useState('salads');
    const [menuData, setMenuData] = useState({ food: {}, drinks: {} });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/menu')
          .then(r => r.json())
          .then(data => {
            setMenuData(data || { food: {}, drinks: {} });
            setLoading(false);
            if (data.food && Object.keys(data.food).length > 0) {
                setActiveSectionKey(Object.keys(data.food)[0]); 
              } else if (data.drinks && Object.keys(data.drinks).length > 0) {
                setActiveSectionKey(Object.keys(data.drinks)[0]); 
              }
            })
            .catch(e => {
              console.error(e);
              setLoading(false);
            });
        }, []);

      const currentDataSections = activeGroup === 'food' 
        ? (menuData.food || {}) 
        : (menuData.drinks || {});
    const currentNavSections = Object.entries(currentDataSections).map(([key, section]) => ({
        key,
        name: section.title 
    }));

    const currentSectionContent = currentDataSections[activeSectionKey] || { 
        title: 'Нет данных', 
        items: [] 
      };
    if (loading) return <div>Загрузка меню...</div>;
    return(
        <>
            <Helmet>
                <title>Меню | DeFAQto</title>
                <meta name="description" content="Меню бара DeFAQto — блюда и напитки, авторская кухня, коктейли. Забронируйте стол, чтобы попробовать всё." />
                <meta name="keywords" content="меню, DeFAQto, бар, еда, напитки, коктейли, бронирование" />
                <meta property="og:title" content="Меню DeFAQto" />
                <meta property="og:description" content="Авторские блюда и напитки в баре DeFAQto. Посмотрите наше меню и забронируйте столик." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://defaqto.ru/menu" />
                <meta property="og:image" content="https://defaqto.ru/og-image-menu.jpg" />
            </Helmet>
            <main className="menu">
                <div className="menu-topbar">
                    <button
                        className={`menu-topbar__button ${activeGroup === 'food' ? 'active' : ''}`}
                        onClick={() => {
                        setActiveGroup('food');
                        const firstFoodKey = Object.keys(menuData.food || {})[0];
                        setActiveSectionKey(firstFoodKey || '');
                        }}
                    >
                        Еда
                    </button>
                    <button
                        className={`menu-topbar__button ${activeGroup === 'drinks' ? 'active' : ''}`}
                        onClick={() => {
                        setActiveGroup('drinks');
                        const firstDrinkKey = Object.keys(menuData.drinks || {})[0];
                        setActiveSectionKey(firstDrinkKey || '');
                        }}
                    >
                        Напитки
                    </button>
                </div>
                <nav className="menu-navbar">
                    <ul className="menu-navbar__list">
                        {currentNavSections.map((section) => (
                        <li key={section.key} className="menu-navbar__item">
                            <button
                            className={`menu-tab ${section.key === activeSectionKey ? 'active' : ''}`}
                            onClick={() => setActiveSectionKey(section.key)}
                            >
                            {section.name}
                            </button>
                        </li>
                        ))}
                    </ul>
                </nav>
                <MenuSection 
                    title={currentSectionContent.title} 
                    items={currentSectionContent.items}
                    maxInitial={8}
                />
            </main>
        </>
    )
}
export default Menu;