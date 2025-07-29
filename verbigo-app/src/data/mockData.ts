import { Session, Attendance, SyllabusItem, Payment, Student, Tutor } from '../types';

export const mockSessions: Session[] = [
  {
    id: '1',
    title: 'English Grammar Fundamentals',
    date: '2024-01-20',
    time: '10:00 AM',
    duration: 60,
    tutorId: '2',
    tutorName: 'Priya Sharma',
    subject: 'English Grammar',
    type: 'Grammar',
    maxStudents: 15,
    enrolledStudents: ['1', '3', '4'],
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Tamil Conversation Practice',
    date: '2024-01-22',
    time: '2:00 PM',
    duration: 90,
    tutorId: '2',
    tutorName: 'Priya Sharma',
    subject: 'Tamil Speaking',
    type: 'Tamil',
    maxStudents: 10,
    enrolledStudents: ['1', '5'],
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Business English Communication',
    date: '2024-01-18',
    time: '11:00 AM',
    duration: 120,
    tutorId: '2',
    tutorName: 'Priya Sharma',
    subject: 'Business English',
    type: 'English',
    maxStudents: 12,
    enrolledStudents: ['1', '3'],
    status: 'completed'
  }
];

export const mockAttendance: Attendance[] = [
  {
    id: '1',
    sessionId: '3',
    studentId: '1',
    studentName: 'Ravi Kumar',
    status: 'present',
    date: '2024-01-18'
  },
  {
    id: '2',
    sessionId: '3',
    studentId: '3',
    studentName: 'Anita Patel',
    status: 'present',
    date: '2024-01-18'
  }
];

export const mockSyllabus: SyllabusItem[] = [
  {
    id: '1',
    title: 'Basic English Grammar',
    description: 'Parts of speech, sentence structure, and basic tenses',
    type: 'Grammar',
    level: 'Beginner',
    completed: true,
    completedDate: '2024-01-10'
  },
  {
    id: '2',
    title: 'English Conversation Skills',
    description: 'Daily conversation, greetings, and common phrases',
    type: 'Speaking',
    level: 'Beginner',
    completed: true,
    completedDate: '2024-01-15'
  },
  {
    id: '3',
    title: 'Tamil Script Reading',
    description: 'Learning to read Tamil characters and basic words',
    type: 'Tamil',
    level: 'Beginner',
    completed: false
  },
  {
    id: '4',
    title: 'Advanced English Writing',
    description: 'Essay writing, formal letters, and business communication',
    type: 'English',
    level: 'Advanced',
    completed: false
  },
  {
    id: '5',
    title: 'Tamil Grammar Basics',
    description: 'Basic Tamil grammar rules and sentence formation',
    type: 'Tamil',
    level: 'Intermediate',
    completed: false
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Ravi Kumar',
    amount: 2500,
    date: '2024-01-01',
    method: 'upi',
    status: 'completed',
    courseType: 'English & Tamil Combined'
  },
  {
    id: '2',
    studentId: '3',
    studentName: 'Anita Patel',
    amount: 1500,
    date: '2024-01-05',
    method: 'card',
    status: 'completed',
    courseType: 'English Speaking'
  },
  {
    id: '3',
    studentId: '4',
    studentName: 'Suresh Reddy',
    amount: 2000,
    date: '2024-01-15',
    method: 'online',
    status: 'pending',
    courseType: 'Tamil & Grammar'
  }
];

export const mockStudents: Student[] = [
  {
    id: '1',
    email: 'student@edico.com',
    name: 'Ravi Kumar',
    role: 'student',
    phone: '+91 9876543210',
    joinDate: '2024-01-15',
    enrolledCourses: ['English & Tamil Combined'],
    paymentStatus: 'paid',
    totalPaid: 2500
  },
  {
    id: '3',
    email: 'anita@example.com',
    name: 'Anita Patel',
    role: 'student',
    phone: '+91 9876543213',
    joinDate: '2024-01-05',
    enrolledCourses: ['English Speaking'],
    paymentStatus: 'paid',
    totalPaid: 1500
  },
  {
    id: '4',
    email: 'suresh@example.com',
    name: 'Suresh Reddy',
    role: 'student',
    phone: '+91 9876543214',
    joinDate: '2024-01-15',
    enrolledCourses: ['Tamil & Grammar'],
    paymentStatus: 'pending',
    totalPaid: 0
  },
  {
    id: '5',
    email: 'kavitha@example.com',
    name: 'Kavitha Nair',
    role: 'student',
    phone: '+91 9876543215',
    joinDate: '2024-01-12',
    enrolledCourses: ['Tamil Speaking'],
    paymentStatus: 'paid',
    totalPaid: 1800
  }
];

export const mockTutors: Tutor[] = [
  {
    id: '2',
    email: 'tutor@edico.com',
    name: 'Priya Sharma',
    role: 'tutor',
    phone: '+91 9876543211',
    joinDate: '2023-06-10',
    subjects: ['English', 'Tamil', 'Grammar', 'Speaking'],
    experience: 5
  }
];