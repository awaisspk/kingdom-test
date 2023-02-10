import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SideBar } from '../SideBar';

describe('SideBar', () => {
  it('Renders correctly', () => {
    const { getByText } = render(<SideBar />, { wrapper: BrowserRouter });

    expect(getByText('Web of Death')).toBeInTheDocument();
    expect(getByText('Shop')).toBeInTheDocument();
    expect(getByText('Customers')).toBeInTheDocument();
    expect(getByText('Dev Ops')).toBeInTheDocument();
  });

  it('handles item selection correctly', () => {
    const { getByText } = render(<SideBar />, { wrapper: BrowserRouter });

    fireEvent.click(getByText('Shop'));
    expect(getByText('Shop')).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(getByText('Customers'));
    expect(getByText('Customers')).toHaveAttribute('aria-selected', 'true');
    expect(getByText('Shop')).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(getByText('Dev Ops'));
    expect(getByText('Dev Ops')).toHaveAttribute('aria-selected', 'true');
    expect(getByText('Customers')).toHaveAttribute('aria-selected', 'false');

  });
});
