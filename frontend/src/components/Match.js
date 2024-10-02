import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";

function Match() {
  const [matchInfo, setMatchInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/match", {
        matchInfo,
      });
      if (data?.success) {
        toast.success("Match information submitted successfully!");
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong while submitting the match information.");
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
    </Paper>
  );
}

export default Match;
