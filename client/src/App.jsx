import React, { Children, useContext } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ChatSection from './components/ChatSection/ChatSection.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthContext from './context/Authcontext.js'


const App = () => {

  //redirects to the login page if the user is not authenticated
  const Protected = ({ children }) => {
    const { AuthUser } = useContext(AuthContext)
    if (!AuthUser?.isverified) {
      return <Navigate to='/login' replace />
    }
    return children
  }

  //redirects to the  chat page if the user is  authenticated
  const RedirectToChat = ({ children }) => {
    const { AuthUser } = useContext(AuthContext)
    if (AuthUser?.isverified) {
      return <Navigate to='/' replace />
    }
    return children
  }

  return (
    <div className='h-screen w-full ' >
      <Routes>
        <Route path='/' element={<Protected><ChatSection /></Protected>} />
        <Route path='/login' element={<RedirectToChat><Login /></RedirectToChat>} />
        <Route path='/signup' element={<RedirectToChat><Signup /></RedirectToChat>} />
        <Route path='*' element={<Navigate to={'/'} replace/>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App