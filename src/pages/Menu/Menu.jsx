import MenuSection from '../../components/MenuSection/MenuSection.jsx';

function Menu(){
    const cocktails = {
        title: "Коктейли",
        items: [
            { id: 1, name: "Мохито", weight: "50мл", price: "500₽" },
            { id: 2, name: "Маргарита", weight: "60мл", price: "550₽" },
            { id: 3, name: "Космополитен", weight: "55мл", price: "600₽" }
        ]
    };
    
    return(
        <>
        <main className="menu">
            <MenuSection {...cocktails}/>
        </main>
        </>
    )
}
export default Menu;