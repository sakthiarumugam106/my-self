export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'tutor' | 'admin';
  phone?: string;
  joinDate: string;
}

export interface Student extends User {
  role: 'student';
  enrolledCourses: string[];
  paymentStatus: 'paid' | 'pending' | 'overdue';
  totalPaid: number;
}

export interface Tutor extends User {
  role: 'tutor';
  subjects: string[];
  experience: number;
}

export interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number; // in minutes
  tutorId: string;
  tutorName: string;
  subject: string;
  type: 'English' | 'Tamil' | 'Grammar' | 'Speaking';
  maxStudents: number;
  enrolledStudents: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Attendance {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late';
  date: string;
}

export interface SyllabusItem {
  id: string;
  title: string;
  description: string;
  type: 'English' | 'Tamil' | 'Grammar' | 'Speaking';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  completedDate?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  date: string;
  method: 'cash' | 'card' | 'online' | 'upi';
  status: 'completed' | 'pending' | 'failed';
  courseType: string;
}