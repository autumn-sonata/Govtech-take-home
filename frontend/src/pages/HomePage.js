import TopMargin from '../components/TopMargin.js';
import AddTeam from '../components/AddTeam';
import BottomMargin from '../components/BottomMargin.js';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="App h-screen flex flex-col justify-between">
      <TopMargin />
      <main className="flex-grow flex items-center justify-center">
        <AddTeam />
      </main>
      <BottomMargin />
    </div>
  );
}

export default HomePage;
