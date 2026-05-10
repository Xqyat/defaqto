import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventCard from '../../../src/components/EventCard/EventCard';

describe('EventCard', () => {
  const mockEvent = {
    img: 'test.jpg',
    name: 'Концерт группы Би-2',
    description: 'Отличный концерт',
    date: '2024-12-31',
    time: '20:00',
    entranceType: 'paid',
    entrancePrice: 1500
  };

  test('48: рендер названия события', () => {
    render(<EventCard {...mockEvent} />);
    expect(screen.getByText('Концерт группы Би-2')).toBeInTheDocument();
  });

  test('49: платный вход – отображает цену', () => {
    render(<EventCard {...mockEvent} />);
    expect(screen.getByText(/Платный — 1500 ₽/)).toBeInTheDocument();
  });

  test('50: бесплатный – отображает "Бесплатный"', () => {
    const freeEvent = { ...mockEvent, entranceType: 'free', entrancePrice: null };
    render(<EventCard {...freeEvent} />);
    expect(screen.getByText('Вход: Бесплатный')).toBeInTheDocument();
  });

  test('51: клик — вызов onClick', async () => {
    const handleClick = jest.fn();
    render(<EventCard {...mockEvent} onClick={handleClick} />);
    const card = screen.getByRole('button');
    await userEvent.click(card);
    expect(handleClick).toHaveBeenCalled();
  });
});