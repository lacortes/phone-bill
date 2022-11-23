import { render, screen } from '../../test-utills';
import Dashboard from '../Dashboard';
import { setupNoDashboardHandlers } from './msw/handlers';


describe('Dashboard - statment', () => {
    beforeEach(() => render(<Dashboard />));

    test('Header has correct title', async () => {    
        const comp = await screen.findByText(/October, 2022/i);
        expect(comp).toBeInTheDocument();
    });

    test('Statement view controls exist', async () => {
        const october = 10;

        const monthInput = await screen.findByDisplayValue(october);
        expect(monthInput).toBeInTheDocument();

        const year = 2022;
    
        const yearInput = await screen.findByDisplayValue(year);
        expect(yearInput).toBeInTheDocument();    
        
        const button = await screen.findByText(/view/i);
        expect(button).toBeInTheDocument();
    });
});

describe('Dashboard - No statement found', () => { 
    beforeEach(() => setupNoDashboardHandlers());

    test('Header on no statment found', async () => {
        render(<Dashboard />);

        const comp = await screen.getByTestId('loading-statement');
        expect(comp).toBeInTheDocument();
    });
});
