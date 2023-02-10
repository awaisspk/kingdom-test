import { render, screen } from '@testing-library/react';

import { Customer } from '../Customer';

describe('Customers', () => {
  it('should render customer name', () => {
    render(<Customer />);
    expect(screen.getByText('John')).toBeInTheDocument();
  })
})
