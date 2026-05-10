import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '../../../src/pages/NotFound/NotFound';

test('60: отображает 404 и кнопку возврата', () => {
  render(
    <Router>
      <NotFound />
    </Router>
  );
  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Вернуться назад' })).toBeInTheDocument();
});