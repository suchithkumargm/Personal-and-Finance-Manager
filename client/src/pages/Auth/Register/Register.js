import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import loginImage from '../../../assets/images/loginAI.png';
import Container from '../../../components/Container/Container';
import Dialog from "../../../components/Dialog/Dialog.js";
import { DialogContext } from '../../../contexts/DialogContext.js';

const Register = () => {
    const { isDialogOpen, dialogs, openDialog, closeDialog } = useContext(DialogContext);
    const navigate = useNavigate();
    const [registerFormInput, setRegisterFormInput] = useState({
        name: '',
        email: '',
        userName: '',
        password: '',
        profilePhoto: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isImageValid, setIsImageValid] = useState(true);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePhoto' && files && files[0]) {
            const file = files[0];
            if (file.size > 100 * 1024) { // 100KB
                setErrorMessage('File size should be less than 100KB');
                setIsImageValid(false);
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setRegisterFormInput((prev) => ({
                    ...prev,
                    profilePhoto: reader.result
                }));
                setErrorMessage(''); // Clear error message if file size is valid
                setIsImageValid(true);
            };
            reader.readAsDataURL(file);
        } else {
            setRegisterFormInput((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleClearImage = () => {
        setRegisterFormInput((prev) => ({
            ...prev,
            profilePhoto: ''
        }));
        setErrorMessage('');
        setIsImageValid(true);
        document.getElementById('profilePhoto').value = ''; // Clear the file input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: registerFormInput.name,
            email: registerFormInput.email,
            userName: registerFormInput.userName,
            password: registerFormInput.password,
            profilePhoto: registerFormInput.profilePhoto
        };

        try {
            const response = await fetch('http://localhost:5000/auth/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                openDialog('registerDialog', () => navigate("/auth/user/login"));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Dialog isOpen={isDialogOpen && dialogs.registerDialog} onClose={() => closeDialog('registerDialog')}>
                <h2>Registration Successful!</h2>
                <p>Please verify your account. We have sent an email to your registered email ID.</p>
                <button type="button" className='btn dialog-btn' onClick={() => closeDialog('registerDialog')}>Got It</button>
            </Dialog>
            <Container innerClass='register-inner-container'
                left={
                    <img src={loginImage} alt='register' />
                }
                right={
                    <div className="form-container">
                        <h3>Register your Account</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex-center">
                                <input placeholder="Name" type="text" id="name" name="name" required onChange={handleChange} />
                            </div>
                            <div className="d-flex-center">
                                <input placeholder="Email" type="email" id="email" name="email" required onChange={handleChange} />
                            </div>
                            <div className="d-flex-center">
                                <input placeholder="User Name" type="text" id="userName" name="userName" required onChange={handleChange} />
                            </div>
                            <div className="d-flex-center">
                                <input placeholder="Password" type="password" id="password" name="password" required onChange={handleChange} />
                            </div>
                            <div className="d-flex-center photo-upload">
                                <input label="image" type="file" id="profilePhoto" name="profilePhoto" accept='.jpeg, .png, .jpg' onChange={handleChange} />
                                <button type="button" className="clear-file" onClick={handleClearImage}>X</button>
                            </div>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            <button type="submit" disabled={!isImageValid} className={`btn register ${!isImageValid && 'disable-button'}`}>Next</button>
                        </form>
                    </div>
                }
            />
        </>
    );
};

export default Register;
