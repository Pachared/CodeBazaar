import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import type { SxProps, Theme } from '@mui/material'

interface CartIconProps {
  sx?: SxProps<Theme>
}

export const CartIcon = ({ sx }: CartIconProps) => {
  return <ShoppingBagOutlinedIcon sx={sx} />
}
