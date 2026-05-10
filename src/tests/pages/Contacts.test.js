import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contacts from '../../../src/pages/Contacts/Contacts';

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn() }
  });
});

test('56: копирование текста вызывает writeText', async () => {
  render(<Contacts />);
  const emailElement = screen.getByText('bar@defaqto.ru');
  await userEvent.click(emailElement);
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('bar@defaqto.ru');
});

test('57: tooltip исчезает через 800ms', async () => {
  jest.useFakeTimers();
  render(<Contacts />);
  const emailElement = screen.getByText('bar@defaqto.ru');
  
  await act(async () => {
    await userEvent.click(emailElement);
  });
  
  const copyableSpan = emailElement.closest('.copyable');
  const tooltip = copyableSpan.querySelector('.tooltip-text');
  expect(tooltip).toBeVisible();
  
  await act(async () => {
    jest.advanceTimersByTime(800);
  });
  expect(copyableSpan).not.toHaveClass('show-tooltip');
  
  jest.useRealTimers();
});