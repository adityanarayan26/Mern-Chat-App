import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { Zustand } from './store/Zustand.jsx';
import { Toaster } from 'react-hot-toast';
import Settings from './pages/Settings.jsx';
import Profile from './pages/Profile.jsx';

import { useTheme } from './store/useTheme.jsx';



const Main = () => {
  const { checkAuth, authUser, onlineUsers } = Zustand();
  const { theme } = useTheme()
  useEffect(() => {
    checkAuth();

  }, [checkAuth]);






  return (
    <StrictMode>
      <BrowserRouter>
        <div data-theme={theme}>


          <Routes>
            <Route path='/login' element={!authUser ? <Login /> : <Navigate to={'/'} />} />
            <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
            <Route path='/' element={authUser ? <App /> : <Navigate to='/login' />} />
            <Route path='/setting' element={<Settings />} />
            <Route path='/profile' element={authUser ? <Profile /> : "unauthorized user"} />
          </Routes>
        </div>
        <Toaster
          position="bottom-right"
          reverseOrder={true}
        />
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Main />);