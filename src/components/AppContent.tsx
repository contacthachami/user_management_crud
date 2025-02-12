import { useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import SearchFilter from "./SearchFilter";
import Login from "./Login";
import useSessionTimeout from "../hooks/useSessionTimeout";

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  useSessionTimeout();

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              User Management System
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Logout
            </button>
          </div>
          <UserForm />
          <SearchFilter />
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default AppContent;