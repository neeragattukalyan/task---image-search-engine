import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./hooks/useIntersectionObserver', () => {
  return jest.fn(() => false)
});

describe('Test Search Component', () => {
  it('renders Search Component', () => {
    render(<App />);
    const searchComponent = screen.getByTestId('search-container');
    expect(searchComponent).toBeInTheDocument();
  });

  it('renders images list based on search query', async () => {
    render(<App />);
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, {
      target: { value: "offices" }
    });
    fireEvent.click(screen.getByRole('button'));
    expect(searchInput.value).toBe('offices');
    await waitFor(() => expect(screen.getAllByRole('listitem').length).toBe(10));
  });
})