import { ShoppingBag } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { Stack } from "@mui/system"

export const KingdomShop = () => {
  return (
    <Stack alignItems='center' direction='row'>
      <ShoppingBag sx={{ width: 200, height: 200 }} />
      <Typography variant="h2">
        Shop details
      </Typography>
    </Stack>
  )
}
