import { parse, isValid } from "date-fns";

export const teamsController = async (req, res) => {
  try {
    const data = req.body.teamsInfo;
    const teams = groupTokens(data.trim().replace(/\n/g, " "));
    const teamRegex = /^(\w+)\s(\d{2}\/\d{2})\s(\d+)$/;
    const validTeams = [];
    const uniqueTeams = new Set();

    // Check for errors in team data
    teams.forEach((team, index) => {
      const match = team.trim().match(teamRegex);
      if (!match) {
        return res.status(400).json({
          success: false,
          message: `Entry ${
            index + 1
          }: Invalid format, name: only be alphanumeric with underscores, date: DD/MM, group: positive integer.`,
          data: team,
        });
      }

      const [_, name, date, group] = match;

      // Validate name length
      if (name.length > 40) {
        return res.status(400).json({
          success: false,
          message: `Entry ${
            index + 1
          }: Team name '${name}' exceeds 40 characters.`,
          data: team,
        });
      }

      // Check for duplicate team names
      if (uniqueTeams.has(name)) {
        return res.status(400).json({
          success: false,
          message: `Entry ${index + 1}: Team name '${name}' is a duplicate.`,
          data: team,
        });
      } else {
        uniqueTeams.add(name);
      }

      // Validate date format
      const parsedDate = parse(date, "dd/MM", new Date());

      // Check if the date is valid
      if (!isValid(parsedDate)) {
        return res.status(400).json({
          success: false,
          message: `Entry ${
            index + 1
          }: Date '${date}' is invalid, DD/MM format expected.`,
          data: team,
        });
      }

      // Validate group is a positive integer
      if (!Number.isInteger(+group) || +group <= 0) {
        return res.status(400).json({
          success: false,
          message: `Entry ${
            index + 1
          }: Group '${group}' must be a positive integer.`,
          data: team,
        });
      }

      validTeams.push({
        name: name,
        registerDate: parsedDate,
        group: group
      });
    });

    // TODO: Add to database

    res.status(200).json({
      success: true,
      message: "Teams successfully added!",
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexplained error occurred when adding teams.",
      data: error,
    });
  }
};

const groupTokens = (input) => {
  const tokens = input.split(/\s+/);
  const groupedLines = [];

  for (let i = 0; i < tokens.length; i += 3) {
    const group = tokens.slice(i, i + 3).join(" ");
    groupedLines.push(group);
  }

  return groupedLines;
};
