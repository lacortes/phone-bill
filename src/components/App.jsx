import { Route, Routes } from 'react-router-dom';

import '../styles/app.scss';
import Dashboard from './Dashboard';
import Login from './Login';
import ApiProvider from '../providers/ApiProvider';

const App = () => {
    return (
        <ApiProvider>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/login" element={<Login />} />
            </Routes>
        </ApiProvider>
    );
};

export default App;