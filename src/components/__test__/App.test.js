import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';

test('First Test', () => {
    render(<App />);

    expect(screen.getByText('Hello From React!')).toBeInTheDocument();
});