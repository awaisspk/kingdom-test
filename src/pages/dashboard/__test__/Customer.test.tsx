import { render, screen, cleanup, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Customers } from '../Customer'

describe('Customers', () => {
  afterEach(cleanup);

  it('Renders lists of emails', async () => {
    const { getByTestId } = render(<Customers />, { wrapper: BrowserRouter });
    await waitForElementToBeRemoved(() => screen.getByTestId('loading-skeleton-1'));
    await waitFor(() => {
      expect(getByTestId('customer-accounts')).toBeInTheDocument();
    });
  });

})
