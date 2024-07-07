import { Link } from 'react-router-dom'

import './Login.css';

import loginImage from '../../../assets/images/loginAI.png';
import Container from '../../../components/Container/Container';

const Login = () => {
    return (
        <Container innerClass='login-inner-container'
            left={
                <img src={loginImage} alt='login' />
            }
            right={
                <div className="form-container">
                    <h3>Welcome Back</h3>
                    <form>
                        <div className="d-flex-center">
                            <input placeholder="Email" type="email" id="email" name="email" required />
                        </div>
                        <div className="d-flex-center">
                            <input placeholder="Password" type="password" id="password" name="password" required />
                        </div>
                        <Link to="/">Forgot password?</Link>
                        <button className="btn login" type="submit">Next</button>
                    </form>
                </div>
            }
        />
    )
}

export default Login;