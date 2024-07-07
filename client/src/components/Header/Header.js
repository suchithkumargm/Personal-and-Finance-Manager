import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../../assets/images/logo.png';
import profilePhoto from '../../assets/images/profilePhoto.jpeg';


const Header = () => {
    return (
        <header>
            <nav>
                <div className="title">
                    <img id="profile-photo" src={logo} alt="logo" />
                    <h1>Personal and Finace Manager</h1>
                </div>
                <div className="profile">
                    <img src={profilePhoto} alt="profile photo" />
                    <button className="btn login">Login</button>
                </div>
            </nav>
        </header>
    )
}

export default Header;