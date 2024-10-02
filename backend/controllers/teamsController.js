import { parse, isValid } from "date-fns";

export const teamsController = async (req, res) => {
  try {
    const data = req.body.teamsInfo;
    const teams = groupTokens(data.trim().replace(/\n/g, " "));
    const teamRegex = /^(\w+)\s(\d{2}\/\d{2})\s(\d+)$/;
    const errors = [];
    const uniqueTeams = new Set();

    teams.forEach((team, index) => {
      const match = team.trim().match(teamRegex);
      if (!match) {
        errors.push(
          `Entry ${
            index + 1
          }: Invalid format, name: only be alphanumeric with underscores, date: DD/MM, group: positive integer.`
        );
      }

      const [_, name, date, group] = match;

      // Validate name length
      if (name.length > 40) {
        errors.push(
          `Entry ${index + 1}: Team name '${name}' exceeds 40 characters.`
        );
      }

      // Check for duplicate team names
      if (uniqueTeams.has(name)) {
        errors.push(`Entry ${index + 1}: Team name '${name}' is a duplicate.`);
      } else {
        uniqueTeams.add(name);
      }

      // Validate date format
      const parsedDate = parse(date, "dd/MM", new Date());

      // Check if the date is valid
      if (!isValid(parsedDate)) {
        errors.push(
          `Entry ${
            index + 1
          }: Date '${date}' is invalid, DD/MM format expected.`
        );
      }

      // Validate group is a positive integer
      if (!Number.isInteger(+group) || +group <= 0) {
        errors.push(
          `Entry ${index + 1}: Group '${group}' must be a positive integer.`
        );
      }
    });

    if (errors.length == 0) {
      // TODO: Add to database

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

const groupTokens = (input) => {
  const tokens = input.split(/\s+/);
  const groupedLines = [];

  for (let i = 0; i < tokens.length; i += 3) {
    const group = tokens.slice(i, i + 3).join(" ");
    groupedLines.push(group);
  }

  return groupedLines
};
