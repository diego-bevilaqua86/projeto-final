import cookieParser from "cookie-parser";
import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import usersRouter from "./routers/users.router.mjs";
import viewsRouter from "./routers/views.router.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/view", viewsRouter);
app.use("/api/users", usersRouter);

export default app;
