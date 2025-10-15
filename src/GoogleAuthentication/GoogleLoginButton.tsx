import React from "react";

const LoginButton = () => {
  const handleGoogleLogin = () => {
    // Redirect to Spring Boot OAuth2 login URL
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <button onClick={handleGoogleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
      Login with Google
    </button>
  );
};

export default LoginButton;
