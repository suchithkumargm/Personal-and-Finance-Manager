import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header.js';
import Login from './pages/Auth/Login/Login.js';
import Register from './pages/Auth/Register/Register.js';

const App = () => {

    return (
        <>
            <Header />
            <main>
                <Router>
                    <Routes>
                        <Route path="/auth/user/login" element={<Login />} />
                        <Route path="/auth/user/register" element={<Register />} />
                    </Routes>
                </Router >
            </main>
        </>
    );
}

export default App;