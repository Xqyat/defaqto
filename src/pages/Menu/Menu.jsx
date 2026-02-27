import { useState } from 'react';
import { foodSections } from '../../data/food.js';
import { drinkSections } from '../../data/drinks.js';
import MenuSection from '../../components/MenuSection/MenuSection.jsx';
import './Menu.css';

function Menu(){
    const [activeGroup, setActiveGroup] = useState('food');
    const [activeSectionKey, setActiveSectionKey] = useState('salads');

    const currentDataSections = activeGroup === 'food' ? foodSections : drinkSections;
    const currentNavSections = Object.entries(currentDataSections).map(([key, section]) => ({
        key,
        name: section.title
      }));

    const currentSectionContent =
    (activeGroup === 'food' ? foodSections : drinkSections)[activeSectionKey] || 
    { title: 'Раздел в разработке', items: [] };

    return(
        <>
        <main className="menu">
            <div className='menu-topbar'>
                <button
                    className={activeGroup === 'food' ? 'active' : ''}
                    onClick={() => {
                        setActiveGroup('food');
                        setActiveSectionKey('salads');
                    }}
                    >
                    Еда
                </button>

                <button
                    className={activeGroup === 'drinks' ? 'active' : ''}
                    onClick={() => {
                        setActiveGroup('drinks');
                        setActiveSectionKey('cocktails');
                    }}
                    >
                    Напитки
                </button>
            </div>
            <nav className='menu-navbar'>
                <ul>
                    {currentNavSections.map((section) => (
                        <li key={section.key}>
                            <button
                                className={
                                section.key === activeSectionKey ? 'menu-tab active' : 'menu-tab'
                                }
                                onClick={() => setActiveSectionKey(section.key)}
                            >
                                {section.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <MenuSection {...currentSectionContent}/>
        </main>
        </>
    )
}
export default Menu;