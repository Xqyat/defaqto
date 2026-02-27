export const foodSections = {
    salads: {    
        title: "Салаты",
        items: [
            { id: 1, name: "Овощной салат с сыром фета", weight: "300г", price: "520₽" },
            { id: 2, name: "Салат с баклажанами и муссом из феты", weight: "280г", price: "440₽" },
            { id: 3, name: "Вителло тоннато", weight: "200г", price: "890₽" },
            { id: 4, name: "Салат с пастрами из индейки", weight: "200г", price: "520₽" },
            { id: 5, name: "Стейк салат", weight: "300г", price: "1390₽" },
            { id: 6, name: "Цезарь с курицей", weight: "225г", price: "590₽" },
            { id: 7, name: "Цезарь с креветками", weight: "225г", price: "690₽" }
        ]
    },
    cold: {
        title: "Холодные закуски",
        items: [
            { id: 1, name: "Брускетта с пастрами из индейки", weight: "100г", price: "390₽" },
            { id: 2, name: "Брускетта с креветками / сёмгой", weight: "100г", price: "540₽" },
            { id: 3, name: "Брускетта с голубым сыром и грушей", weight: "80г", price: "390₽" },
            { id: 4, name: "Тартар из говядины", weight: "200г", price: "790₽" },
            { id: 5, name: "Карпаччо из говядины", weight: "150г", price: "590₽" },
            { id: 6, name: "Закуска к вину", weight: "250г", price: "640₽" },
            { id: 7, name: "Сет к водке", weight: "530г", price: "990₽" },
            { id: 8, name: "Сырная тарелка", weight: "250г", price: "670₽" },
            { id: 9, name: "Овощная закуска", weight: "195г", price: "390₽" },
            { id: 10, name: "Мясное ассорти", weight: "340г", price: "450₽" },
            { id: 11, name: "Оливки", weight: "100г", price: "270₽" }
        ]
    },
    hot:{
        title: "Горячие закуски",
        items: [
            { id: 1, name: "Тако с курицей", weight: "160г", price: "360₽" },
            { id: 2, name: "Тако с говядиной", weight: "160г", price: "390₽" },
            { id: 3, name: "Шаурма с курицей", weight: "340г", price: "460₽" },
            { id: 4, name: "Бургер на римском тесте", weight: "240г", price: "850₽" },
            { id: 5, name: "Сэндвич с курицей", weight: "400г", price: "790₽" },
            { id: 6, name: "Сэндвич с томлёной говядиной", weight: "400г", price: "790₽" },
            { id: 7, name: "Мини чебурек (3 шт)", weight: "200г", price: "390₽" },
            { id: 8, name: "Попкорн из креветок", weight: "130г", price: "640₽" }
        ]
    },
    beer_snacks:{
        title: "Закуски к пиву",
        items: [
            { id: 1, name: "Чесночные гренки / Луковые кольца", weight: "140г", price: "390₽" },
            { id: 2, name: "Куриные палочки", weight: "150г", price: "390₽" },
            { id: 3, name: "Сырные палочки", weight: "150г", price: "470₽" },
            { id: 4, name: "Куриные крылышки", weight: "320г", price: "550₽" },
            { id: 5, name: "Пивная тарелка", weight: "340г", price: "990₽" }
        ]
    },
    pizza:{
        title: "Римская пицца",
        items: [
            { id: 1, name: "Пицца «Маргарита»", weight: "350г", price: "670₽" },
            { id: 2, name: "Пицца с пеперони", weight: "350г", price: "790₽" },
            { id: 3, name: "Пицца с курицей и грибами", weight: "350г", price: "840₽" },
            { id: 4, name: "Пицца с горгонзолой и грушей", weight: "350г", price: "790₽" },
            { id: 5, name: "Пицца с индейкой и беконом", weight: "350г", price: "840₽" }
        ]
    },
    soups: {
        title: "Супы",
        items: [
            { id: 1, name: "Куриный бульон с сырной гренкой", weight: "200г", price: "390₽" },
            { id: 2, name: "Немецкий картофельный суп", weight: "250г", price: "440₽" },
            { id: 3, name: "Борщ с томлёной говядиной", weight: "250г", price: "440₽" },
            { id: 4, name: "Грибной крем-суп", weight: "250г", price: "440₽" }
        ]
    },
    breakfast:{
        title: "Завтраки 24/7",
        items: [
            { id: 1, name: "Омлет с мортаделлой и шпинатом", weight: "300г", price: "550₽" },
            { id: 2, name: "Брускетта с мортаделлой и яйцом", weight: "200г", price: "450₽" },
            { id: 3, name: "Картофель с беконом и яичницей", weight: "300г", price: "440₽" },
            { id: 4, name: "Шакшука", weight: "250г", price: "460₽" },
            { id: 5, name: "Ирландский завтрак", weight: "400г", price: "740₽" },
            { id: 6, name: "Сырники из рикотты", weight: "150г", price: "490₽" },
            { id: 7, name: "Омлет из трёх яиц", weight: "300г", price: "260₽" },
            { id: 8, name: "Яичница из двух яиц", weight: "120г", price: "200₽" }
        ]
    },
    pasta:{
        title: "Паста и лапша",
        items: [
            { id: 1, name: "Фарфалле с куриной грудкой", weight: "300г", price: "690₽" },
            { id: 2, name: "Паккери с томлёной говядиной", weight: "280г", price: "790₽" },
            { id: 3, name: "Удон с хрустящим цыплёнком", weight: "300г", price: "790₽" },
            { id: 4, name: "Спагетти «Карбонара»", weight: "300г", price: "640₽" }
        ]
    },
    hot_dishes:{
        title: "Горячие блюда",
        items: [
            { id: 1, name: "Стейк D.F.Special из мраморного мяса", weight: "100г", price: "720₽" },
            { id: 2, name: "Гриль бургер Faqtum King из говядины", weight: "400г", price: "770₽" },
            { id: 3, name: "Куриная грудка с грибным соусом", weight: "300г", price: "740₽" },
            { id: 4, name: "Котлеты домашние из курицы", weight: "450г", price: "690₽" },
            { id: 5, name: "Томлёная говядина с пюре", weight: "300г", price: "740₽" },
            { id: 6, name: "Жареный рис с курицей", weight: "300г", price: "570₽" },
            { id: 7, name: "Жареный рис с креветками", weight: "300г", price: "630₽" },
            { id: 8, name: "Поке с креветками", weight: "300г", price: "690₽" },
            { id: 9, name: "Бифштекс из говядины с картофелем", weight: "400г", price: "890₽" },
            { id: 10, name: "Бефстроганов", weight: "400г", price: "890₽" },
            { id: 11, name: "Рёбра свиные с картофелем", weight: "400г", price: "940₽" },
            { id: 12, name: "Стейк Бавет", weight: "350г", price: "1740₽" }
        ]
    },
    sides:{
        title: "Гарниры",
        items: [
            { id: 1, name: "Картофельные чипсы", weight: "60г", price: "180₽" },
            { id: 2, name: "Картофель по-деревенски", weight: "120г", price: "240₽" },
            { id: 3, name: "Картофель фри", weight: "120г", price: "270₽" },
            { id: 4, name: "Картофель фри с пармезаном", weight: "120г", price: "340₽" },
            { id: 5, name: "Картофель по-бельгийски с беконом", weight: "250г", price: "310₽" },
            { id: 6, name: "Овощи гриль", weight: "150г", price: "310₽" },
            { id: 7, name: "Жареный рис", weight: "150г", price: "210₽" },
            { id: 8, name: "Картофельное пюре", weight: "150г", price: "210₽" },
            { id: 9, name: "Соусы в ассортименте", weight: "30г", price: "90₽" }
        ]
    },
    desserts:{
        title: "Десерты",
        items: [
            { id: 1, name: "Яблочный штрудель", weight: "170г", price: "490₽" },
            { id: 2, name: "Шоколадный фондант", weight: "150г", price: "540₽" },
            { id: 3, name: "Чизкейк Сан-Себастьян", weight: "200г", price: "490₽" },
            { id: 4, name: "Тирамису", weight: "200г", price: "570₽" },
            { id: 5, name: "Мороженое", weight: "50г", price: "210₽" }
        ]
        }
};
    