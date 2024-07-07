import { Link } from 'react-router-dom'

import './Register.css';

import loginImage from '../../../assets/images/loginAI.png';
import Container from '../../../components/Container/Container';

const Login = () => {
    return (
        <Container innerClass='register-inner-container'
            left={
                <img src={loginImage} alt='register' />
            }
            right={
                <div className="form-container">
                    <h3>Register your Account</h3>
                    <form>
                        <div className="d-flex-center">
                            <input placeholder="Name" type="text" id="name" name="name" required />
                        </div>
                        <div className="d-flex-center">
                            <input placeholder="Email" type="email" id="email" name="email" required />
                        </div>
                        <div className="d-flex-center">
                            <input placeholder="User Name" type="text" id="userName" name="userName" required />
                        </div>
                        <div className="d-flex-center">
                            <input placeholder="Password" type="password" id="password" name="password" required />
                        </div>
                        <div className="d-flex-center photo-upload">
                            <input placeholder="Your Photo" type="file" id="profilePhoto" name="profilePhoto" required />
                        </div>
                        <button className="btn register" type="submit">Next</button>
                    </form>
                </div>
            }
        />
    )
}

export default Login;