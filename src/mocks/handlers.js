import { rest } from 'msw';
import { statement } from './statments';

export const endpoints = { GET_STATEMENT: 'https://api.cortes-debt.com/statements/:statementId' };

export const handlers = [
    rest.get(endpoints.GET_STATEMENT, (req, res, ctx) => {
        return res(ctx.json(statement));
    })
];


