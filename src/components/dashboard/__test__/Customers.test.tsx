import { render, screen, cleanup, fireEvent,  waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { accounts } from '../../../mocks/data';
import { CustomersList, CustomerDetails } from '../Customers';

describe('CustomersList', () => {
  afterEach(cleanup);

  it('Render loading state', () => {
    const { getByTestId } = render(<CustomersList customers={{ max_results: 0, accounts: [] }} loading={true} />, { wrapper: BrowserRouter });

    expect(getByTestId('loading-skeleton-1')).toBeInTheDocument();

  });

  it('Render customers list when there are customer accounts', () => {
    const customers = {
      max_results: 2,
      accounts: [
        { id: 1, email: 'random1@email.com' },
        { id: 2, email: 'random2@email.com' }
      ]
    };

    const { getByText } = render(<CustomersList customers={customers} loading={false} />, { wrapper: BrowserRouter });

    expect(getByText('random1@email.com')).toBeInTheDocument();
    expect(getByText('random2@email.com')).toBeInTheDocument();
  });

  it('Render no accounts message when there are no accounts', () => {
    const { getByText } = render(<CustomersList customers={{ max_results: 0, accounts: [] }} loading={false} />, { wrapper: BrowserRouter });

    expect(getByText('No Accounts to display')).toBeInTheDocument();
  });

  it('Handle selected item correctly', () => {
    const customers = {
      max_results: 2,
      accounts: [
        { id: 1, email: 'random1@email.com' },
        { id: 2, email: 'random2@email.com' }
      ]
    };
    const { getByText } = render(<CustomersList customers={customers} loading={false} />, { wrapper: BrowserRouter });

    fireEvent.click(getByText('random2@email.com'));

    expect(getByText('random2@email.com')).toBeInTheDocument()
  });
});


describe('CustomerDetails', () => {
  afterEach(cleanup);

  it('Render loading state', async () => {
    render(<CustomerDetails email={accounts[0].email} />, { wrapper: BrowserRouter });
    expect(await screen.findByTestId('loading-skeleton-2')).toBeInTheDocument();
  });

  it('Render customer details', async () => {

    render(<CustomerDetails email={accounts[0].email} />, { wrapper: BrowserRouter });
    await waitForElementToBeRemoved(() => screen.getByTestId('loading-skeleton-2'));
    expect(screen.getByLabelText('Email')).toHaveValue(accounts[0].email);
    expect(screen.getByLabelText('Activation Status')).toHaveValue('ACTIVE')
  });
})
