import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  team: {
    type: String,
    required: true,
  },
  opponent: {
    type: String,
    required: true,
  },
  teamScore: {
    type: Number,
    required: true,
  },
  opponentScore: {
    type: Number,
    required: true,
  },
});

matchSchema.index({ team: 1, opponent: 1, teamScore: 1, opponentScore: 1 }, { unique: true });

export default mongoose.model("Match", matchSchema);