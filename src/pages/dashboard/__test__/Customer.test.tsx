import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Customers } from '../Customer'

describe('Customers', () => {

  it('Renders lists of emails', async () => {
    const { findByTestId } = render(<Customers />, { wrapper: BrowserRouter });
    await waitForElementToBeRemoved(() => screen.getByTestId('loading-skeleton-1'));
    expect(await findByTestId('customer-accounts')).toBeInTheDocument();
  });

})
