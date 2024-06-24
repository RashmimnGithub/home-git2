import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate(); // Create history object
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        try {
            await axios.post('http://localhost:5000/login', { email, password });
            alert('Login successful');
            navigate('/home');
        } catch (error) {
            alert('Invalid email or password');
        }
    };

    return (
        <div>
            <header className="header">
                <h1>Welcome to netcon CMP</h1>
            </header>
            <div className='container'>
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="input-box">
                            <input type="text" name="email" placeholder='email' onChange={handleChange} required />
                            <FaUser className='icon'/>
                        </div>
                        <div className="input-box">
                            <input type="password" name="password" placeholder='Password' onChange={handleChange} required />
                            <FaLock className='icon'/>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox"/>Remember me</label>
                            <a href='/forgot'>Forgot password?</a>
                        </div>
                        <button type="submit">Login</button>
                        <div className="register-link">
                            <p>Don't have an account? <a href='/register'>Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
