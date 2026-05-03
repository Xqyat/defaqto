import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Button from "../../components/Button/Button";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Helmet>
        <title>404 — Страница не найдена | DeFAQto</title>
        <meta
          name="description"
          content="К сожалению, запрашиваемая страница не найдена. Вернитесь на главную страницу бара DeFAQto."
        />
        <meta name="keywords" content="404, страница не найдена, DeFAQto" />
        <meta property="og:title" content="404 — Страница не найдена | DeFAQto" />
        <meta
          property="og:description"
          content="К сожалению, страница не найдена. Возможно, она была перемещена или удалена."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://defaqto.ru/404" />
        <meta property="og:image" content="https://defaqto.ru/og-image-404.jpg" />
      </Helmet>

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
  );
};

export default NotFound;