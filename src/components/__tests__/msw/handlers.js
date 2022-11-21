import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { endpoints } from '../../../mocks/handlers';

export const setupNoDashboardHandlers = () => {
    server.use(
        rest.get(endpoints.GET_STATEMENT, (req, res, ctx) => {
            return res(ctx.status(404));
        })
    );
};