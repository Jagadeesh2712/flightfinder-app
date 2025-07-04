import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import FlightSearch from './pages/FlightSearch';
import FlightDetails from './pages/FlightDetails';
import Booking from './pages/Booking';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { FlightProvider } from './context/FlightContext';

function App() {
  return (
    <AuthProvider>
      <FlightProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<FlightSearch />} />
              <Route path="/flight/:id" element={<FlightDetails />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </FlightProvider>
    </AuthProvider>
  );
}

export default App;