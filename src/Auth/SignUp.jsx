/*import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { UserAuth } from "../Context/AuthContext";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


const styles = {
  container: {
    display: "flex",
    background:
      "url(https://i.postimg.cc/C5mmSLQx/pattern-rectangular-cube-digital-art-wallpaper-preview.jpg)",
    backgroundSize: "cover",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  googleButton: {
    marginTop: "1rem",
    border: "1px solid blue",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const SignUp = () => {
  const { user } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !username.trim() || !phoneNumber.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      await updateProfile(newUser, {
        displayName: username,
        phoneNumber: phoneNumber,
      });

      console.log(newUser);

      setEmail("");
      setPassword("");
      setUsername("");
      setPhoneNumber("");
      setError("");
      setIsLoading(false);

      navigate("/Profile");
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/Signup");
    }
  }, [user]);

  return (
    <>
      <Container maxWidth="xl" style={styles.container}>
        <CssBaseline />
        <Container maxWidth="xs" style={styles.formContainer}>
          <form onSubmit={signUp}>
            <Typography variant="h5" style={{ display: "flex" }}>
              Join us&nbsp;
              <Typography variant="overline">here</Typography>
            </Typography>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <TextField
              type="text"
              label="User Name"
              margin="normal"
              variant="outlined"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /><br/>
            <TextField
              type="email"
              label="Email"
              margin="normal"
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br/>
            <TextField
              type="password"
              label="Password"
              margin="normal"
              variant="outlined"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br/>
            <TextField
              type="tel"
              label="Mobile Number"
              margin="normal"
              variant="outlined"
              placeholder="Enter your mobile number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            
            <br />
            <div style={styles.loadingContainer}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  style={styles.googleButton}
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Sign Up
                </Button>
              )}
            </div>
          </form>
        </Container>
      </Container>
    </>
  );
};

export default SignUp;
*/
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { UserAuth } from "../Context/AuthContext";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import video from '../Pages/vid.mp4'
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    position: "relative", // Add this to handle video positioning
  },
  videoBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1, // Place the video behind other content
  },
  formContainer: {
    backgroundColor: 'white',
    // backgroundColor: "rgba(255, 255, 255, 0.8)", Add background color with transparency
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  googleButton: {
    marginTop: "1rem",
    border: "1px solid blue",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const SignUp = () => {
  const { user } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !username.trim() || !phoneNumber.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      await updateProfile(newUser, {
        displayName: username,
        phoneNumber: phoneNumber,
      });

      console.log(newUser);

      setEmail("");
      setPassword("");
      setUsername("");
      setPhoneNumber("");
      setError("");
      setIsLoading(false);
      navigate("/Account");
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/Todo");
    }
  }, [user]);

  return (
    <>
      <Container maxWidth="xl" style={styles.container}>
        <CssBaseline />
        {/* Add a video element for the background */}
        <video
          autoPlay
          loop
          muted
          style={styles.videoBackground}
        >
          <source
            src={video}
            type="video/mp4"
          />
          
        </video>
        <Container maxWidth="xs" style={styles.formContainer}>
          <form onSubmit={signUp}>
            <Typography variant="h5" style={{ display: "flex" }}>
              Join us&nbsp;
              <Typography variant="overline">here</Typography>
            </Typography>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <TextField
              type="text"
              label="User Name"
              margin="normal"
              variant="outlined"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /><br/>
            <TextField
              type="email"
              label="Email"
              margin="normal"
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br/>
            <TextField
              type="password"
              label="Password"
              margin="normal"
              variant="outlined"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br/>
            <TextField
              type="tel"
              label="Mobile Number"
              margin="normal"
              variant="outlined"
              placeholder="Enter your mobile number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            
            <br />
            <div style={styles.loadingContainer}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  style={styles.googleButton}
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Sign Up
                </Button>
              )}
            </div>
          </form>
        </Container>
      </Container>
    </>
  );
};

export default SignUp;






/*import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    marginTop: '2rem',
  },
  paper: {
    padding: '2rem',
  },
};

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // State for username
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsSignIn((prevMode) => !prevMode);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        email,
        password,
        ...(isSignIn ? {} : { name }), // Include username only for signup
      };

      const response = await fetch(
        isSignIn ? 'http://localhost:5000/signin' : 'http://localhost:5000/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody), // Include username when signing up
        }
      );

      if (response.ok) {
        // Sign-in or sign-up successful
        setError('');
        console.log(isSignIn ? 'Sign-in successful' : 'Sign-up successful');

        // Navigate to the "Account" page
        navigate('/account');
      } else {
        // Sign-in or sign-up failed
        const data = await response.json();
        setError(data.error || 'Sign-in or sign-up failed');
        console.error('Sign-in or sign-up failed:', data.error || 'Unknown error');
      }
    } catch (error) {
      setError('Internal Server Error');
      console.error('Internal Server Error:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={styles.container}>
      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h4" gutterBottom>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isSignIn && (
            <TextField
              label="name" // Label for username field
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)} // Set username state
            />
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
        <Grid container justifyContent="center">
          <Button onClick={toggleAuthMode}>
            {isSignIn ? 'Switch to Sign Up' : 'Switch to Sign In'}
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AuthPage;
*/