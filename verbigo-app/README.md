# Edico - English & Tamil Communication Hub

A modern web application for managing English and Tamil language learning courses with separate dashboards for students, tutors, and administrators.

## Features

### 🎓 Student Portal
- **Enrollment System**: Complete registration with course selection and payment processing
- **Learning Dashboard**: Track course progress, attendance, and upcoming sessions
- **Syllabus Tracking**: View completed and upcoming topics with progress indicators
- **Session Management**: See scheduled classes with tutor details and timing

### 👨‍🏫 Tutor Portal
- **Class Management**: Schedule and manage teaching sessions
- **Student Tracking**: Monitor student attendance and progress
- **Syllabus Coverage**: Track covered topics and plan upcoming lessons
- **Session Analytics**: View completed and upcoming sessions with student counts

### 🎯 Admin Panel
- **Student Management**: Complete student database with search and filtering
- **Payment Tracking**: Monitor all transactions, pending payments, and revenue
- **Analytics Dashboard**: Revenue insights, student analytics, and course performance
- **Comprehensive Reports**: Detailed attendance and payment reports

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS for modern UI design
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API for authentication
- **Build Tool**: Create React App

## Demo Credentials

The application comes with pre-configured demo accounts:

| Role | Email | Password |
|------|--------|----------|
| Student | student@edico.com | password123 |
| Tutor | tutor@edico.com | password123 |
| Admin | admin@edico.com | password123 |

## Getting Started

### Prerequisites
- Node.js 14+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd verbigo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Usage Guide

### For New Users
1. Visit the homepage to see the enrollment form
2. Fill out personal information and select your preferred course
3. Choose payment method and complete enrollment
4. Check email for login credentials (simulated in demo)

### For Existing Users
1. Click "Login" on any page
2. Select your role (Student/Tutor/Admin)
3. Use demo credentials or your actual login details
4. Access your role-specific dashboard

## Course Offerings

- **Basic English Communication** (₹1,500 - 2 months)
- **Tamil Language Fundamentals** (₹1,200 - 2 months)
- **Advanced English & Grammar** (₹2,000 - 3 months)
- **English & Tamil Combined** (₹2,500 - 4 months)
- **Speaking Skills (English/Tamil)** (₹1,800 - 2 months)

## Application Structure

```
src/
├── components/           # React components
│   ├── EnrollmentPage.tsx
│   ├── LoginPage.tsx
│   ├── StudentDashboard.tsx
│   ├── TutorDashboard.tsx
│   └── AdminDashboard.tsx
├── context/             # React Context providers
│   └── AuthContext.tsx
├── data/                # Mock data
│   └── mockData.ts
├── types/               # TypeScript type definitions
│   └── index.ts
└── App.tsx              # Main application component
```

## Key Features by Role

### Student Dashboard
- **Overview**: Recent achievements and upcoming sessions
- **Attendance**: Historical attendance records with session details
- **Syllabus**: Progress tracking with completed and pending topics
- **Sessions**: Detailed view of scheduled classes

### Tutor Dashboard
- **Overview**: Today's sessions and recent students
- **Sessions**: Manage upcoming and completed classes
- **Attendance**: Track student presence across all sessions
- **Syllabus**: Mark topics as completed and plan lessons

### Admin Dashboard
- **Overview**: Quick actions and recent activity
- **Students**: Comprehensive student management with search
- **Payments**: Transaction tracking and revenue analytics
- **Analytics**: Performance metrics and reporting

## Data Models

The application uses TypeScript interfaces for type safety:

- **User**: Base user information with role-based extensions
- **Student**: Enrollment details and payment status
- **Tutor**: Subject expertise and experience
- **Session**: Class scheduling and enrollment
- **Attendance**: Student presence tracking
- **Payment**: Transaction records and status

## Security Features

- **Role-based Access Control**: Users can only access appropriate dashboards
- **Route Protection**: Automatic redirection based on authentication status
- **Session Management**: Persistent login with localStorage
- **Input Validation**: Form validation for all user inputs

## Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## Future Enhancements

- Real-time notifications for session updates
- Video conferencing integration for online classes
- Advanced reporting with data export
- Multi-language support beyond English and Tamil
- Mobile application development
- Payment gateway integration
- Email automation system

## Support

For technical support or questions about the application:
- Email: support@verbigo.com
- Phone: +91 9876543210

## License

This project is proprietary and confidential. All rights reserved.

---

Built with ❤️ for English and Tamil language learners.
