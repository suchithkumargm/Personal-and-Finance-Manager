import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header.js';

const App = () => {

    return (
        <>
            <Header />
            {/* <main>
            <Router>
                <Routes>
                    <Route path="/auth/user/login" element={<Header />} />
                </Routes>
            </Router >
            </main> */}
        </>
    );
}

export default App;