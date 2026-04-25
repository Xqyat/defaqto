import { useNavigate  } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./NotFound.css"

const NotFound = () => {

    const navigate = useNavigate();

    const handleBack = () => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    };

    return(
        <>
            <main className="notfound">
              <div className="notfound_card">
                <span className="notfound_code">404</span>
                <h1 className="notfound_title">Страница не найдена</h1>
                <p className="notfound_text">
                  Возможно, ссылка устарела или страница была перемещена.
                </p>
                <div className="notfound_actions">
                  <Button onClick={handleBack}>Вернуться назад</Button>
                </div>
              </div>
            </main>
        </>
    )
}
export default NotFound;