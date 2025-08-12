import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import EnrollmentPage from './components/EnrollmentPage';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import TutorDashboard from './components/TutorDashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    switch (user.role) {
      case 'student':
        return <Navigate to="/student-dashboard" replace />;
      case 'tutor':
        return <Navigate to="/tutor-dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin-dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

// App Routes Component
const AppRoutes: React.FC = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          isLoggedIn ? (
            // Redirect logged-in users to their appropriate dashboard
            user?.role === 'student' ? <Navigate to="/student-dashboard" replace /> :
            user?.role === 'tutor' ? <Navigate to="/tutor-dashboard" replace /> :
            user?.role === 'admin' ? <Navigate to="/admin-dashboard" replace /> :
            <Navigate to="/login" replace />
          ) : (
            <EnrollmentPage />
          )
        } 
      />
      
      <Route 
        path="/login" 
        element={
          isLoggedIn ? (
            // Redirect logged-in users to their appropriate dashboard
            user?.role === 'student' ? <Navigate to="/student-dashboard" replace /> :
            user?.role === 'tutor' ? <Navigate to="/tutor-dashboard" replace /> :
            user?.role === 'admin' ? <Navigate to="/admin-dashboard" replace /> :
            <Navigate to="/login" replace />
          ) : (
            <LoginPage />
          )
        } 
      />

      {/* Protected Routes */}
      <Route 
        path="/student-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/tutor-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['tutor']}>
            <TutorDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Catch-all route - redirect to home */}
      <Route 
        path="*" 
        element={
          isLoggedIn ? (
            user?.role === 'student' ? <Navigate to="/student-dashboard" replace /> :
            user?.role === 'tutor' ? <Navigate to="/tutor-dashboard" replace /> :
            user?.role === 'admin' ? <Navigate to="/admin-dashboard" replace /> :
            <Navigate to="/login" replace />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
