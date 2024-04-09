import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Admin from './pages/Admin'
import Home from './pages/Home'


function App() {
  return (
    <>
     <Routes>
     <Route path="/" element={<Login />} />
      <Route path="admin" element={<Admin />} />
      <Route path="home" element={<Home />} />
      {/* <Route path="*" element={<NoMatch />} /> */}
     </Routes>
    </>
  )
}

export default App
