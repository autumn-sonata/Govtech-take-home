import TopMargin from '../components/TopMargin.js';
import BottomMargin from '../components/BottomMargin.js';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="App h-screen flex flex-col justify-between">
      <TopMargin />
      <main className="flex-grow flex items-center justify-center">
        <p className="text-xl">
          Welcome to the landing page! 
          <br />
        </p>
      </main>
      <BottomMargin />
    </div>
  );
}

export default HomePage;
