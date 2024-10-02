import TopMargin from '../components/TopMargin.js';
import AddEditTeam from '../components/AddEditTeam.js';
import BottomMargin from '../components/BottomMargin.js';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="App h-screen flex flex-col justify-between">
      <TopMargin />
      <main className="flex-grow flex items-center justify-center">
        <AddEditTeam />
      </main>
      <BottomMargin />
    </div>
  );
}

export default HomePage;
