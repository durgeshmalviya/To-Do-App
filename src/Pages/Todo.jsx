import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, List, Card, Chip, CardContent } from '@mui/material';
import { addDoc, collection, getDocs, query, where, doc, deleteDoc, updateDoc, orderBy } from 'firebase/firestore';
import { database } from '../firebase';
import '@fontsource/roboto/300.css';
import { UserAuth } from '../Context/AuthContext';
import { BorderVerticalRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router';
const styles = {
  container: {
    background: '#136a8a',
    background: '-webkit-linear-gradient(to right, #136a8a, #267871)',
    background: 'linear-gradient(to right, #136a8a, #267871)',
    padding: '12%',
    textAlign:'justify'
  },

}


const TaskPage = () => {
  const [taskText, setTaskText] = useState('');
  const [taskDateTime, setTaskDateTime] = useState('');
  const [tasks, setTasks] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {

      navigate('/home');
      return;
    }

    fetchUserDetails();
    fetchData();
  }, [user, navigate]);

  const fetchUserDetails = async () => {
    try {
      const userDocRef = doc(database, 'users', user.uid);
      const userDocSnapshot = await getDocs(userDocRef);
      if (userDocSnapshot.exists()) {
        setUserDetails(userDocSnapshot.data());
      }
    } catch (error) {

    }
  };


  const fetchData = async () => {
    try {
      const q = query(
        collection(database, 'tasks'),
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        const taskData = doc.data();
        items.push({ id: doc.id, ...taskData });
      });
      setTasks(items);
    } catch (error) {

    }
  };

  const addTaskToFirestore = async () => {
    try {
      if (!taskText || !user) return;

      const timestamp = taskDateTime || new Date().toISOString();

      await addDoc(collection(database, 'tasks'), {
        userId: user.uid,
        text: taskText,
        timestamp: timestamp,
      });

      setTaskText('');
      setTaskDateTime('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTaskFromFirestore = async (taskId) => {
    try {
      await deleteDoc(doc(database, 'tasks', taskId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTaskInFirestore = async (taskId, newText) => {
    try {
      await updateDoc(doc(database, 'tasks', taskId), {
        text: newText,
      });
      window.location.reload();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (<>
    <Container maxWidth='xl' style={styles.container}>
      <Container maxWidth='md' style={{ background: 'white', display: 'grid', border: '1px solid blue', gap: 10, padding: '20px' }}>
        <TextField
          label="Add Task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <Typography>Completion Date and Time</Typography>
        <TextField
          type="datetime-local"
          value={taskDateTime}
          onChange={(e) => setTaskDateTime(e.target.value)}
        />
        <Button variant="contained" onClick={addTaskToFirestore}>
          Add Task
        </Button>

      </Container>  <br />


      <Typography style={{ color: 'white', mixBlendMode: 'exclusion', textAlign: 'center', fontSize: '20px' }}>Your Tasks </Typography>
      <Container maxWidth='md' style={{ background: '' }}>
        <List>
          {tasks.map((task) => (
            <Card key={task.id} sx={{ maxWidth: 300, display: 'inline-block', margin: '10px', background: '' }}>
              <CardContent>
                <Typography variant="caption" color="brown">
                  Timestamp: {new Date(task.timestamp).toLocaleString()}
                </Typography><br />
                <Typography style={{ color: 'darkcyan', textAlign: 'justify', marginBottom: '10px', fontWeight: 'bolder' }}>{task.text}</Typography>
                <Button variant='outlined' onClick={() => deleteTaskFromFirestore(task.id)}>Delete</Button>&nbsp;
                <Button
                  variant='outlined'
                  onClick={() => {
                    const newText = prompt('Enter new task text:', task.text);
                    if (newText !== null) {
                      updateTaskInFirestore(task.id, newText);
                    }
                  }}
                >
                  Update
                </Button>
              </CardContent>
            </Card>
          ))}
        </List>
      </Container>
    </Container>
  </>
  );
};

export default TaskPage;



/*import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, List, Card, Chip} from '@mui/material';
import { addDoc, collection, getDocs, query, where, doc, deleteDoc, updateDoc, orderBy } from 'firebase/firestore';
import { database } from '../firebase';
import { UserAuth } from '../Context/AuthContext';
import { BorderVerticalRounded } from '@mui/icons-material';
import Pic from './blank.png'

const TaskPage = () => {
  const [taskText, setTaskText] = useState('');
  const [taskDateTime, setTaskDateTime] = useState('');
  const [tasks, setTasks] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const { user } = UserAuth();

  useEffect(() => {
    if (!user) {


       
        window.location.href = '/';
        return;


      fetchUserDetails();
      fetchData();
    }
  }, [user]);
  const fetchUserDetails = async () => {
    try {
      const userDocRef = doc(database, 'users', user.uid);
      const userDocSnapshot = await getDocs(userDocRef);
      if (userDocSnapshot.exists()) {
        setUserDetails(userDocSnapshot.data());
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };


  const fetchData = async () => {
    try {
      const q = query(
        collection(database, 'tasks'),
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        const taskData = doc.data();
        items.push({ id: doc.id, ...taskData });
      });
      setTasks(items);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTaskToFirestore = async () => {
    try {
      if (!taskText || !user) return;

      const timestamp = taskDateTime || new Date().toISOString();

      await addDoc(collection(database, 'tasks'), {
        userId: user.uid,
        text: taskText,
        timestamp: timestamp,
      });

      setTaskText('');
      setTaskDateTime('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTaskFromFirestore = async (taskId) => {
    try {
      await deleteDoc(doc(database, 'tasks', taskId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTaskInFirestore = async (taskId, newText) => {
    try {
      await updateDoc(doc(database, 'tasks', taskId), {
        text: newText,
      });
      window.location.reload();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Container maxWidth="xl" style={{ background:'', marginTop: '80px', display: 'inline', alignItems: 'center', justifyContent: 'center' }}>
    <Container maxWidth='sm' style={{display: 'grid', border: '1px solid blue', gap: 10, padding: '20px',marginTop:'100px' }}>
        <TextField
          label="Add Task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <Typography>Completion Date and Time</Typography>
        <TextField
          type="datetime-local"
          value={taskDateTime}
          onChange={(e) => setTaskDateTime(e.target.value)}
        />
        <Button variant="contained" onClick={addTaskToFirestore}>
          Add Task
        </Button>
      
      </Container>  <br/>
      <Container style={{ display: 'grid',padding:'10px',border:'2px solid pink' }}>      
    <Typography style={{color:'brown',background:'',textAlign:'center',fontSize:'20px'}}>Your Tasks </Typography>
    <List >
          {tasks.map((task) => (
            <List key={task.id} style={{ display: '',padding:'10px',border:'2px solid pink' }}>
              <br/>
              <Typography variant="caption" color="brown">
                Timestamp: {new Date(task.timestamp).toLocaleString()}
              </Typography><br/>
              <Typography style={{fontSize:'',color:'darkgray'}}>{task.text}</Typography>
              <Button variant='outlined' onClick={() => deleteTaskFromFirestore(task.id)}>Delete</Button>&nbsp;
              <Button variant='outlined'
                onClick={() => {
                  const newText = prompt('Enter new task text:', task.text);
                  if (newText !== null) {
                    updateTaskInFirestore(task.id, newText);
                  }
                }}
              >
                Update
              </Button>
            </List>
          ))}
        </List>
      </Container>
    </Container>
  );
};

export default TaskPage;
*/