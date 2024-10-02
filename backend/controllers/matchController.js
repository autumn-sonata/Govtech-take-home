import teamModel from "../models/teamModel.js";

export const matchController = async (req, res) => {
  try {
    const matchResults = req.body.matchInfo;
    const matchOutcomes = groupTokens(matchResults.trim().replace(/\n/g, " "));
    const teamStatistics = {}; // information of each team from matches
    const availableTeams = new Set(); // teams to be queried from the database

    for (const matchOutcome of matchOutcomes) {
      const [teamA, teamB, goalsA, goalsB] = matchOutcome.split(" ");

      const scoreA = parseInt(goalsA);
      const scoreB = parseInt(goalsB);

      if (Number.isNaN(scoreA) || Number.isNaN(scoreB)) {
        return res.status(400).json({
          success: false,
          message: `Invalid goals for match outcome: ${matchOutcome}`,
        });
      }

      availableTeams.add(teamA);
      availableTeams.add(teamB);

      updateTeamStatistics(teamStatistics, teamA, teamB, scoreA, scoreB);
    }

    const teamNames = Array.from(availableTeams);
    const teamsDb = await teamModel.find({ name: { $in: teamNames } });

    teamsDb.forEach((team) => {
      teamStatistics[team.name].registerDate = team.registerDate;
      teamStatistics[team.name].group = team.group;
    });

    const groupedTeams = {};
    for (const teamName in teamStatistics) {
      const team = teamStatistics[teamName];
      const group = team.group;

      if (!groupedTeams[group]) {
        groupedTeams[group] = [];
      }
      groupedTeams[group].push(team);
    }

    // Sort each group's teams
    for (const group in groupedTeams) {
      groupedTeams[group].sort((a, b) => {
        // 1. Highest total match points
        if (b.points !== a.points) return b.points - a.points;
        // 2. If tied, highest total goals scored
        if (b.goals !== a.goals) return b.goals - a.goals;
        // 3. If still tied, highest alternate total match points
        if (b.alternatePoints !== a.alternatePoints)
          return b.alternatePoints - a.alternatePoints;
        // 4. If still tied, earliest registration date TODO
        return new Date(a.registerDate) - new Date(b.registerDate);
      });
    }

    return res.status(200).json({
      success: true,
      message: "Match information calculated successfully!",
      data: groupedTeams,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An unexplained error occurred in matching.",
      data: error,
    });
  }
};

const updateTeamStatistics = (teamStatistics, teamA, teamB, scoreA, scoreB) => {
    if (!teamStatistics[teamA]) {
        teamStatistics[teamA] = {
          name: teamA,
          points: 0,
          goals: 0,
          alternatePoints: 0,
        };
      }
      if (!teamStatistics[teamB]) {
        teamStatistics[teamB] = {
          name: teamB,
          points: 0,
          goals: 0,
          alternatePoints: 0,
        };
      }

      teamStatistics[teamA].goals += scoreA;
      teamStatistics[teamB].goals += scoreB;

      if (scoreA > scoreB) {
        teamStatistics[teamA].points += 3;
        teamStatistics[teamA].alternatePoints += 5;
        teamStatistics[teamB].alternatePoints += 1;
      } else if (scoreA < scoreB) {
        teamStatistics[teamB].points += 3;
        teamStatistics[teamB].alternatePoints += 5;
        teamStatistics[teamA].alternatePoints += 1;
      } else {
        // Draw
        teamStatistics[teamA].points += 1;
        teamStatistics[teamB].points += 1;
        teamStatistics[teamA].alternatePoints += 3;
        teamStatistics[teamB].alternatePoints += 3;
      }
};

const groupTokens = (input) => {
  const tokens = input.split(/\s+/);
  const groupedLines = [];

  for (let i = 0; i < tokens.length; i += 4) {
    const group = tokens.slice(i, i + 4).join(" ");
    groupedLines.push(group);
  }

  return groupedLines;
};
