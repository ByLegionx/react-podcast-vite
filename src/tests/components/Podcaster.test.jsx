import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ContextProvider } from '../../context/ContextProvider';
import { PodCaster } from '../../songs/components/PodCaster';


test('Clicking on PodCaster component redirects to the main route', () => {
  render(
    <MemoryRouter>
        <ContextProvider>
            <PodCaster />
      </ContextProvider>
    </MemoryRouter>
  );

  const podcasterLink = screen.getByText('Podcaster');
  fireEvent.click(podcasterLink);

  expect(window.location.pathname).toBe('/');
});