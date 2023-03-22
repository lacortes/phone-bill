import { render, screen, waitFor } from '../../test-utills';
import Dashboard from '../Dashboard';
import { setupNoDashboardHandlers } from './msw/handlers';

const setup = async () => {
    render(<Dashboard />);

    await waitFor(() => expect(screen.queryByTestId('circular-progress')).not.toBeInTheDocument());
};

describe('Dashboard - statment', () => {

    test('Header has correct title', async () => {    
        await setup();
        await waitFor(() => expect(screen.queryByTestId('loading-statement')).not.toBeInTheDocument());

        const comp = await screen.findByText(/October, 2022/i);
        expect(comp).toBeInTheDocument();
    });

    test('Statement view controls exist', async () => {
        const october = 10;
        
        await setup();
        await waitFor(() => expect(screen.queryByTestId('loading-statement')).not.toBeInTheDocument());

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
        await setup();

        const comp = await screen.findByTestId('loading-statement');
        expect(comp).toBeInTheDocument();
    });
});
