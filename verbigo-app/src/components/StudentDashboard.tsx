import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, LogOut, Calendar, BookOpen, CheckCircle2, 
  Clock, User, Phone, Mail, TrendingUp, Award
} from 'lucide-react';
import { mockSessions, mockAttendance, mockSyllabus } from '../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'syllabus' | 'sessions'>('overview');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter data for current student
  const studentId = user?.id || '1';
  const upcomingSessions = mockSessions.filter(session => 
    session.enrolledStudents.includes(studentId) && session.status === 'scheduled'
  );
  const studentAttendance = mockAttendance.filter(att => att.studentId === studentId);
  const completedSyllabus = mockSyllabus.filter(item => item.completed);
  const pendingSyllabus = mockSyllabus.filter(item => !item.completed);

  // Calculate progress
  const totalSyllabus = mockSyllabus.length;
  const completedCount = completedSyllabus.length;
  const progressPercentage = Math.round((completedCount / totalSyllabus) * 100);

  const attendanceRate = studentAttendance.length > 0 ? 
    Math.round((studentAttendance.filter(att => att.status === 'present').length / studentAttendance.length) * 100) : 0;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'attendance', name: 'Attendance', icon: CheckCircle2 },
    { id: 'syllabus', name: 'Syllabus', icon: BookOpen },
    { id: 'sessions', name: 'Sessions', icon: Calendar }
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
                <p className="text-sm text-gray-600">Student Dashboard</p>
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
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600">Track your learning progress and upcoming sessions</p>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{progressPercentage}%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Course Progress</h3>
            <p className="text-gray-600 text-sm">{completedCount} of {totalSyllabus} topics completed</p>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{attendanceRate}%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Attendance Rate</h3>
            <p className="text-gray-600 text-sm">{studentAttendance.length} sessions attended</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{upcomingSessions.length}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Upcoming Sessions</h3>
            <p className="text-gray-600 text-sm">This week</p>
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
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {completedSyllabus.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600">Completed on {item.completedDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Sessions</h3>
                  <div className="space-y-4">
                    {upcomingSessions.slice(0, 2).map((session) => (
                      <div key={session.id} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{session.title}</h4>
                          <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Attendance History</h3>
                {studentAttendance.length > 0 ? (
                  <div className="space-y-4">
                    {studentAttendance.map((record) => {
                      const session = mockSessions.find(s => s.id === record.sessionId);
                      return (
                        <div key={record.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              record.status === 'present' ? 'bg-green-500' : 
                              record.status === 'late' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <div>
                              <h4 className="font-medium text-gray-900">{session?.title}</h4>
                              <p className="text-sm text-gray-600">{record.date}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            record.status === 'present' ? 'bg-green-100 text-green-800' :
                            record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No attendance records yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Syllabus Tab */}
            {activeTab === 'syllabus' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Course Syllabus</h3>
                <div className="space-y-6">
                  {/* Completed Topics */}
                  {completedSyllabus.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-green-700 mb-4">✅ Completed Topics</h4>
                      <div className="space-y-3">
                        {completedSyllabus.map((item) => (
                          <div key={item.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{item.title}</h5>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    item.type === 'English' ? 'bg-blue-100 text-blue-700' :
                                    item.type === 'Tamil' ? 'bg-purple-100 text-purple-700' :
                                    item.type === 'Grammar' ? 'bg-green-100 text-green-700' :
                                    'bg-orange-100 text-orange-700'
                                  }`}>
                                    {item.type}
                                  </span>
                                  <span className="text-xs text-gray-500">{item.level}</span>
                                  {item.completedDate && (
                                    <span className="text-xs text-green-600">Completed: {item.completedDate}</span>
                                  )}
                                </div>
                              </div>
                              <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pending Topics */}
                  {pendingSyllabus.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-blue-700 mb-4">📚 Upcoming Topics</h4>
                      <div className="space-y-3">
                        {pendingSyllabus.map((item) => (
                          <div key={item.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{item.title}</h5>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    item.type === 'English' ? 'bg-blue-100 text-blue-700' :
                                    item.type === 'Tamil' ? 'bg-purple-100 text-purple-700' :
                                    item.type === 'Grammar' ? 'bg-green-100 text-green-700' :
                                    'bg-orange-100 text-orange-700'
                                  }`}>
                                    {item.type}
                                  </span>
                                  <span className="text-xs text-gray-500">{item.level}</span>
                                </div>
                              </div>
                              <Clock className="w-6 h-6 text-blue-500 mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Sessions</h3>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h4>
                            <p className="text-gray-600 mb-3">{session.subject}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>{session.date}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>{session.time}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <span>{session.tutorName}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <BookOpen className="w-4 h-4 text-gray-400" />
                                <span>{session.duration} min</span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            session.type === 'English' ? 'bg-blue-100 text-blue-700' :
                            session.type === 'Tamil' ? 'bg-purple-100 text-purple-700' :
                            session.type === 'Grammar' ? 'bg-green-100 text-green-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {session.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming sessions scheduled</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;