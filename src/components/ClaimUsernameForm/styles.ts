import { Box, styled, TextInput } from '@anderson-silva-ui/react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  marginTop: '$4',
  padding: '$4',

  [`${TextInput}`]: {
    height: 40,
  },

  '@media(max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})
