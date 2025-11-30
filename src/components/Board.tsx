import { useGameStore } from '../store/gameStore';
import { Cell } from './Cell';
import type { CellType } from '../types/game';

/**
 * ゲーム盤面を表示するコンポーネント
 */
export function Board() {
  const grid = useGameStore((state) => state.grid);
  const currentPiece = useGameStore((state) => state.currentPiece);

  // 現在のブロックを盤面に重ねて表示するための関数
  const getCellType = (rowIndex: number, colIndex: number): CellType => {
    // まず固定されたブロックをチェック
    if (grid[rowIndex][colIndex] !== 0) {
      return grid[rowIndex][colIndex];
    }

    // 現在のブロックが存在する場合、その位置をチェック
    if (currentPiece) {
      const { shape, position, type } = currentPiece;
      const relativeRow = rowIndex - position.y;
      const relativeCol = colIndex - position.x;

      // 盤面内のセルのみチェック（yが負の値でも表示可能）
      // relativeRowが負の値の場合は、shape配列の範囲外なので表示しない
      // relativeRowが4以上の場合も範囲外なので表示しない
      if (
        rowIndex >= 0 &&
        rowIndex < 20 &&
        relativeRow >= 0 &&
        relativeRow < 4 &&
        relativeCol >= 0 &&
        relativeCol < 4 &&
        shape[relativeRow]?.[relativeCol] === true
      ) {
        return type as CellType;
      }
    }

    return 0;
  };

  return (
    <div className="grid grid-cols-10 gap-1 p-4 bg-gray-900 rounded-lg border-2 border-gray-700 w-fit">
      {grid.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} type={getCellType(rowIndex, colIndex)} />
        ))
      )}
    </div>
  );
}
