import { render, screen } from '@testing-library/react';

import { Customers } from '../Customer';

describe('Customers', () => {
  it('should render customer name', () => {
    render(<Customers />);
    expect(screen.getByText('John')).toBeInTheDocument();
  })
})
