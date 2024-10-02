import TopMargin from '../components/TopMargin.js';
import AddEditTeam from '../components/AddEditTeam.js';
import Match from '../components/Match.js';
import BottomMargin from '../components/BottomMargin.js';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="App h-screen flex flex-col justify-between">
      <TopMargin />
      <main className="flex-grow flex flex-col items-center justify-center">
        <AddEditTeam />
        <div className="my-4" />
        <Match />
      </main>
      <BottomMargin />
    </div>
  );
}

export default HomePage;
