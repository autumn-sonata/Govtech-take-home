import mongoose from "mongoose";
import colors from "colors";

const connectDataBase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Successfully connected to MongoDB ${connection.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in MongoDB connection: ${error}`.bgRed.white);
    }
};

export default connectDataBase;