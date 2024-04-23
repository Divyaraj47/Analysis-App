// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    props.logout();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3080/api/login",
                {
                    username,
                    password,
                }
            );
            // Upon successful login, redirect to the dashboard
            console.log("Login successful:", response.data);
            props.login();
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Enter Correct Credentials")
        }
    };

    return (
        <div className="flex--center">
            <div className="login--form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="username margin">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="password margin">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="submit--button">
                        <button type="submit" className="btn margin">
                            Login
                        </button>
                    </div>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
