import express from "express";
import { teamsController } from "../controllers/teamsController.js";

const teamRoutes = express.Router();

teamRoutes.post("/", teamsController);
teamRoutes.put("/", teamsController);

export default teamRoutes;
