import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, LogOut, Calendar, BookOpen, CheckCircle2, 
  Clock, Users, TrendingUp, Award, Plus, Edit, Eye
} from 'lucide-react';
import { mockSessions, mockAttendance, mockSyllabus, mockStudents } from '../data/mockData';

const TutorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'attendance' | 'syllabus'>('overview');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter data for current tutor
  const tutorId = user?.id || '2';
  const tutorSessions = mockSessions.filter(session => session.tutorId === tutorId);
  const upcomingSessions = tutorSessions.filter(session => session.status === 'scheduled');
  const completedSessions = tutorSessions.filter(session => session.status === 'completed');
  
  // Get enrolled students across all sessions
  const enrolledStudentIds = [...new Set(tutorSessions.flatMap(session => session.enrolledStudents))];
  const enrolledStudents = mockStudents.filter(student => enrolledStudentIds.includes(student.id));

  // Calculate stats
  const totalStudents = enrolledStudents.length;
  const completedTopics = mockSyllabus.filter(item => item.completed).length;
  const totalTopics = mockSyllabus.length;
  const syllabusProgress = Math.round((completedTopics / totalTopics) * 100);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'sessions', name: 'Sessions', icon: Calendar },
    { id: 'attendance', name: 'Attendance', icon: CheckCircle2 },
    { id: 'syllabus', name: 'Syllabus', icon: BookOpen }
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
                <p className="text-sm text-gray-600">Tutor Dashboard</p>
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
            Welcome, {user?.name?.split(' ')[0]}! 👨‍🏫
          </h2>
          <p className="text-gray-600">Manage your classes and track student progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{upcomingSessions.length}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Upcoming Sessions</h3>
            <p className="text-gray-600 text-sm">This week</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{totalStudents}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Students</h3>
            <p className="text-gray-600 text-sm">Across all courses</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{syllabusProgress}%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Syllabus Progress</h3>
            <p className="text-gray-600 text-sm">{completedTopics} of {totalTopics} covered</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">{completedSessions.length}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Sessions Completed</h3>
            <p className="text-gray-600 text-sm">This month</p>
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
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Today's Sessions</h3>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>New Session</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {upcomingSessions.slice(0, 3).map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{session.title}</h4>
                            <p className="text-sm text-gray-600">{session.time} • {session.enrolledStudents.length} students</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Students</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enrolledStudents.slice(0, 6).map((student) => (
                      <div key={student.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{student.name}</h4>
                            <p className="text-sm text-gray-600">{student.enrolledCourses[0]}</p>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            student.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                            student.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {student.paymentStatus}
                          </span>
                          <span className="text-gray-500">Joined {student.joinDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Manage Sessions</h3>
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Schedule New Session</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Upcoming Sessions */}
                  <div>
                    <h4 className="text-lg font-medium text-blue-700 mb-4">📅 Upcoming Sessions</h4>
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="p-6 border border-blue-200 rounded-lg bg-blue-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h5>
                              <p className="text-gray-600 mb-3">{session.subject}</p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span>{session.date}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span>{session.time}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Users className="w-4 h-4 text-gray-400" />
                                  <span>{session.enrolledStudents.length}/{session.maxStudents} students</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <BookOpen className="w-4 h-4 text-gray-400" />
                                  <span>{session.duration} min</span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
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
                            
                            <div className="flex items-center space-x-2 ml-4">
                              <button 
                                onClick={() => setSelectedSession(selectedSession === session.id ? null : session.id)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Enrolled Students */}
                          {selectedSession === session.id && (
                            <div className="mt-4 pt-4 border-t border-blue-200">
                              <h6 className="font-medium text-gray-900 mb-3">Enrolled Students:</h6>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {session.enrolledStudents.map((studentId) => {
                                  const student = mockStudents.find(s => s.id === studentId);
                                  return student ? (
                                    <div key={studentId} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                        {student.name.charAt(0)}
                                      </div>
                                      <span className="text-sm text-gray-900">{student.name}</span>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Completed Sessions */}
                  <div>
                    <h4 className="text-lg font-medium text-green-700 mb-4">✅ Completed Sessions</h4>
                    <div className="space-y-4">
                      {completedSessions.map((session) => (
                        <div key={session.id} className="p-4 border border-green-200 rounded-lg bg-green-50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">{session.title}</h5>
                              <p className="text-sm text-gray-600">{session.date} • {session.enrolledStudents.length} students attended</p>
                            </div>
                            <span className="text-sm text-green-600 font-medium">Completed</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Attendance Management</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 font-medium">Present Today</p>
                          <p className="text-2xl font-bold text-green-700">
                            {mockAttendance.filter(att => att.status === 'present').length}
                          </p>
                        </div>
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-yellow-600 font-medium">Late Today</p>
                          <p className="text-2xl font-bold text-yellow-700">
                            {mockAttendance.filter(att => att.status === 'late').length}
                          </p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-500" />
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-red-600 font-medium">Absent Today</p>
                          <p className="text-2xl font-bold text-red-700">
                            {mockAttendance.filter(att => att.status === 'absent').length}
                          </p>
                        </div>
                        <Users className="w-8 h-8 text-red-500" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Attendance Records</h4>
                    <div className="space-y-3">
                      {mockAttendance.map((record) => {
                        const session = mockSessions.find(s => s.id === record.sessionId);
                        return (
                          <div key={record.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className={`w-3 h-3 rounded-full ${
                                record.status === 'present' ? 'bg-green-500' : 
                                record.status === 'late' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></div>
                              <div>
                                <h5 className="font-medium text-gray-900">{record.studentName}</h5>
                                <p className="text-sm text-gray-600">{session?.title} • {record.date}</p>
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
                  </div>
                </div>
              </div>
            )}

            {/* Syllabus Tab */}
            {activeTab === 'syllabus' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Syllabus Coverage</h3>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm text-gray-600">{completedTopics} of {totalTopics} topics covered</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${syllabusProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-sm font-medium text-blue-600">{syllabusProgress}%</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Completed Topics */}
                  <div>
                    <h4 className="text-lg font-medium text-green-700 mb-4">✅ Covered Topics</h4>
                    <div className="space-y-3">
                      {mockSyllabus.filter(item => item.completed).map((item) => (
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
                                  <span className="text-xs text-green-600">Covered: {item.completedDate}</span>
                                )}
                              </div>
                            </div>
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pending Topics */}
                  <div>
                    <h4 className="text-lg font-medium text-blue-700 mb-4">📚 Upcoming Topics</h4>
                    <div className="space-y-3">
                      {mockSyllabus.filter(item => !item.completed).map((item) => (
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
                            <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                              Mark Complete
                            </button>
                          </div>
                        </div>
                      ))}
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

export default TutorDashboard;