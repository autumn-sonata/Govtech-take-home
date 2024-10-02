import express from "express";
import { clearController } from "../controllers/clearController.js";

const clearRoutes = express.Router();

clearRoutes.delete("/", clearController);

export default clearRoutes;