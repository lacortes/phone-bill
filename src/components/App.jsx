import { Route, Routes } from 'react-router-dom';

import '../styles/app.scss';
import Dashboard from './Dashboard';
import Login from './Login';
import ApiProvider from '../providers/ApiProvider';
import AuthenticatedRoute from './AuthenticatedRoute';
import Admin from './Admin';
import CheckIfLoggedIn from './CheckIfLoggedIn';
import Statements from './admin/Statements';
import CreateStatement from './admin/CreateStatement';

const App = () => {
    return (
        <ApiProvider>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/login" element={ 
                    <CheckIfLoggedIn>
                        <Login />
                    </CheckIfLoggedIn>
                }/>
                <Route path="/admin" element={
                    <AuthenticatedRoute>
                        <Admin />
                    </AuthenticatedRoute>
                }>
                    <Route path="statements" element={<Statements />} />
                    <Route path="statements/createStatement" element={<CreateStatement />}/>
                </Route>
            </Routes>
        </ApiProvider>
    );
};

export default App;