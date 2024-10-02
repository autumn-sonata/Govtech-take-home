import React, { useState } from "react";
import TopMargin from "../components/TopMargin.js";
import AddEditTeam from "../components/AddEditTeam.js";
import Match from "../components/Match.js";
import BottomMargin from "../components/BottomMargin.js";
import "../styles/HomePage.css";

function HomePage() {
  const [matchResults, setMatchResults] = useState(null);

  const clearMatchResults = () => {
    setMatchResults(null);
  };

  return (
    <div className="App h-screen flex flex-col justify-between">
      <TopMargin />
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="my-4" />
        <AddEditTeam clearMatchResults={clearMatchResults} />
        <div className="my-4" />
        <Match matchResults={matchResults} setMatchResults={setMatchResults} />
        <div className="my-4" />
      </main>
      <BottomMargin />
    </div>
  );
}

export default HomePage;
