import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, CssBaseline, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typewriter from 'typewriter-effect';
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

import video from '../Pages/vid.mp4'
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '90vh',

  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1, // Place the video behind other content
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px'
  },
  googleButton: {
    marginTop: '1rem',
    borderRadius: '1vh',
    border: '1px solid blue',
    width: '100%',
  },
};


const Home = () => {
  const user = UserAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    alert('Please log in to continue.');

  };

  const handleTodoClick = () => {
    if (user) {

      navigate('/Todo');
    } else {

      alert('Please log in to access Todo.');
    }
  };

  return (
    <Container maxWidth="xl" style={styles.container}>
      <CssBaseline />
      <video autoPlay loop muted style={styles.videoBackground}>
        <source src={video} type="video/mp4" />
      </video>
      <Container maxWidth="md" style={{ background: 'pink', borderRadius: '115px 520px 130px', color: 'red' }}>
        <Card style={styles.formContainer}>
          <CardContent >
            <Typography variant="h4" color={'cadetblue'} gutterBottom>
              Welcome to ToDo`s
            </Typography>
            <Typewriter
              options={{
                strings: [
                  '<span style="color: #FF0000; fontWeight:bolder;">Task Management</span>',
                  '<span style="color: #00FF00; fontWeight:bolder;">Stay Organized</span>',
                  '<span style="color: #0000FF; fontWeight:bolder;">Get Things Done</span>',
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                escapeHtml: false,
              }}
            />

          </CardContent>
        </Card>

      </Container>
    </Container>);
};

export default Home;
