import './PrivacyPolicy.css';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Политика обработки персональных данных | DeFAQto</title>
        <meta
          name="description"
          content="Политика конфиденциальности бара DeFAQto. Узнайте, как мы обрабатываем ваши персональные данные при бронировании стола."
        />
        <meta name="keywords" content="политика конфиденциальности, персональные данные, DeFAQto, бар, бронирование" />
        <meta property="og:title" content="Политика конфиденциальности DeFAQto" />
        <meta
          property="og:description"
          content="Ознакомьтесь с политикой обработки персональных данных в баре DeFAQto. Ваши данные под защитой."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://defaqto.ru/privacy-policy" />
        <meta property="og:image" content="https://defaqto.ru/og-image-privacy.jpg" />
      </Helmet>

      <main className="privacy-policy">
        <section className="section-general">
          <h1 className="policy-title">Политика обработки персональных данных</h1>

          <section className="section-provisions">
            <h2 className="section-number">1. Общие положения</h2>
            <p>
              Настоящая политика обработки персональных данных составлена в соответствии с Федеральным законом от
              27.07.2006 № 152-ФЗ «О персональных данных» (далее — Закон) и определяет порядок обработки персональных
              данных и меры по обеспечению их безопасности, предпринимаемые{' '}
              <span className="operator">[ФИО владельца или ИП "DeFAQto", адрес, ИНН]</span> (далее — Оператор).
              Политика применяется ко всей информации о посетителях сайта{' '}
              <a href="https://defaqto.bar">https://defaqto.bar</a>, включая данные, собираемые при бронировании стола.
            </p>
          </section>

          <section className="section-definitions">
            <h2 className="section-number">2. Основные понятия</h2>
            <ul className="definitions-list">
              <li><strong>Автоматизированная обработка</strong> — обработка с помощью компьютеров.</li>
              <li><strong>Персональные данные</strong> — имя и номер телефона, предоставленные при бронировании.</li>
              <li><strong>Обработка</strong> — сбор, хранение, использование для подтверждения брони.</li>
              <li><strong>Пользователь</strong> — посетитель сайта <a href="https://defaqto.bar">https://defaqto.bar</a>.</li>
              <li><strong>Блокирование</strong> — временная приостановка обработки.</li>
              <li><strong>Обезличивание</strong> — удаление связи с конкретным лицом.</li>
            </ul>
          </section>

          <section className="section-operator-rights">
            <h2 className="section-number">3. Права и обязанности Оператора</h2>
            <p>
              Оператор вправе собирать имя и телефон для бронирования, хранить их до подтверждения визита. Обязанности:
              обеспечивать конфиденциальность, отвечать на запросы пользователей по email{' '}
              <a href="mailto:privacy@defaqto.bar">privacy@defaqto.bar</a> в течение 10 дней, уничтожать данные после
              цели обработки.
            </p>
          </section>

          <section className="section-user-rights">
            <h2 className="section-number">4. Права пользователей</h2>
            <p>
              Пользователи могут запросить информацию об обработке, уточнить, заблокировать или удалить данные, отозвать
              согласие через <a href="mailto:privacy@defaqto.bar">privacy@defaqto.bar</a>. Жалобы подаются в Роскомнадзор
              или суд.
            </p>
          </section>

          <section className="section-principles">
            <h2 className="section-number">5. Принципы обработки</h2>
            <p>
              Обработка законна, ограничена бронированием, точна и минимальна. Данные хранятся не дольше 30 дней после
              брони или до отзыва согласия.
            </p>
          </section>

          <section className="section-purposes">
            <h2 className="section-number">6. Цели и данные</h2>
            <ul className="purposes-list">
              <li><strong>Цель обработки:</strong> Бронирование стола</li>
              <li><strong>Персональные данные:</strong> Имя, номер телефона</li>
              <li>
                <strong>Правовое основание:</strong> Часть 5 статьи 6 Федерального закона № 152-ФЗ (исполнение договора)
              </li>
            </ul>
          </section>

          <section className="section-conditions">
            <h2 className="section-number">7. Условия обработки</h2>
            <p>
              Согласие дается при заполнении формы бронирования. Данные не передаются третьим лицам, кроме случаев по
              закону.
            </p>
          </section>

          <section className="section-processing">
            <h2 className="section-number">8. Порядок обработки</h2>
            <p>
              Данные защищены паролями, SSL, хранением на сервере Оператора. Актуализация — по email{' '}
              <a href="mailto:privacy@defaqto.bar">privacy@defaqto.bar</a>. Отзыв согласия — тем же способом. Сторонние
              сервисы (если используются) отвечают по своим политикам.
            </p>
          </section>

          <section className="section-actions">
            <h2 className="section-number">9. Действия с данными</h2>
            <p>Сбор, хранение, использование для SMS/звонка подтверждения, удаление после.</p>
          </section>

          <section className="section-transfer">
            <h2 className="section-number">10. Трансграничная передача</h2>
            <p>Не осуществляется.</p>
          </section>

          <section className="section-confidentiality">
            <h2 className="section-number">11. Конфиденциальность</h2>
            <p>Данные не разглашаются без согласия.</p>
          </section>

          <section className="section-final">
            <h2 className="section-number">12. Заключительные положения</h2>
            <p>
              Разъяснения по <a href="mailto:privacy@defaqto.bar">privacy@defaqto.bar</a>. Политика бессрочна, актуальна
              на <a href="https://defaqto.bar/privacy/">https://defaqto.bar/privacy/</a>.
            </p>
          </section>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;