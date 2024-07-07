import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="container d-flex-center">
            <div className="inner-container d-flex-center login-inner-container">
                <div className="left-container">
                    <img src="../../images/loginAI.png" alt="AI logi image" />
                </div>
                <div className="right-container d-flex-center bg-gradient">
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
                </div>
            </div>
        </div>
    )
}

export default Login;