import express from "express";
import cors from "cors";
import morgan from "morgan";
import teamRoutes from "./routes/teamRoutes.js";

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/teams", teamRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
