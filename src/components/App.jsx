import { createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider } from 'react-router-dom';

import '../styles/app.scss';
import Dashboard from './Dashboard';
import Login from './Login';
import { useApi } from '../providers/ApiProvider';
import AuthenticatedRoute from './AuthenticatedRoute';
import Admin from './Admin';
import CheckIfLoggedIn from './CheckIfLoggedIn';
import Statements from './admin/Statements';
import StatementView from './admin/StatementView';

const makeRouter = (api) => {
    return createBrowserRouter(
        createRoutesFromElements(
            <>
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
                    <Route 
                        path="statements/:statementId" 
                        element={<StatementView />}
                        loader={async ({ params }) => {
                            
                            const [ year, month ] = params.statementId.split('-');
                            
                            try {
                                return await api.getStatement(month, year);
                            } catch {
                                throw redirect('/admin/statements');
                            }
                            
                        }}    
                    />
                    <Route path="statements/new" element={<StatementView />}/>
                </Route>
            </>
        )
    );
};

const App = () => {
    const api = useApi();

    return (
        <RouterProvider router={makeRouter(api)}/>
    );
};

export default App;