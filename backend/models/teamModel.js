import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 40,
  },
  registerDate: {
    type: Date,
    required: true,
  },
  group: {
    type: Number,
    required: true,
    min: 1,
  },
});

export default mongoose.model("Team", teamSchema);
