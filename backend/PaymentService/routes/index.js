import stripeRouter from './routers/StripeHandler.js';

function routers(app) {
    app.use('/stripe', stripeRouter);
}

export default routers;