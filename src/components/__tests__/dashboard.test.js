import { render, screen } from '../../test-utills';
import Dashboard from '../Dashboard';
import { setupNoDashboardHandlers } from './msw/handlers';


describe('Dashboard - statment', () => {
    test('Header has correct title', async () => {
        render(<Dashboard />);
    
        const comp = await screen.findByText(/October, 2022/i);
        expect(comp).toBeInTheDocument();
    });
});

describe('Dashboard - No statement found', () => { 
    beforeEach(() => setupNoDashboardHandlers());

    test('Header on no statment found', async () => {
        render(<Dashboard />);
        const comp = await screen.findByText(/No Statement Found/i);
        expect(comp).toBeInTheDocument();
    });
});
