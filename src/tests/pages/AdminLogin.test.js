// Мокаем axios до всего остального
jest.mock('axios');

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AdminLogin from '../../../src/pages/AdminLogin/AdminLogin';

// Мок localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    clear: jest.fn(() => { store = {}; }),
    removeItem: jest.fn(key => delete store[key])
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AdminLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    localStorageMock.clear();
  });

  test('58: успешный вход – сохраняет токен', async () => {
    const fakeToken = 'abc123';
    axios.post.mockResolvedValueOnce({ data: { token: fakeToken } });
    
    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );
    
    await userEvent.type(screen.getByPlaceholderText('Логин'), 'admin');
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'secret');
    await userEvent.click(screen.getByRole('button', { name: 'Войти' }));
    
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('adminToken', fakeToken);
    });
  });

  test('59: ошибка входа – вызов alert', async () => {
    axios.post.mockRejectedValueOnce({ 
      response: { data: { error: 'Неверный логин или пароль' } } 
    });
    
    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );
    
    await userEvent.type(screen.getByPlaceholderText('Логин'), 'wrong');
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: 'Войти' }));
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Ошибка: Неверный логин или пароль');
    });
  });
});