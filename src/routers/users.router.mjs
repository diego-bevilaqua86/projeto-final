import express from "express";
import usersMiddlewares from "../middlewares/users.middlewares.mjs";

const router = express.Router();

router.get("/", usersMiddlewares.findAll);

export default router;
