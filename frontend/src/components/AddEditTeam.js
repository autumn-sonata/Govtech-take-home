import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";

function AddEditTeam() {
  const [teamsInfo, setTeamsInfo] = useState("");

  const handleAddTeams = async (e) => {
    e.preventDefault();
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

  const handleEditTeams = async (e) => {
    e.preventDefault();
    toast.success("Teams edited successfully!");
    try {
      const { data } = await axios.put("/api/teams/", {
        teamsInfo,
      });
      if (data?.success) {
        toast.success("Teams edited successfully!");
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
        Add or Edit Teams
      </Typography>
      <form>
        <TextField
          label="Teams information"
          variant="outlined"
          fullWidth
          margin="normal"
          value={teamsInfo}
          onChange={(e) => setTeamsInfo(e.target.value)}
          multiline
          rows={4}
          slotProps={{
            input: {
              style: {
                maxHeight: '150px',
                overflowY: 'auto',
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
              onClick={(e) => handleAddTeams(e, 'add')}
            >
              Add Teams
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className="mt-2"
              onClick={(e) => handleEditTeams(e, 'edit')}
            >
              Edit Teams
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default AddEditTeam;
