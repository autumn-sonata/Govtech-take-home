import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";

function Match({ matchResults, setMatchResults }) {
  const [matchInfo, setMatchInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/matches", {
        matchInfo,
      });
      if (data?.success) {
        setMatchResults(data.data);
        toast.success(`${data.message}`);
      } else {
        setMatchResults(null);
        toast.error(`${data.message}`);
      }
    } catch (error) {
      setMatchResults(null);
      toast.error(
        "Something went wrong while submitting the match information."
      );
    }
  };

  return (
    <Paper
      className="match p-4 shadow rounded"
      elevation={3}
      sx={{
        width: "75%",
        margin: "0 auto",
        maxWidth: "600px",
      }}
    >
      <Typography variant="h5" component="h2" className="font-bold mb-2">
        Match Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Match information"
          variant="outlined"
          fullWidth
          margin="normal"
          value={matchInfo}
          onChange={(e) => setMatchInfo(e.target.value)}
          multiline
          rows={4}
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
              Match
            </Button>
          </Grid>
        </Grid>
      </form>
      {matchResults && (
        <div className="match-results mt-4">
          <Typography variant="h6" component="h3" className="font-bold mb-2">
            Match Results
          </Typography>
          {Object.entries(matchResults).map(([group, teams]) => (
            <div key={group} className="group mb-3">
              <Typography variant="h7" component="h4" className="font-bold">
                {group}
              </Typography>
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Team Name</th>
                    <th className="border px-4 py-2">Points</th>
                    <th className="border px-4 py-2">Goals</th>
                    <th className="border px-4 py-2">Registration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => {
                    const isHighlighted =
                      teams.length <= 4 || index < 4; // Highlight if 4 or less teams or top 4

                    return (
                      <tr
                        key={team.name}
                        className={isHighlighted ? "bg-green-200" : ""} // Highlighting
                      >
                        <td className="border px-4 py-2">{team.name}</td>
                        <td className="border px-4 py-2">{team.points}</td>
                        <td className="border px-4 py-2">{team.goals}</td>
                        <td className="border px-4 py-2">
                          {new Date(team.registerDate).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
}

export default Match;
