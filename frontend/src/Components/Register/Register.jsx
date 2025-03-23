import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    lastName: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Registration failed"}`);
        return;
      }
      const data = await response.json();
      alert("User Registered Successfully");
      console.log("Registration Response:", data);
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering the user.");
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h4>Register</h4>
        <div className="form-row">
          <label htmlFor="name">First Name:</label>
          <input
            type="text"
            id="name"
            value={user.name}
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={user.lastName}
            name="lastName"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={user.email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={user.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
