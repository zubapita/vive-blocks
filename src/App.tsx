import { useEffect } from 'react';
import { Board } from './components/Board';
import { useGameStore } from './store/gameStore';
import { useGameLoop } from './hooks/useGameLoop';

function App() {
  const moveLeft = useGameStore((state) => state.moveLeft);
  const moveRight = useGameStore((state) => state.moveRight);
  const rotate = useGameStore((state) => state.rotate);
  const drop = useGameStore((state) => state.drop);
  const start = useGameStore((state) => state.start);
  const isGameOver = useGameStore((state) => state.isGameOver);

  // ゲームループを開始
  useGameLoop();

  // キーボード操作
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isGameOver) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          moveRight();
          break;
        case 'ArrowUp':
          event.preventDefault();
          rotate();
          break;
        case 'ArrowDown':
          event.preventDefault();
          drop();
          break;
        case ' ':
          event.preventDefault();
          drop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight, rotate, drop, isGameOver]);

  // ゲーム開始
  useEffect(() => {
    start();
  }, [start]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Vive Blocks
      </h1>
      {isGameOver && (
        <div className="mb-4 text-red-500 text-xl font-bold">GAME OVER</div>
      )}
      <Board />
      <div className="mt-4 text-sm text-gray-400 text-center">
        <p>← →: 移動 | ↑: 回転 | ↓ または Space: 落下</p>
      </div>
    </div>
  );
}

export default App;
