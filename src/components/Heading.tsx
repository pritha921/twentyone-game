import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import './HeadingStyle.css'
//imprt styles from './HeadingStyle.module.css'

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static"  sx={{ backgroundColor: '#ffff80' }}>
        <Toolbar variant="dense"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
       <h1>
        BAGRAM GAME!!
       </h1>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
