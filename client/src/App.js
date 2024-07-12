import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header.js';
import Login from './pages/Auth/Login/Login.js';
import Register from './pages/Auth/Register/Register.js';
import EnterPin from './pages/Auth/EnterPin/EnterPin.js';

const App = () => {

    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/auth/user/login" element={<Login />} />
                    <Route path="/auth/user/register" element={<Register />} />
                    <Route path="/auth/user/pin" element={<EnterPin />} />
                </Routes>
            </main>
        </Router >
    );
}

export default App;