import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';
import Button from '../../components/Button/Button';

const AdminLogin = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/admin/login', {
        login,
        password,
      });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin');
    } catch (err) {
      alert('Ошибка: ' + err.response.data.error);
    }
  };

  return (
    <main className="adminlogin__wrapper">
      <form className="adminlogin" onSubmit={handleSubmit}>
        <h2 className="adminlogin__title">Авторизация</h2>

        <input
          className="adminlogin__input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Логин"
        />

        <input
          className="adminlogin__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />

        <Button className="adminlogin__button" type="submit">
          Войти
        </Button>
      </form>
    </main>
  );
};

export default AdminLogin;