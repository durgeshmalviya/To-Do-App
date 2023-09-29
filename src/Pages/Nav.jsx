import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import '@fontsource/roboto/300.css';
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { UserAuth } from '../Context/AuthContext';
import Account from '../Auth/Account';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Design from './Page';

const drawerWidth = 240;
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [open, setOpen] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false); // State for the credit modal

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenCreditModal = () => {
    setCreditModalOpen(true);
  };

  const handleCloseCreditModal = () => {
    setCreditModalOpen(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', background: 'pink', height: '800px' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TO-DO`s
      </Typography>
      <Divider />
      <Container maxWidth="xs" style={{ padding: '20px' }}>
        {user?.email ? (
          <>
            <Button variant='contained' fullWidth onClick={handleSignOut} style={{ color: 'brown', textDecoration: 'none', background: 'transparent', border: '1px solid white', borderRadius: '10px', padding: '15px' }}>
              <Typography style={{ color: 'white', }}>Logout</Typography>
            </Button>
            &nbsp;
            <Button variant='contained' fullWidth onClick={handleOpen} style={{ color: 'brown', textDecoration: 'none', background: 'transparent', border: '1px solid white', borderRadius: '10px', padding: '15px' }}>
              <Typography style={{ color: 'white', }}>Account</Typography>
            </Button>
            &nbsp;
            <Button variant='contained' fullWidth onClick={handleOpenCreditModal} style={{ color: 'brown', textDecoration: 'none', background: 'transparent', border: '1px solid white', borderRadius: '10px', padding: '15px' }}>
              <Typography style={{ color: 'white', }}>Credit</Typography>
            </Button>
          </>
        ) : (
          <>
            <Button variant='contained' fullWidth style={{ color: 'brown', textDecoration: 'none', background: 'transparent', border: '1px solid white', borderRadius: '10px', padding: '15px' }}>
              <Link to="/Login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            </Button>&nbsp;
            <Button variant='contained' fullWidth style={{ color: 'brown', textDecoration: 'none', background: 'transparent', border: '1px solid white', borderRadius: '10px', padding: '15px' }}>
              <Link to='/Signup' style={{ color: 'white', textDecoration: 'none' }}>SignUp</Link>
            </Button>
                &nbsp;
            <Button variant='contained' fullWidth onClick={handleOpenCreditModal} style={{ color: 'brown', textDecoration: 'none', background: 'transparent', border: '1px solid white', borderRadius: '10px', padding: '15px' }}>
              <Typography style={{ color: 'white', }}>Credit</Typography>
            </Button>
          </>
        )}

      </Container>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" >
        <DialogTitle style={{ background: '#403A3E', color: 'whitesmoke' }}>Account</DialogTitle>
        <DialogContent style={{ background: '',  }}>
          <Account />
        </DialogContent>
        <DialogActions style={{ background: '#403A3E' }}>
          <Button onClick={handleClose} color="success">
            <Typography color={'white'}>Close</Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={creditModalOpen} onClose={handleCloseCreditModal} maxWidth="xs" fullWidth>
        <DialogTitle style={{ background: '#403A3E', color: 'white' }}>Designed By</DialogTitle>
        <DialogContent style={{ background: 'pink', padding: '10px' }}>
          <Design/>
        </DialogContent>
        <DialogActions style={{ background: '#403A3E' }}>
          <Button onClick={handleCloseCreditModal} color="success">
            <Typography color={'white'}>Close</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  const styles = {
    appbar: {
      background: 'rgba(255, 255, 255, 0.03)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" style={styles.appbar}>
          <Toolbar>
            <IconButton
              color="error"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: 'red', fontWeight: 'bolder' } }}
            >
              TO-DO`s
            </Typography>
            <Button style={{ marginTop: '5px', color: 'white' }}>
              <Link to='/Todo' style={{ color: 'white', width: '85px', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}
              >ToDo`s</Link></Button>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {user?.email ? (
                <Button style={{ marginTop: '5px', color: 'white' }} onClick={handleSignOut}>
                  <Typography style={{ color: 'white', width: '85px', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}
                  >Logout</Typography></Button>
              ) : (
                <Button style={{ marginTop: '5px', color: 'white' }}> <Link to='/Login'
                  style={{ color: 'white', width: '85px', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}
                >Login</Link></Button>
              )}
              &nbsp;
              {user?.email ? (
                <Button style={{ marginTop: '5px', color: 'white' }}>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleOpen}
                    style={{ width: '85px', color: 'white', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}
                  >
                    Account
                  </Link>
                </Button>
              ) : (
                <Button style={{ marginTop: '5px', color: 'white' }}> <Link to='/Signup'
                  style={{ width: '85px', color: 'white', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}>
                  SignUp</Link></Button>
              )}
              {user?.email ? (
                <Button style={{ marginTop: '5px', color: 'white' }} onClick={handleOpenCreditModal }>
                  <Typography style={{ color: 'white', width: '85px', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}
                  >Credit</Typography></Button>
              ) : (
                null
              )}
              &nbsp;
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;




/*import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { UserAuth } from '../Context/AuthContext';
import Account from '../Auth/Account';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Design from './Page';
const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', background: 'pink', height: '800px' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TO-DO`s
      </Typography>
      <Divider />
      <Container maxWidth="xs" style={{ padding:'20px' }}>
        {user?.email ? (
          <>
        <Button variant='contained' fullWidth onClick={handleSignOut} style={{ color: 'brown', textDecoration: 'none', background: 'transparent', border: '1px solid white', borderRadius: '10px', padding: '15px' }}
            >
              <Typography style={{color:'white', }}>Logout</Typography>
            </Button> 
            &nbsp;
            <Button variant='contained' fullWidth onClick={handleOpen} style={{ color: 'brown', textDecoration: 'none', background: 'transparent', border: '1px solid white', borderRadius: '10px', padding: '15px' }}
            >
              <Typography style={{color:'white', }}>Account</Typography>
            </Button> 
            &nbsp;
            <Button variant='contained' fullWidth onClick={handleOpen} style={{ color: 'brown', textDecoration: 'none', background: 'transparent', border: '1px solid white', borderRadius: '10px', padding: '15px' }}
            >
              <Typography style={{color:'white', }}>Dsigned By</Typography>
            </Button> 
          </>
        ) : (
          <>
         <Button variant='contained' fullWidth onClick={handleSignOut} style={{ color: 'brown', textDecoration: 'none', background: 'transparent', border: '1px solid white', borderRadius: '10px', padding: '15px' }}
            >
              <Link to="/Login" style={{color:'white',textDecoration:'none' }}>Login</Link>
            </Button>&nbsp;
            <Button variant='contained' fullWidth onClick={handleSignOut} style={{ color: 'brown', textDecoration: 'none', background: 'transparent', border: '1px solid white', borderRadius: '10px', padding: '15px' }}
            >
              <Link to='/Signup' style={{color:'white',textDecoration:'none' }}>SignUp</Link>
            </Button> </>
        )}

      </Container>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle style={{ background: '#363795', color: 'brown' }}>Account</DialogTitle>
        <DialogContent style={{ background: '#dc2430', padding: '10px' }}>
          <Account />
        </DialogContent>
        <DialogActions style={{ background: '#363795' }}>
          <Button onClick={handleClose} color="success">
            <Typography color={'white'}>Close</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  const styles = {
    appbar: {
      background: 'rgba(255, 255, 255, 0.03)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (<>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" style={styles.appbar}>
        <Toolbar>
          <IconButton
            color="error"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon/>           
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block',color:'red',fontWeight:'bolder' } }}
          >
            TO-DO`s
          </Typography>
          <Button style={{ marginTop: '5px', color: 'white' }}>
                <Link to='/Todo' style={{ color: 'white', width: '85px', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}
                >ToDo`s</Link></Button>


          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user?.email ? (
              <Button style={{ marginTop: '5px', color: 'white' }} onClick={handleSignOut}>
                <Typography style={{ color: 'white', width: '85px', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}
                >Logout</Typography></Button>
            ) : (
              <Button style={{ marginTop: '5px', color: 'white' }}> <Link to='/Login'
                style={{ color: 'white', width: '85px', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}
              >Login</Link></Button>
            )}
            &nbsp;
            {user?.email ? (
              <Button style={{ marginTop: '5px', color: 'white' }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleOpen}
                  style={{ width: '85px', color: 'white', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}
                >
                  Account
                </Link>
              </Button>
            ) : (
              <Button style={{ marginTop: '5px', color: 'white' }}> <Link to='/Signup'
                style={{ width: '85px', color: 'white', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}>
                SignUp</Link></Button>
            )}
             {user?.email ? (
              <Button style={{ marginTop: '5px', color: 'white' }} onClick={handleOpen}>
                <Typography style={{ color: 'white', width: '85px', textDecoration: 'none', background: 'green', padding: '5px', border: '1px solid white', borderRadius: '90px' }}
                >Credit</Typography></Button>
            ) : (
              null
            )}
            &nbsp;
          </Box> 
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  </>);
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;*/
