import express from "express";
import { teamsController } from "../controllers/teamsController.js";

const teamRoutes = express.Router();

teamRoutes.post("/", teamsController);

export default teamRoutes;
