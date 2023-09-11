import express, { Application } from "express";
import cors from "cors"
import router from "./modules/routes";

const app:Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use("/", (req, res) => {
    res.send(`<h1 style='text-align: center; padding: 20px; color:green'>Bank Management System Server is Running!</h1>`)
});


export default app;