import React, { useState } from "react";
import TopMargin from "../components/TopMargin.js";
import AddEditTeam from "../components/AddEditTeam.js";
import Match from "../components/Match.js";
import SearchTeam from "../components/SearchTeam.js";
import BottomMargin from "../components/BottomMargin.js";
import "../styles/HomePage.css";

function HomePage() {
  const [matchResults, setMatchResults] = useState(null);
  const [teamMatches, setTeamMatches] = useState([]);

  const clearMatchResults = () => {
    setMatchResults(null);
    setTeamMatches([]);
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
        <SearchTeam teamMatches={teamMatches} setTeamMatches={setTeamMatches} />
        <div className="my-4" />
      </main>
      <BottomMargin />
    </div>
  );
}

export default HomePage;
