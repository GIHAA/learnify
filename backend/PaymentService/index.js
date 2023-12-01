import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv/config";

import routers from "./routes/index.js";

const app = express();
const PORT = process.env.REACT_APP_BACKEND_PORT;
app.use(cors());
app.use(bodyParser.json());

routers(app);

app.use(session({
    secret: 'beheth_kade',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: 'none',
        secure: true
    }
}));

app.listen(PORT, () => {
    console.log(`Payment Service is up and running on port ${PORT}`);
});