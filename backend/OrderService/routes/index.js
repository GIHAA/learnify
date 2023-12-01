import cartRouter from "./routers/cart.js"
import cartItemRouter from "./routers/cartItem.js"
import deliveryRouter from "./routers/delivery.js"

function routers(app) {
    app.use("/carts", cartRouter)
    app.use("/cartItems", cartItemRouter)
    app.use("/deliveries", deliveryRouter)
}

export default routers;