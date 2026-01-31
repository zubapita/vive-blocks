import { getTetrominoColor } from '../utils/pieces';
import type { CellType } from '../types/game';

interface CellProps {
  type: CellType;
}

/**
 * 1つのブロックを表示するコンポーネント
 */
export function Cell({ type }: CellProps) {
  const colorClass = getTetrominoColor(type);

  return (
    <div
      className={`${colorClass} border border-gray-700 w-6 h-6 sm:w-8 sm:h-8`}
    />
  );
}
