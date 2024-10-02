import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";

function SearchTeam({ teamMatches, setTeamMatches }) {
  const [teamName, setTeamName] = useState("");

  const handleSearchTeam = async (e) => {
    e.preventDefault();
    try {
      const trimmedTeamName = teamName.trim();
      const { data } = await axios.get(`/api/matches/${trimmedTeamName}`);
      if (data.success) {
        setTeamMatches(data.data);
        toast.success(`Matches for ${trimmedTeamName} found.`);
      } else {
        setTeamMatches([]);
        toast.error(`No matches found for ${trimmedTeamName}.`);
      }
    } catch (error) {
      setTeamMatches([]);
      toast.error("Error searching for team matches.");
    }
  };

  return (
    <Paper
      className="search-team p-4 shadow rounded"
      elevation={3}
      sx={{
        width: "75%",
        margin: "0 auto",
        maxWidth: "600px",
      }}
    >
      <Typography variant="h5" component="h2" className="font-bold mb-2">
        Search Team Matches
      </Typography>
      <form onSubmit={handleSearchTeam}>
        <TextField
          label="Team Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          slotProps={{
            input: {
              style: {
                maxHeight: "150px",
                overflowY: "auto",
              },
            },
          }}
        />
        <Grid container spacing={2}>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-2"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      {teamMatches.length > 0 && (
        <div className="team-matches mt-4">
          <Typography variant="h6" component="h3" className="font-bold mb-2">
            Match Results
          </Typography>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Team</th>
                <th className="border px-4 py-2">Opponent</th>
                <th className="border px-4 py-2">Team Score</th>
                <th className="border px-4 py-2">Opponent Score</th>
              </tr>
            </thead>
            <tbody>
              {teamMatches.map((match, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{match.team}</td>
                  <td className="border px-4 py-2">{match.opponent}</td>
                  <td className="border px-4 py-2">{match.teamScore}</td>
                  <td className="border px-4 py-2">{match.opponentScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Paper>
  );
}

export default SearchTeam;
