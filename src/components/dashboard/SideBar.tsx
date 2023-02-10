import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material"
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { Code, Person, ShoppingBag } from "@mui/icons-material";
import { Box } from "@mui/system";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  selected: boolean;
  onClick: (selected: string) => void
}

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  itemProps,
  ref,
) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to, onClick, selected } = props;

  return (
    <li>
      <ListItem component={Link} to={to} disablePadding>
        <ListItemButton
          selected={selected}
          onClick={() => onClick(primary)}
        >
          {icon ? <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>{icon}</ListItemIcon> : null}
          <ListItemText
            primary={primary}
            primaryTypographyProps={{
              'aria-selected': selected,
            }}
            sx={{ color: 'white' }}
          />
        </ListItemButton>
      </ListItem>
    </li>
  );
}

export const SideBar = () => {
  const [selected, setSelected] = React.useState('Shop');

  const handleSelectedItem = (
    selected: string,
  ) => {
    setSelected(selected);
  };

  return (
    <Box position='fixed'>
      <Paper square elevation={0}
        sx={{
          background: "#161717",
          height: "100vh",
          padding: "1rem",
          color: 'white'
        }}
      >
        <Typography variant='h4' component='h1' align="center" mb={3}>
          Web of Death
        </Typography>
        <List>
          <ListItemLink
            to="/shop"
            primary="Shop"
            icon={<ShoppingBag />}
            selected={selected === 'Shop'}
            onClick={handleSelectedItem}
          />
          <ListItemLink
            to="/customers"
            primary="Customers"
            icon={<Person />}
            selected={selected === 'Customers'}
            onClick={handleSelectedItem}
          />
          <ListItemLink
            to="/devops"
            primary="Dev Ops"
            icon={<Code />}
            selected={selected === 'Dev Ops'}
            onClick={handleSelectedItem}
          />
        </List>
      </Paper>
    </Box>
  )
}
