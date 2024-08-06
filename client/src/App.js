import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header.js';
import Login from './pages/Auth/Login/Login.js';
import Register from './pages/Auth/Register/Register.js';
import EnterPin from './pages/Auth/EnterPin/EnterPin.js';
import Dashboard from './pages/Dashboard/Dashboard.js';
import ProtectedRoute from './utils/ProtectedRoute.js';

const App = () => {

    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/auth/user/login" element={<Login />} />
                    <Route path="/auth/user/register" element={<Register />} />
                    <Route path="/auth/user/pin" element={<EnterPin />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                </Routes>
            </main>
        </Router >
    );
}

export default App;