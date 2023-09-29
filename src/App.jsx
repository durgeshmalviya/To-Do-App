import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthContextProvider } from './Context/AuthContext';
import Account from './Auth/Account';
import Signin from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Protected from './Auth/Protected';
import DrawerAppBar from './Pages/Nav';
import Home from './Pages/Home';
import Todo from './Pages/Todo';
import '@fontsource/roboto/300.css';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <DrawerAppBar />
        <Link to="/https://todo-app-xrne.onrender.com"></Link>
        <Link to="/https://todo-app-xrne.onrender.com/Login"></Link>
        <Link to="/https://todo-app-xrne.onrender.com/Account"></Link>
        <Link to="/https://todo-app-xrne.onrender.com/Signup"></Link>
        <Link to="/https://todo-app-xrne.onrender.com/Todo"></Link>
        <Routes>
          <Route path="/https://todo-app-xrne.onrender.com" element={<Home />} />
          <Route path="/https://todo-app-xrne.onrender.com/Login" element={<Signin />} />
          <Route path="/https://todo-app-xrne.onrender.com/Signup" element={<SignUp />} />
          <Route path="/https://todo-app-xrne.onrender.com/Account" element={<Protected><Account/></Protected>} />
          <Route path="/https://todo-app-xrne.onrender.com/Todo" element={<Protected><Todo/></Protected>} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
