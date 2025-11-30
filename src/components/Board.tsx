import { useGameStore } from '../store/gameStore';
import { Cell } from './Cell';

/**
 * ゲーム盤面を表示するコンポーネント
 */
export function Board() {
  const grid = useGameStore((state) => state.grid);

  return (
    <div className="grid grid-cols-10 gap-1 p-4 bg-gray-900 rounded-lg border-2 border-gray-700">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} type={cell} />
        ))
      )}
    </div>
  );
}

