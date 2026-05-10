import { render, screen } from '@testing-library/react';
import MenuSection from '../../../src/components/MenuSection/MenuSection';

describe('MenuSection', () => {
  // Создаём уникальные ключи для каждого элемента
  const mockItems = Array(10).fill().map((_, index) => ({
    _id: `item-${index}`,
    name: `Тестовое блюдо ${index}`,
    description: 'Описание',
    price: 500
  }));

  test('54: отображает переданный заголовок', () => {
    render(<MenuSection title="Афиша" items={[]} maxInitial={5} />);
    expect(screen.getByText('-Афиша-')).toBeInTheDocument();
  });

  test('55: кнопка "Показать ещё" отображается при items > maxInitial', () => {
    render(<MenuSection title="Тест" items={mockItems} maxInitial={5} />);
    expect(screen.getByText(/Показать ещё/)).toBeInTheDocument();
  });

  test('55.2: кнопка отсутствует, если items.length <= maxInitial', () => {
    const smallItems = mockItems.slice(0, 3);
    render(<MenuSection title="Тест" items={smallItems} maxInitial={5} />);
    expect(screen.queryByText(/Показать ещё/)).not.toBeInTheDocument();
  });
});