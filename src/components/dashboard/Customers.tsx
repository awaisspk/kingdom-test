import { useEffect, useState } from "react";
import { Box, Button, List, ListItem, ListItemButton, ListItemText, MenuItem, Pagination, Select, Skeleton, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useSearchParams } from "react-router-dom";
import useSWR from 'swr'
import { fetcher } from "../../utils";

type ICustomers = {
  loading: boolean;
  customers: {
    max_results: number;
    accounts: {
      id: number;
      email: string;
    }[] | [];
  }
}

export const CustomersList = ({ customers, loading }: ICustomers) => {
  const [selected, setSelected] = useState('');
  const [seachParams, setSearchParams] = useSearchParams()

  const handleSelectedItem = (
    selected: string,
  ) => {
    setSelected(selected);
  };

  useEffect(() => {
    if (!loading && customers.max_results > 0) {
      setSelected(customers.accounts[0].email)
    }
  }, [customers, loading])


  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          height: 'calc(100vh - 40px)',
          minWidth: '300px',
          rowGap: 2,
          padding: '20px 5px'
        }}
      >
        <TextField
          label="Search"
          size="small"
          fullWidth
          onChange={(e) => setSearchParams({ q: e.target.value })}
        />

        {loading ? (
          <Stack spacing={2} data-testid='loading-skeleton-1'>
            <Skeleton variant="rectangular" width={300} height={60} />
            <Skeleton variant="rounded" width={300} height={60} />
            <Skeleton variant="rounded" width={300} height={60} />
          </Stack>
        ) : (
          customers.accounts.length > 0 ?
            <>
              <List sx={{ maxHeight: 'calc(100vh - 150px)', overflow: "scroll" }} data-testid='customer-accounts'>
                {customers.accounts.map((customer) => (
                  <ListItem
                    disablePadding
                    key={customer.id}
                  >
                    <ListItemButton
                      selected={selected === customer.email}
                      onClick={() => handleSelectedItem(customer.email)}
                    >
                      <ListItemText primary={customer.email} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              <Pagination
                count={Math.ceil(customers.max_results / 40)}
                page={Number(seachParams.get('page')) || 1}
                onChange={(_e, page) => {
                  setSearchParams({ page: page.toString() })
                }}
                sx={{ height: 40, margin: '0 auto' }}

              />
            </>
            : <p>No Accounts to display</p>
        )}

      </Box>
      {selected && <CustomerDetails email={selected} />}
    </Box>
  )
}

export const CustomerDetails = ({ email }: { email: string }) => {
  const { isLoading, data } = useSWR(`https://base.api/user/${email}`, fetcher)


  return (
    <Box
      sx={{
        padding: '20px 20px',
      }}
    >
      {isLoading ?
        <Stack spacing={2} data-testid='loading-skeleton-2'>
          <Skeleton variant="rectangular" width='100%' height={80} />
          <Skeleton variant="rectangular" width='100%' height={80} />
          <Skeleton variant="rectangular" width='100%' height={80} />
          <Skeleton variant="rectangular" width='100%' height={80} />
        </Stack> :
        <>
          <Stack spacing='20px'>
            <TextField
              label='Email'
              value={data.email}
              fullWidth
            />
            <TextField
              label='Joined'
              value={data.registration_date}
              fullWidth
            />
            <TextField
              label='Activation Status'
              value={data.active === '1' ? "ACTIVE" : "INACTIVE"}
              fullWidth
            />
            <Select
              label='Database Access'
              value={data.scope}
            >
              <MenuItem value='guest'>Guest</MenuItem>
              <MenuItem value='user'>User</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
            </Select>
          </Stack>
          <Stack direction='row' gap={3} mt={5} ml='auto' width='max-content'>
            <Button variant='contained'>UPDATE</Button>
            <Button variant='outlined'>DELETE</Button>
          </Stack>
        </>
      }
    </Box>
  )
}
