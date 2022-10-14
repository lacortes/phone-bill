import { Route, Routes } from 'react-router-dom';

import '../styles/app.scss';
import Dashboard from './Dashboard';
import Login from './Login';
import AuthProvider from '../providers/ApiProvider';

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/login" element={<Login />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;