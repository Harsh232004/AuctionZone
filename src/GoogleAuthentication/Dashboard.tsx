import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

type User = {
  username: string;
  email: string;
  id: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1️⃣ Get JWT from query params
    const params = new URLSearchParams(location.search);
    let token = params.get("token");

    // 2️⃣ If token exists in query params, save it to localStorage
    if (token) {
      localStorage.setItem("accessToken", token);
      // Remove token from URL
      navigate("/oauth/success", { replace: true });
    } else {
      // If no token in URL, check localStorage
      token = localStorage.getItem("accessToken");
    }

    if (!token) {
      // Redirect to login if no token
      navigate("/");
      return;
    }

    // 3️⃣ Fetch user info from backend
    axios
      .get("http://localhost:8080/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data as { user: User };
        setUser(data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // Token invalid → redirect to login
        localStorage.removeItem("accessToken");
        navigate("/");
        setLoading(false);
      });
  }, [location.search, navigate]);

  if (loading) return <div>Loading dashboard...</div>;

  if (!user) return <div>No user info available.</div>;

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h1>Welcome, {user.username}!</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user.id}</p>
    </div>
  );
};

export default Dashboard;
