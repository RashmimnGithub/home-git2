import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock, FaPhone, FaEyeSlash } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, phone, username, password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    
        try {
            await axios.post('http://localhost:5000/register', { email, phone, username, password, confirmPassword });
            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error registering user:', error.response.data);
                alert('Registration failed: ' + error.response.data.message || error.response.data);
            } else {
                console.error('Error registering user:', error.message);
                alert('Registration failed: ' + error.message);
            }
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
                        <h2>SignUp</h2>
                        <div className="input-box">
                            <input type="text" name="username" placeholder='Username' onChange={handleChange} required />
                            <FaUser className='icon'/>
                        </div>
                        <div className="input-box">
                            <input type="text" name="email" placeholder='Email-id' onChange={handleChange} required />
                            <MdMail className='icon'/>
                        </div>
                        <div className="input-box">
                            <input type="text" name="phone" placeholder='Phone-no' onChange={handleChange} required />
                            <FaPhone className='icon'/>
                        </div>
                        <div className="input-box">
                            <input type="password" name="password" placeholder='Password' onChange={handleChange} required />
                            <FaLock className='icon'/>
                        </div>
                        <div className="input-box">
                            <input type="password" name="confirmPassword" placeholder='Confirm-Password' onChange={handleChange} required />
                            <FaEyeSlash className='icon'/>
                        </div>
                        <button type="submit">SignUp</button>
                        <div className="register-link">
                            <p>Already have an account <a href='/login'>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
