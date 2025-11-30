import { Board } from './components/Board';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        TETRIS (Vibe Coding)
      </h1>
      <Board />
    </div>
  );
}

export default App;
