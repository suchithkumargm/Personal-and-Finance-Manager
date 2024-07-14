import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

import './Login.css';

import loginImage from '../../../assets/images/loginAI.png';
import Container from '../../../components/Container/Container.js';
import Dialog from "../../../components/Dialog/Dialog.js";

import { DialogContext } from '../../../contexts/DialogContext.js';
import { AuthContext } from '../../../contexts/AuthContext.js';

const Login = () => {

    const { dialogs, openDialog, closeDialog } = useContext(DialogContext);

    const { isAccountVerified, setIsAccountVerified, checkAccountVerification, checkLoginPinSetStatus } = useContext(AuthContext);

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
        await checkAccountVerification(userLoginInput.userName);


        try {
            const response = await fetch('http://localhost:5000/auth/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userLoginInput),
            });

            if (response.ok) {
                if (isAccountVerified) {
                    const result = await response.json();
                    localStorage.setItem('authToken', result.authToken);
                    console.log('hi baby')
                    await checkLoginPinSetStatus();
                    navigate('/auth/user/pin')
                } else {
                    openDialog('loginDialog');
                }

            } else {
                alert("Invalid Credentials!");
            }

        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <>
            <Dialog isOpen={dialogs.loginDialog} onClose={() => closeDialog('loginDialog')}>
                <h2>Account Verification Pending !</h2>
                <p>Please verify your Account. We have sent an email to your registered email id.</p>
                <button type="button" className='btn dialog-btn' onClick={() => closeDialog('loginDialog')}>Got It</button>
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
