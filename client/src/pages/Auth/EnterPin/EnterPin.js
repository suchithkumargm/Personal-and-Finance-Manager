import { useContext, useState } from 'react';

import loginImage from '../../../assets/images/loginAI.png';
import Container from '../../../components/Container/Container.js';
import PinInput from '../../../components/OTP PIN/PinInput.js'

import { AuthContext } from '../../../contexts/AuthContext.js';

import './EnterPin.css';

const EnterPin = () => {

    const { isLoginPinSet, setIsLoginPinSet } = useContext(AuthContext);
    const [isReEnteringPin, setIsReEnteringPin] = useState(false);
    let tempPIN = ""

    const onPinSubmit = (pin) => {
        if (!isLoginPinSet && !isReEnteringPin) {
            tempPIN = pin;
            console.log(tempPIN);
            setIsReEnteringPin(true);
        } else if (!isLoginPinSet && isReEnteringPin) {
            console.log('re entering pin');
        } else {
            console.log('pin set')
        }
    }

    let headingContent = isLoginPinSet ? 'Enter your 4 digit PIN' : (isReEnteringPin ? 'Re-Enter 4 digit PIN' : 'Set your 4 digit PIN')
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
    )
}

export default EnterPin