import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import loginImage from '../../../assets/images/loginAI.png';
import Container from '../../../components/Container/Container.js';
import PinInput from '../../../components/OTP PIN/PinInput.js';

import { AuthContext } from '../../../contexts/AuthContext.js';

import './EnterPin.css';

const EnterPin = () => {

    const navigate = useNavigate();

    const { isLoginPinSet, setIsLoginPinSet } = useContext(AuthContext);
    const [isReEnteringPin, setIsReEnteringPin] = useState(false);
    const [tempPIN, setTempPIN] = useState("");

    // useEffect(async () => {
    //     // Any side effect related to `isLoginPinSet` or `isReEnteringPin` can be handled here
    // }, [isLoginPinSet, isReEnteringPin]);

    const onPinSubmit = async (pin) => {
        if (!isLoginPinSet && !isReEnteringPin) {
            setTempPIN(pin);
            console.log(tempPIN);
            setIsReEnteringPin(true);
        } else if (!isLoginPinSet && isReEnteringPin) {
            if (tempPIN === pin) {
                try {
                    const response = await fetch('http://localhost:5000/auth/user/set-pin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authToken': localStorage.getItem('authToken')
                        },
                        body: JSON.stringify({ pin }),
                    });

                    if (response.ok) {
                        const result = await response.json();
                        navigate('/auth/user/pin')
                    } else {
                        alert("Re-Enter PIN doesn't match");

                    }

                } catch (error) {
                    console.error('Error:', error);
                }
                setIsLoginPinSet(true);
            } else {
                alert('Re-entered PIN does not match');
            }
        } else {
            try {
                const response = await fetch('http://localhost:5000/auth/user/check-pin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': localStorage.getItem('authToken')
                    },
                    body: JSON.stringify({ PIN: pin }),
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        navigate("/")
                    } else {
                        alert("wrong pin")
                    }
                } else {
                    console.log(response.json())

                }

            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const headingContent = isLoginPinSet ? 'Enter your 4 digit PIN' : (isReEnteringPin ? 'Re-Enter 4 digit PIN' : 'Set your 4 digit PIN');

    return (
        <Container innerClass='pin-inner-container'
            left={
                <img src={loginImage} alt='pin' />
            }
            right={
                <div className="pin-form-container">
                    <h3 className='pin-h3'>{headingContent}</h3>
                    <PinInput onPinSubmit={onPinSubmit} />
                </div>
            }
        />
    );
}

export default EnterPin;
