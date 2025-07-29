import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageCircle, Mail, Lock, Users, BookOpen, Shield } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'student' | 'tutor' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    {
      id: 'student' as const,
      name: 'Student',
      icon: Users,
      description: 'Access your courses and progress',
      demoEmail: 'student@verbigo.com'
    },
    {
      id: 'tutor' as const,
      name: 'Tutor',
      icon: BookOpen,
      description: 'Manage classes and student progress',
      demoEmail: 'tutor@verbigo.com'
    },
    {
      id: 'admin' as const,
      name: 'Admin',
      icon: Shield,
      description: 'System administration and analytics',
      demoEmail: 'admin@verbigo.com'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password, selectedRole);
      
      if (success) {
        // Navigate based on role
        switch (selectedRole) {
          case 'student':
            navigate('/student-dashboard');
            break;
          case 'tutor':
            navigate('/tutor-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (role: 'student' | 'tutor' | 'admin') => {
    const demoEmails = {
      student: 'student@edico.com',
      tutor: 'tutor@edico.com',
      admin: 'admin@edico.com'
    };
    setSelectedRole(role);
    setEmail(demoEmails[role]);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Edico</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {/* Role Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 text-center">Select your role</h3>
          <div className="grid grid-cols-1 gap-3">
            {roles.map((role) => (
              <div key={role.id} className="relative">
                <input
                  type="radio"
                  name="role"
                  value={role.id}
                  onChange={(e) => setSelectedRole(e.target.value as 'student' | 'tutor' | 'admin')}
                  className="sr-only"
                  id={role.id}
                  checked={selectedRole === role.id}
                />
                <label
                  htmlFor={role.id}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <role.icon className={`w-6 h-6 mr-4 ${selectedRole === role.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <div className={`font-medium ${selectedRole === role.id ? 'text-blue-900' : 'text-gray-900'}`}>
                      {role.name}
                    </div>
                    <div className={`text-sm ${selectedRole === role.id ? 'text-blue-600' : 'text-gray-500'}`}>
                      {role.description}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials(role.id)}
                    className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                  >
                    Demo
                  </button>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Password for all roles:</strong> password123</p>
            <p><strong>Student:</strong> student@edico.com</p>
            <p><strong>Tutor:</strong> tutor@edico.com</p>
            <p><strong>Admin:</strong> admin@edico.com</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center space-y-2">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
                         New to Edico? Enroll Now
          </button>
          <div className="text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;