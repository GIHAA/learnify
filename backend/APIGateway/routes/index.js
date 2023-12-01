import buyerRouter from "./routers/buyer.js";
import sellerRouter from "./routers/seller.js";
import itemRouter from "./routers/item.js";
import adminRouter from "./routers/admin.js";
import categoryRouter from "./routers/category.js"
import reviewRouter from "./routers/review.js"
import cartRouter from "./routers/cart.js"
import cartItemRouter from "./routers/cartItem.js"
import paymentRouter from './routers/payment.js';
import deliveryRouter from "./routers/delivery.js"

function routers(app) {
    app.use("/admins", adminRouter);
    app.use("/buyers", buyerRouter);
    app.use("/sellers", sellerRouter);
    app.use("/items", itemRouter);
    app.use("/categories", categoryRouter)
    app.use("/reviews", reviewRouter);
    app.use("/carts", cartRouter)
    app.use("/cartItems", cartItemRouter)
    app.use('/stripe', paymentRouter);
    app.use("/deliveries", deliveryRouter)
}

export default routers;