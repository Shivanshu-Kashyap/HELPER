import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckAuth({ children, protected: protectedRoute }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (protectedRoute && !token) {
      // Protected route but no token - redirect to login
      navigate("/login");
    } else if (!protectedRoute && token) {
      // Public route but user is logged in - redirect to home
      navigate("/");
    }
    
    // Always end loading phase
    setLoading(false);
  }, [navigate, protectedRoute]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return children;
}