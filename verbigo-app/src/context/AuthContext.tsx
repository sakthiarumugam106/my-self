import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Student, Tutor } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'tutor' | 'admin') => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@edico.com',
    name: 'Ravi Kumar',
    role: 'student',
    phone: '+91 9876543210',
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    email: 'tutor@edico.com',
    name: 'Priya Sharma',
    role: 'tutor',
    phone: '+91 9876543211',
    joinDate: '2023-06-10'
  },
  {
    id: '3',
    email: 'admin@edico.com',
    name: 'Admin User',
    role: 'admin',
    phone: '+91 9876543212',
    joinDate: '2023-01-01'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'student' | 'tutor' | 'admin'): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for existing session on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoggedIn: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};