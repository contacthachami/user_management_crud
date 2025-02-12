import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as FormData[];
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      toast.success('Login successful!');
      localStorage.setItem('isAuthenticated', 'true');
      onLoginSuccess();
    } else {
      toast.error('Invalid email or password!');
    }
  };

  const handleCreateAccount = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as FormData[];
    const userExists = users.some((u) => u.email === formData.email);

    if (userExists) {
      toast.error('Account already exists with this email!');
    } else if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long!');
    } else {
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      toast.success('Account created successfully!');
      setIsSignIn(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignIn ? 'Sign In' : 'Create Account'}
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={isSignIn ? handleSignIn : handleCreateAccount}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
        >
          {isSignIn ? 'Sign In' : 'Create Account'}
        </button>

        <p className="mt-4 text-center text-sm">
          {isSignIn ? (
            <>
              Don't have an account?{' '}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsSignIn(false)}
              >
                Create one
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsSignIn(true)}
              >
                Sign In
              </span>
            </>
          )}
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
