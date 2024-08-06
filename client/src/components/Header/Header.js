import { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../../assets/images/logo.png';
import defaultProfilePhoto from '../../assets/images/defaultProfilePhoto.jfif';

import { UserContext } from '../../contexts/UserContext.js';

const Header = () => {

    const { currentLoggedInUser, userLogout } = useContext(UserContext);

    return (
        <header>
            <nav>
                <div className="title">
                    <img src={logo} alt='profile' />
                    <h1>Personal and Finace Manager</h1>
                </div>
                <div className="profile">
                    <img src={currentLoggedInUser.profilePhoto === "" ? defaultProfilePhoto : currentLoggedInUser.profilePhoto} alt='profile' />
                    {
                        currentLoggedInUser.userName ?
                            <button className="btn login" onClick={userLogout}>Logout</button>
                            :
                            <>
                                <Link to="/auth/user/login"><button className="btn login">Login</button></Link>
                                <Link to="/auth/user/register"><button className="btn login">Register</button></Link>
                            </>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header;