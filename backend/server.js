import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import teamRoutes from "./routes/teamRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import connectDataBase from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 3500;

// Configure the environment
dotenv.config();

connectDataBase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/teams", teamRoutes);
app.use("/api/matches", matchRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
