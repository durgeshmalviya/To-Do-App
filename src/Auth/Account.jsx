import React, { useState, useEffect } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import {
  Container,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import { UserAuth } from '../Context/AuthContext';
import { useAuth, upload } from '../firebase';
import { CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { database } from '../firebase';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const styles = {
  container: {
    marginTop:'80px',
    padding: '3rem',
    background: '#403A3E', // Fallback for old browsers
    background: '-webkit-linear-gradient(to top, #BE5869, #403A3E)', // Chrome 10-25, Safari 5.1-6
    background: 'linear-gradient(to top, #BE5869, #403A3E)',
    borderRadius: '120px 10px 120px 10px',
    display: 'grid',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',

  },
  avatar: {
    width: '160px',
    height: '160px',

    
  },
  uploadButton: {
    color: 'white',
    background: 'red',
    borderRadius: '90px',
   
   
  },
  waveAnimation: {
    animation: 'wave 2s linear infinite',
    display: 'inline-block',
    marginRight: '5px',
  },
};

const Account = () => {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    'https://i.postimg.cc/t4yQKtGb/wall.png'
  );
  const { user } = UserAuth();
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  async function handleClick() {
    setLoading(true);
    await upload(photo, currentUser, setLoading);
    setLoading(false);
  }

  const handleMenuOpen = (postId, event) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
  };

  const handleDeletePost = async (postId) => {
    try {
      const postRef = doc(database, 'posts', postId);
      await deleteDoc(postRef);
      setData((prevData) => prevData.filter((item) => item.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          return;
        }

        const q = query(
          collection(database, 'posts'),
          where('userId', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setData(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
<Container maxWidth="xs" style={styles.container}>
        <Container maxWidth="xs" style={styles.profileContainer}>
          <div style={{ position: 'static', width: '200px', padding: '10px',alignSelf:'center' }}>
            <label htmlFor="fileInput">
              <Avatar
                src={photoURL}
                alt="Profile"
                style={styles.avatar}
              /><br/>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }}
                id="fileInput"
              />
            </label>
            <Button
              variant="contained"
              disabled={loading || !photoURL}
              onClick={handleClick}
              style={styles.uploadButton}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} color="inherit" />
                  <span style={styles.waveAnimation}></span>
                </>
              ) : (
                <>
                  <CloudUploadIcon style={{ marginRight: '5px' }} />
                  Update
                </>
              )}
            </Button>
          </div>      
     
        <Typography variant="h5" style={{ fontWeight: 'bold', color:'#29323c'}}>
          {currentUser?.displayName}'s Profile
        </Typography>
        <Typography variant="body2"  style={{ fontWeight: 'bold', color:'#29323c'}}>{currentUser?.email}</Typography>
        <Typography variant="body2"  style={{ fontWeight: 'lighter', color:'#29323c'}}>
          {currentUser?.emailVerified
            ? 'Email Verified'&&<VerifiedIcon/>
            : 'Email not Verified'}
        </Typography>
      </Container>
      </Container>
    </>
  );
};

export default Account;
