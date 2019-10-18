import { createMuiTheme } from '@material-ui/core/styles'

const primary = '#3A546B'
const blueText = '#7D9BB4'

export default createMuiTheme({
  palette: {
    chart:{
      blue: 'blue',
      orange: 'orange'
    }
  },
  typography: {
    fontFamily: '"Open Sans", "Arial", sans-serif',
    fontWeightMedium: 600,
    subtitle2: {
      fontSize: '13px',
      color: '#88817F',
      fontWeight: 400
    },
    h6: {
      fontSize: '18px',
      color: primary,
      fontWeight: "normal"
    },
    body2: {
      color: blueText,
      fontWeight: 600
    }
  },
})
