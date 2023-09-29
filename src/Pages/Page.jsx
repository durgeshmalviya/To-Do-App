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
import Typewriter from 'typewriter-effect';
import Image from '../Pages/durgesh.jpg'


const styles = {
  container: {
    padding: '0.5rem',
    background: '#403A3E', // Fallback for old browsers
    background: '-webkit-linear-gradient(to top, #BE5869, #403A3E)', // Chrome 10-25, Safari 5.1-6
    background: 'linear-gradient(to top, #BE5869, #403A3E)',
    borderRadius:'20px 96px 10px 90px',
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
    width: '190px',
    height: '190px',    
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

const Design = () => {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
 
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
          <div style={{ position: 'static', width: '200px', padding: '10px',alignSelf:'center',mixBlendMode:'hard-light' }}>
          
              <Avatar
                src={Image}
                alt="Profile"
                style={styles.avatar}
              />
            </div>      
            <Typewriter
              options={{
                strings: [
                  '<span style="color: White; fontWeight:bolder;">Designed By</span>',
                  '<span style="color: yellow; fontWeight:bolder;">Durgesh Malviya</span>',
                  '<span style="color: #0000FF; fontWeight:bolder;">Follow for more</span>',
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                escapeHtml: false,
              }}
            />

     
       
      </Container>
      </Container>
    </>
  );
};

export default Design;
