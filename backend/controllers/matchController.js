export const matchController = async (req, res) => {
  try {
    // TODO: Check req.body entering
    const { data } = req.body;
    // TODO: Logic for comparing matches

      // TODO: Add to database
    if (data) {
      res.status(200).send({
        success: true,
        message: "Teams successfully added!",
        data: teams,
      });
    } else {
      // Respond with errors
      res.status(400).send({
        success: false,
        message:
          "Missing or formatting errors were found in the team information.",
        data: JSON.stringify(errors),
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An unexplained error occurred.",
      data: error,
    });
  }
};
