import { Code } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { Stack } from "@mui/system"

export const DevOps = () => {
  return (
    <Stack alignItems='center' direction='row'>
      <Code sx={{ width: 200, height: 200 }} />
      <Typography variant="h2">
        Dev Ops details
      </Typography>
    </Stack>
  )
}
