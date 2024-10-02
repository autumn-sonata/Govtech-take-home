import express from "express";
import { matchController, getTeamMatchesController } from "../controllers/matchController.js";

const matchRoutes = express.Router();

matchRoutes.post("/", matchController);

matchRoutes.get("/:teamName", getTeamMatchesController);

export default matchRoutes;