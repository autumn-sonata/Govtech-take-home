import Team from "../models/teamModel.js";
import Match from "../models/matchModel.js";

export const clearController = async (req, res) => {
  try {
    await Team.deleteMany({});
    await Match.deleteMany({});

    res
      .status(200)
      .json({ success: true, message: "All data cleared successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to clear data." });
  }
};
