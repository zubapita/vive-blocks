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
      className={`${colorClass} border border-gray-700 w-8 h-8 min-w-[32px] min-h-[32px]`}
    />
  );
}
