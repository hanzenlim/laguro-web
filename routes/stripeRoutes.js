import _get from 'lodash/get';
import serverDataLoader from '../util/serverDataLoader';

const { makeMutation } = serverDataLoader;

const handleStripeEventMutation = `
    mutation($eventId: String!) {
        handleStripeEvent(eventId: $eventId)
    }
`;

const CHARGE_SUCCEED = 'charge.succeeded';
const INVOICE_PAYMENT_FAILED = 'invoice.payment_failed';

const stripeRoutes = app => {
    app.post('/api/stripe', async (req, res) => {
        const stripeEvent = req.body;
        const type = _get(stripeEvent, 'type');
        const eventId = _get(stripeEvent, 'id');

        // arguably better to always send event id to decouple server logic,
        // but filtering here will reduce load
        if (type === CHARGE_SUCCEED || type === INVOICE_PAYMENT_FAILED) {
            await makeMutation(handleStripeEventMutation, { eventId });
        }
        res.json({ status: 200, message: 'success' });
    });
};

export default stripeRoutes;
