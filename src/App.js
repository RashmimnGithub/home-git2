import React from 'react'
import LoginForm from './login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import Home from './HomeApp'
import PhoneAuth from './PhoneAuth'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginForm />}></Route>
      <Route path='/login' element={<LoginForm />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/forgot' element={<ForgotPassword />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/phoneauth' element={<PhoneAuth />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;