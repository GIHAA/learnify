import buyerRouter from "./routers/buyer.js";
import sellerRouter from "./routers/seller.js";
import adminRouter from "./routers/admin.js";

function routers(app) {
    app.use("/buyers", buyerRouter);
    app.use("/sellers", sellerRouter);
    app.use("/admins", adminRouter);
}

export default routers;