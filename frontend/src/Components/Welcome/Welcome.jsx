import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Welcome = ({setUser}) => {
    const [user, setWelcomeUser] = useState({
        name: '', email: '', password: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setWelcomeUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/user/login-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Save token to localStorage
            localStorage.setItem("token", data.token);
            alert("Login Successful");

            // Set user and navigate to dashboard
            setUser(user);
            navigate("/dashboard");

        } catch (error) {
            alert(error.message);
            console.error("Error during login:", error);
        }
    };
    return (
        <div className="welcomePage">
            <div className="registerDiv">
                <Link to="/register">Register</Link>
            </div>
            <div className="mainPage">
                <div className="welcomeMessage">
                    Welcome to Fake News & DeepFake Image Detetction
                </div>
                <div className="loginForm">
                    <form className="form" onSubmit={handleSubmit}>
                        <h4>Login</h4>
                        <div className="form-row">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={user.name}
                                name="name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="email">email</label>
                            <input
                                type="email"
                                id="email"
                                value={user.email}
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={user.password}
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Welcome;