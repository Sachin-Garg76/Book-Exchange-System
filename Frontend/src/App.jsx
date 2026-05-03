import React from 'react'
import { Routes, Route } from "react-router-dom";

import HomePage from './Component/Home/HomePage';
import Login from './Component/auth/Loginpage';
import Signup from './Component/auth/Signup';
import Contact from './Component/Home/ContactUs';
import AddBook from '../src/Component/User/AddBook';
import About from './Component/Home/AboutUs';
import UserHome from './Component/User/UserHome';
import BookReq from './Component/User/BookReq';
import ProtectedRoute from '../src/Component/auth/ProtectedRoute';
import Mybooks from './Component/User/Mybooks';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />

      {/* 🔐 PROTECTED ROUTES */}
      <Route path="/user" element={
        <ProtectedRoute>
          <UserHome />
        </ProtectedRoute>
      } />

      <Route path="/addbook" element={
        <ProtectedRoute>
          <AddBook />
        </ProtectedRoute>
      } />

      <Route path="/requests" element={
        <ProtectedRoute>
          <BookReq />
        </ProtectedRoute>
      } />

      {/* TEMP mybooks */}
      <Route path="/mybooks" element={
        <ProtectedRoute>
          <Mybooks />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App;