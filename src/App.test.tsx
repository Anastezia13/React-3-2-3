import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    expect(document.querySelector('#root')).toBeDefined();
  });
});