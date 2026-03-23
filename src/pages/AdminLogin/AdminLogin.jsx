import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [login, setLogin] = useState('defadmin');
  const [password, setPassword] = useState('111');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/admin/login', {
        login, password
      });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin');
    } catch (err) {
      alert('Ошибка: ' + err.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Авторизация</h2>
      <input value={login} onChange={e => setLogin(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Войти</button>
    </form>
  );
};

export default AdminLogin;