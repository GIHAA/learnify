import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import routers from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.REACT_APP_GATEWAY_PORT;

routers(app);

app.listen(PORT, () => {
    console.log(`Gateway is up and running on port ${PORT}`);
});