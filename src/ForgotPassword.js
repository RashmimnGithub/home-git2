import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate(); // Create history object
    const [formData, setFormData] = useState({ username: '', newPassword: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, newPassword } = formData;
        try {
            await axios.post('http://localhost:5000/forgot', { username, newPassword });
            alert('Password updated');
            navigate('/login')
        } catch (error) {
            alert('User not found');
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
                        <h2>Forgot Password</h2>
                        <div className="input-box">
                            <input type="text" name="username" placeholder='Username' onChange={handleChange} required />
                            <FaUser className='icon'/>
                        </div>
                        <div className="input-box">
                            <input type="password" name="newPassword" placeholder='NewPassword' onChange={handleChange} required />
                            <FaLock className='icon'/>
                        </div>
                        <button type='submit'>Update Password</button>
                        <div className="register-link">
                            <p>Don't have an account? <a href='/register'>Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
