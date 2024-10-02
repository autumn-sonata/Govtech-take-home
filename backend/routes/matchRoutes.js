import express from "express";
import { matchController } from "../controllers/matchController.js";

const matchRoutes = express.Router();

matchRoutes.post("/", matchController);

export default matchRoutes;