import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { ContextProvider } from '../../context/ContextProvider';
import { ActualView } from '../../podcast/pages/ActualView';

const data = {
  Loading: false
};
beforeEach(() => {
  render(
    <BrowserRouter>
      <ContextProvider value={data}>
        <ActualView />
      </ContextProvider>
    </BrowserRouter>
  );
});

describe('Rendering <ActualView/> page', () => {
  test('ActualView renders podCasts', () => {
    const text = screen.getByText(/podcaster/i);
    expect(text).not.toBeNull();
  });

  test('ActualView does not renders the loader', () => {
    const text = screen.getByTestId('header-link-loading');
    expect(text.children.length).toBeGreaterThan(0);
  });

  test('ActualView renders the number of the podcasts', async () => {
    const text = screen.findByText('100');
    expect(text).not.toBeNull();
  });

  test('ActualView render all podcasts', async () => {
    const childrenDivs = screen.getByTestId('songs-container');
    await waitFor(() => {
      expect(childrenDivs.children.length).toBeGreaterThan(0);
    });
  });

  test('renders the input element', () => {
    const inputElement = screen.getByPlaceholderText('Filter podcast...');
    expect(inputElement).not.toBeNull();
  });
});

describe('Renders the podcasts when we type in the input', () => {
  test('renders 1 podcast when typing "the jo"', () => {
    const input = screen.getByPlaceholderText('Filter podcast...');
    fireEvent.change(input, { target: { value: 'the jo' } });

    const songsContainer = screen.getByTestId('songs-container');
    expect(songsContainer.children.length).toBeGreaterThan(0);
  });

  test('renders more than 1 podcast when typing "ki"', () => {
    const input = screen.getByPlaceholderText('Filter podcast...');
    fireEvent.change(input, { target: { value: 'ki' } });

    const songsContainer = screen.getByTestId('songs-container');
    expect(songsContainer.children.length).toBeGreaterThan(0);
  });

  test('does not renders more than 1 podcast when typing "!!"', () => {
    const input = screen.getByPlaceholderText('Filter podcast...');
    fireEvent.change(input, { target: { value: '!!!!!!' } });

    const songsContainer = screen.getByTestId('songs-container');
    expect(songsContainer.children.length).toBe(0);
  });
});
