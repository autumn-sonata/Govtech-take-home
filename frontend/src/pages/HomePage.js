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
        <div className="space-y-4 w-full max-w-3xl mx-auto">
          <div className="py-4">
            <AddEditTeam clearMatchResults={clearMatchResults} className="w-full" />
          </div>
          <Match matchResults={matchResults} setMatchResults={setMatchResults} className="w-full" />
          <div className="py-4">
            <SearchTeam teamMatches={teamMatches} setTeamMatches={setTeamMatches} className="w-full" />
          </div>
        </div>
      </main>
      <BottomMargin />
    </div>
  );
}

export default HomePage;
