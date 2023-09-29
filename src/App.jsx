import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      <Router basename="/todo">
        <DrawerAppBar />
        <Link to="/"></Link>
        <Link to="/Login"></Link>
        <Link to="/Signup"></Link>
        <Link to="/Account"></Link>
        <Link to="/Todo"></Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Signin />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Account" element={<Protected><Account /></Protected>} />
          <Route path="/Todo" element={<Protected><Todo /></Protected>} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
