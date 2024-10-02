import React from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

function ClearAll({ clearMatchResults }) {
  const handleClearAll = async () => {
    try {
      clearMatchResults();
      const { data } = await axios.delete("/api/clear");
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong when clearing all data.");
    }
  };

  return (
    <div className="w-full flex justify-center py-4">
      <Button
        variant="contained"
        color="error"
        onClick={handleClearAll}
        className="w-full max-w-xs" 
      >
        Clear All
      </Button>
    </div>
  );
}

export default ClearAll;
