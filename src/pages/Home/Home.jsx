import LogoBlack from "../../assets/images/DeFaqtoLogoBlack.png";
import Separator from "../../assets/images/DefaqtoTexture.png";
import Sever from "../../assets/images/Sever.jpg";
import "./Home.css";

function Home(){
    return(
        <>
            <main className="home">
                <div className="main-info">
                    <div className="info-logo">
                        <img src={LogoBlack} alt="Defaqto" />
                    </div>
                    <p>
                        DeFAQto - бар‑клуб, где живой джаз, соул, хип‑хоп, рок‑н‑ролл и рок звучат 7 дней в 
                        неделю. Здесь легко сорваться в танцы на стойке, а по выходным к атмосфере 
                        добавляются ди‑джеи. Алкоголь льётся рекой, а стейки подают с фирменной 
                        шпажкой с уникальным порядковым номером.
                    </p>
                </div>
                <div className="main-separator">
                    <img src={Separator} alt="" />
                </div>
                <div className="main-events">
                    <h2>Наши события</h2>
                    <div className="events-elems">
                        {Array(9).fill(0).map((_, index) => (
                            <img 
                            key={index}
                            src={Sever}
                            alt="Описание"
                            />
                        ))}
                    </div>
                </div>
                <div className="main-separator">
                    <img src={Separator} alt="" />
                </div>
                <div className="main-info">
                    <h2>Верните Рынду, суки!</h2>
                    <img src={LogoBlack} alt="" />
                    <p>
                        Полное название коктейля «Лесной пожар 2010 или
                        Верните рынду, суки!». История коктейля восходит к
                        лесным пожарам в августе 2010 года. Один житель
                        тверской области в это период опубликовал в своем
                        блоге пост: «верните рынду, суки!». Длинный пост с
                        большим количеством нецензурщины разоблачал
                        власти всех уровней и обвинял их в бездействии и в
                        том, что они ко всему прочему зарубают инициативу
                        самих жителей, которые сами за свой счет хотят
                        защитить себя от огня. Рынду (корабельный колокол)
                        который висел в их деревне десятки лет и помогал
                        добровольцам-пожарникам и то скоммуниздили, а
                        властям – до фени. Владимир Владимирович Путин
                        лично среагировал на этот пост. Автор поста – в один
                        день стал знаменитостью. Рында – стала синонимом
                        свободы слова и активной жизненной позиции
                    </p>
                </div>

            </main>
        </>
    )
}
export default Home;