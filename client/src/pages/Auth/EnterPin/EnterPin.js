import loginImage from '../../../assets/images/loginAI.png';
import Container from '../../../components/Container/Container.js';
import PinInput from '../../../components/OTP PIN/PinInput.js'

import './EnterPin.css';

const EnterPin = () => {

    const onPinSubmit = (pin) => {
        console.log(pin);
    }
    return (
        <Container innerClass='pin-inner-container'
            left={
                <img src={loginImage} alt='pin' />
            }
            right={
                <div className="pin-form-container">
                    <h3 className='pin-h3'>Enter your 4 digit PIN</h3>

                    <PinInput onPinSubmit={onPinSubmit} />
                </div>
            }
        />
    )
}

export default EnterPin