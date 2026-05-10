import { render, screen } from '@testing-library/react';
import EventCardModal from '../../components/EventCardModal/EventCardModal';

describe('EventCardModal', () => {
  const mockEvent = {
    img: 'test.jpg',
    name: 'Тестовое событие',
    description: 'Описание события',
    date: '2024-12-31',
    time: '20:00',
    entranceType: 'paid',
    entrancePrice: 1000
  };

  test('52: isOpen=true – модалка отображается', () => {
    render(<EventCardModal isOpen={true} event={mockEvent} onClose={jest.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Тестовое событие')).toBeInTheDocument();
  });

  test('53: isOpen=false – не рендерится', () => {
    render(<EventCardModal isOpen={false} event={mockEvent} onClose={jest.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});