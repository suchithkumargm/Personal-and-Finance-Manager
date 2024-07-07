import './Header.css';

import logo from '../../assets/images/logo.png';
import profilePhoto from '../../assets/images/profilePhoto.jpeg';


const Header = () => {
    return (
        <header>
            <nav>
                <div className="title">
                    <img src={logo} alt='profile' />
                    <h1>Personal and Finace Manager</h1>
                </div>
                <div className="profile">
                    <img src={profilePhoto} alt='profile' />
                    <button className="btn login">Login</button>
                </div>
            </nav>
        </header>
    )
}

export default Header;