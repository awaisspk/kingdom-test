import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material"
import { Link as RouterLink, LinkProps as RouterLinkProps, useLocation } from 'react-router-dom'
import { Code, Person, ShoppingBag } from "@mui/icons-material";
import { Box } from "@mui/system";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  selected: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  itemProps,
  ref,
) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

export function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to, selected } = props;

  return (
    <li>
      <ListItem component={Link} to={to} disablePadding>
        <ListItemButton
          selected={selected}
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
  // get the current location
  const location = useLocation()

  return (
    <Box>
      <Paper square elevation={0}
        sx={{
          background: "#161717",
          height: "calc(100vh - 2rem)",
          width: '100%',
          padding: "1rem 0px",
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
            selected={location.pathname === '/shop'}
          />
          <ListItemLink
            to="/customers"
            primary="Customers"
            icon={<Person />}
            selected={location.pathname === '/customers'}
          />
          <ListItemLink
            to="/devops"
            primary="Dev Ops"
            icon={<Code />}
            selected={location.pathname === '/devops'}
          />
        </List>
      </Paper>
    </Box>
  )
}
