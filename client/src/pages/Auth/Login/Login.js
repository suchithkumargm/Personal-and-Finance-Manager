import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

import './Login.css';

import loginImage from '../../../assets/images/loginAI.png';
import Container from '../../../components/Container/Container.js';
import Dialog from '../../../components/Dialog/Dialog.js';

const Login = () => {

    const [isAccountVerified, setIsAccountVerified] = useState(true);
    const fetchAccountVerification = async () => {

    }
    useEffect({

    }, [isAccountVerified])

    const navigate = useNavigate();

    const [userLoginInput, setUserLoginInput] = useState({
        userName: '',
        password: ''
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserLoginInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const accountVerified = await fetchAccountVerification();
        if (accountVerified) {

            try {
                const response = await fetch('http://localhost:5000/auth/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userLoginInput),
                });

                if (response.ok) {
                    const result = await response.json();
                    localStorage.setItem('authToken', result.authToken);
                    navigate("/");
                } else {
                    alert("Invalid Credentials!");
                }

            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            setIsAccountVerified(false);
        }
    };

    return (
        <>
            <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
                <h2>Account Verification Pending !</h2>
                <p>Please verify your Account. We have sent an email to your registered email id.</p>
                <button type="button" className='btn dialog-btn' onClick={closeDialog}>Got It</button>
            </Dialog>
            <Container innerClass='login-inner-container'
                left={
                    <img src={loginImage} alt='login' />
                }
                right={
                    <div className="form-container">
                        <h3>Welcome Back</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex-center">
                                <input
                                    placeholder="User Name"
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    value={userLoginInput.userName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="d-flex-center">
                                <input
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={userLoginInput.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <Link to="/">Forgot password?</Link>
                            <button className="btn login" type="submit">Next</button>
                        </form>
                    </div>
                }
            />
        </>
    );
};

export default Login;
