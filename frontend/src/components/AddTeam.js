import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Button, Typography, Paper } from "@mui/material";

function AddTeam() {
  const [teamsInfo, setTeamsInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Teams added successfully!");
    try {
      const { data } = await axios.post("/api/teams/", {
        teamsInfo,
      });
      if (data?.success) {
        toast.success("Teams added successfully!");
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      toast.error("Something wrong occurred for input");
    }
  };

  return (
    <Paper
      className="add-team p-4 shadow rounded"
      elevation={3}
      sx={{
        width: "75%",
        margin: "0 auto",
        maxWidth: "600px",
      }}
    >
      <Typography variant="h5" component="h2" className="font-bold mb-2">
        Add Teams
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Teams information"
          variant="outlined"
          fullWidth
          margin="normal"
          value={teamsInfo}
          onChange={(e) => setTeamsInfo(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-2"
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
}

export default AddTeam;
