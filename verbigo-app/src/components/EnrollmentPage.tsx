import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, BookOpen, CreditCard, Users, MessageCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  level: string;
  preferredLanguage: string;
  paymentMethod: string;
}

const EnrollmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    course: '',
    level: 'Beginner',
    preferredLanguage: 'English',
    paymentMethod: 'upi'
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const courses = [
    { id: 'english-basic', name: 'Basic English Communication', price: 1500, duration: '2 months' },
    { id: 'tamil-basic', name: 'Tamil Language Fundamentals', price: 1200, duration: '2 months' },
    { id: 'english-advanced', name: 'Advanced English & Grammar', price: 2000, duration: '3 months' },
    { id: 'combined', name: 'English & Tamil Combined', price: 2500, duration: '4 months' },
    { id: 'speaking-only', name: 'Speaking Skills (English/Tamil)', price: 1800, duration: '2 months' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.course) newErrors.course = 'Please select a course';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would create a new student account
    alert('Enrollment successful! Please check your email for login credentials.');
    navigate('/login');
    
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const selectedCourse = courses.find(c => c.id === formData.course);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edico</h1>
                <p className="text-sm text-gray-600">English & Tamil Communication Hub</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-white">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Start Your Language Journey</h2>
              <p className="text-xl text-blue-100 mb-6">
                Master English and Tamil with expert guidance and personalized learning
              </p>
              <div className="flex justify-center space-x-8 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Expert Tutors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Structured Curriculum</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Interactive Sessions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment Form */}
          <div className="px-8 py-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+91 9876543210"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Language for Instructions
                    </label>
                    <select
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Both">Both English & Tamil</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Select Your Course</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <div key={course.id} className="relative">
                      <input
                        type="radio"
                        name="course"
                        value={course.id}
                        onChange={handleInputChange}
                        className="sr-only"
                        id={course.id}
                      />
                      <label
                        htmlFor={course.id}
                        className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.course === course.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-lg font-semibold text-gray-900 mb-2">{course.name}</div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">₹{course.price}</div>
                        <div className="text-sm text-gray-600">{course.duration}</div>
                      </label>
                    </div>
                  ))}
                </div>
                {errors.course && <p className="text-red-500 text-sm mt-2">{errors.course}</p>}
              </div>

              {/* Level Selection */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Your Current Level</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <div key={level} className="relative">
                      <input
                        type="radio"
                        name="level"
                        value={level}
                        onChange={handleInputChange}
                        className="sr-only"
                        id={level}
                        checked={formData.level === level}
                      />
                      <label
                        htmlFor={level}
                        className={`block p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                          formData.level === level
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">{level}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { id: 'upi', name: 'UPI Payment', icon: CreditCard },
                    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                    { id: 'online', name: 'Net Banking', icon: CreditCard },
                    { id: 'cash', name: 'Cash/Offline', icon: CreditCard }
                  ].map((method) => (
                    <div key={method.id} className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        onChange={handleInputChange}
                        className="sr-only"
                        id={method.id}
                        checked={formData.paymentMethod === method.id}
                      />
                      <label
                        htmlFor={method.id}
                        className={`block p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                          formData.paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <method.icon className="w-6 h-6 mx-auto mb-2" />
                        <div className="text-sm font-medium">{method.name}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Summary */}
              {selectedCourse && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selected Course:</span>
                      <span className="font-medium">{selectedCourse.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{selectedCourse.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-medium">{formData.level}</span>
                    </div>
                    <div className="border-t pt-2 mt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount:</span>
                        <span className="text-blue-600">₹{selectedCourse.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Complete Enrollment'}
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  By enrolling, you agree to our terms of service and privacy policy.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnrollmentPage;