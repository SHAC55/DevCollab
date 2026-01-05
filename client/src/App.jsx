import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'

const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user-profile" element={<UserProfile/>} />
    </Routes>
  )
}

export default App