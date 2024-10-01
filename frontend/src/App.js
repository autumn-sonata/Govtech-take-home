import './App.css';

function App() {
  return (
    <div className="App h-screen flex flex-col justify-between">
      <header className="bg-green-500 text-white text-4xl text-center py-4">
        We Are The Champions
      </header>
      <main className="flex-grow flex items-center justify-center">
        <p className="text-xl">
          Welcome to the landing page! 
          <br />
        </p>
      </main>
      <footer className="bg-gray-200 text-center py-2">
      </footer>
    </div>
  );
}

export default App;
