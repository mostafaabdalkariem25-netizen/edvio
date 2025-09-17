import { rest } from 'msw';
import invoices from '../mock/invoices.json';
import clients from '../mock/clients.json';

export const handlers = [
  rest.get('/api/invoices', (req, res, ctx) => {
    return res(ctx.json(invoices));
  }),
  rest.get('/api/clients', (req, res, ctx) => {
    return res(ctx.json(clients));
  }),
];