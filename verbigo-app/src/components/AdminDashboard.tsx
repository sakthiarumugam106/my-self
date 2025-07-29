import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, LogOut, DollarSign, Users, BookOpen, TrendingUp, 
  Eye, Edit, Search, Download, Filter, Calendar, CheckCircle2, 
  AlertCircle, CreditCard, User, Phone, Mail
} from 'lucide-react';
import { mockPayments, mockStudents, mockSessions, mockAttendance, mockTutors } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'payments' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calculate statistics
  const totalRevenue = mockPayments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingPayments = mockPayments.filter(payment => payment.status === 'pending');
  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(student => student.paymentStatus === 'paid').length;
  const totalSessions = mockSessions.length;

  // Filter students based on search
  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.enrolledCourses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'students', name: 'Students', icon: Users },
    { id: 'payments', name: 'Payments', icon: DollarSign },
    { id: 'analytics', name: 'Analytics', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edico</h1>
                <p className="text-sm text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard 🎯
          </h2>
          <p className="text-gray-600">Manage your educational platform and track performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Revenue</h3>
            <p className="text-gray-600 text-sm">This month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{totalStudents}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Students</h3>
            <p className="text-gray-600 text-sm">{activeStudents} active</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">{pendingPayments.length}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Pending Payments</h3>
            <p className="text-gray-600 text-sm">Requires attention</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{totalSessions}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Sessions</h3>
            <p className="text-gray-600 text-sm">All time</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Enrollments */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Enrollments</h3>
                    <div className="space-y-4">
                      {mockStudents.slice(0, 5).map((student) => (
                        <div key={student.id} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                            {student.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{student.name}</h4>
                            <p className="text-sm text-gray-600">{student.enrolledCourses[0]} • Joined {student.joinDate}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            student.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                            student.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {student.paymentStatus}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Payments */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Payments</h3>
                    <div className="space-y-4">
                      {mockPayments.slice(0, 5).map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{payment.studentName}</h4>
                              <p className="text-sm text-gray-600">{payment.courseType} • {payment.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">₹{payment.amount}</p>
                            <p className="text-xs text-gray-500">{payment.method}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <Users className="w-8 h-8 text-blue-600 mb-2" />
                      <h4 className="font-medium text-gray-900">Add New Student</h4>
                      <p className="text-sm text-gray-600">Register a new student</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <Download className="w-8 h-8 text-green-600 mb-2" />
                      <h4 className="font-medium text-gray-900">Export Reports</h4>
                      <p className="text-sm text-gray-600">Download attendance & payment reports</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <Calendar className="w-8 h-8 text-purple-600 mb-2" />
                      <h4 className="font-medium text-gray-900">Schedule Session</h4>
                      <p className="text-sm text-gray-600">Add new class session</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Student Management</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Users className="w-4 h-4" />
                      <span>Add Student</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-lg">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{student.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4" />
                                <span>{student.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Phone className="w-4 h-4" />
                                <span>{student.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => setSelectedStudent(selectedStudent === student.id ? null : student.id)}
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Enrolled Courses</p>
                          <p className="font-medium text-gray-900">{student.enrolledCourses.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Join Date</p>
                          <p className="font-medium text-gray-900">{student.joinDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Payment Status</p>
                          <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                            student.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                            student.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {student.paymentStatus.charAt(0).toUpperCase() + student.paymentStatus.slice(1)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Paid</p>
                          <p className="font-medium text-gray-900">₹{student.totalPaid}</p>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {selectedStudent === student.id && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-4">Student Details</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Attendance */}
                            <div>
                              <h6 className="text-sm font-medium text-gray-700 mb-3">Attendance Record</h6>
                              <div className="space-y-2">
                                {mockAttendance.filter(att => att.studentId === student.id).map((record) => {
                                  const session = mockSessions.find(s => s.id === record.sessionId);
                                  return (
                                    <div key={record.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">{session?.title}</p>
                                        <p className="text-xs text-gray-600">{record.date}</p>
                                      </div>
                                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        record.status === 'present' ? 'bg-green-100 text-green-700' :
                                        record.status === 'late' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                      }`}>
                                        {record.status}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Payment History */}
                            <div>
                              <h6 className="text-sm font-medium text-gray-700 mb-3">Payment History</h6>
                              <div className="space-y-2">
                                {mockPayments.filter(payment => payment.studentId === student.id).map((payment) => (
                                  <div key={payment.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">₹{payment.amount}</p>
                                      <p className="text-xs text-gray-600">{payment.date} • {payment.method}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                      payment.status === 'completed' ? 'bg-green-100 text-green-700' :
                                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-red-100 text-red-700'
                                    }`}>
                                      {payment.status}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Payment Management</h3>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Payment Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Completed Payments</p>
                        <p className="text-2xl font-bold text-green-700">
                          ₹{mockPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                        </p>
                      </div>
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-yellow-600 font-medium">Pending Payments</p>
                        <p className="text-2xl font-bold text-yellow-700">
                          ₹{mockPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                        </p>
                      </div>
                      <AlertCircle className="w-8 h-8 text-yellow-500" />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Total Transactions</p>
                        <p className="text-2xl font-bold text-blue-700">{mockPayments.length}</p>
                      </div>
                      <CreditCard className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                </div>

                {/* Payment Details Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900">Payment Details</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockPayments.map((payment) => (
                          <tr key={payment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                  {payment.studentName.charAt(0)}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{payment.studentName}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.courseType}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{payment.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{payment.method}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-gray-600 hover:text-gray-900">
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Analytics & Reports</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Revenue Analytics */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">This Month</span>
                        <span className="font-semibold text-green-600">₹{totalRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pending Collections</span>
                        <span className="font-semibold text-orange-600">
                          ₹{pendingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Average per Student</span>
                        <span className="font-semibold text-blue-600">
                          ₹{Math.round(totalRevenue / activeStudents).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Student Analytics */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Student Analytics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Enrolled</span>
                        <span className="font-semibold text-blue-600">{totalStudents}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Active Students</span>
                        <span className="font-semibold text-green-600">{activeStudents}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Retention Rate</span>
                        <span className="font-semibold text-purple-600">
                          {Math.round((activeStudents / totalStudents) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Course Performance */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Course Performance</h4>
                    <div className="space-y-3">
                      {['English & Tamil Combined', 'English Speaking', 'Tamil & Grammar', 'Tamil Speaking'].map((course) => {
                        const enrolled = mockStudents.filter(s => s.enrolledCourses.includes(course)).length;
                        const percentage = Math.round((enrolled / totalStudents) * 100);
                        return (
                          <div key={course}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-600">{course}</span>
                              <span className="text-sm font-medium text-gray-900">{enrolled} students</span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tutor Performance */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Tutor Performance</h4>
                    <div className="space-y-4">
                      {mockTutors.map((tutor) => {
                        const tutorSessions = mockSessions.filter(s => s.tutorId === tutor.id);
                        const completedSessions = tutorSessions.filter(s => s.status === 'completed').length;
                        return (
                          <div key={tutor.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {tutor.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{tutor.name}</p>
                                <p className="text-xs text-gray-600">{tutor.experience} years experience</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">{completedSessions} sessions</p>
                              <p className="text-xs text-gray-600">{tutorSessions.length} total</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;