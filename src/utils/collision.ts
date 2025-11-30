import type { Grid, Tetromino } from '../types/game';

const GRID_ROWS = 20;
const GRID_COLS = 10;

/**
 * テトリミノが指定された位置に配置可能かどうかを判定する
 * @param grid 盤面
 * @param piece テトリミノ
 * @param position 配置位置
 * @returns 配置可能な場合true
 */
export function isValidPosition(
  grid: Grid,
  piece: Tetromino,
  position: { x: number; y: number }
): boolean {
  const { shape } = piece;

  // 4x4の形状データを走査
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      // 形状データがtrue（ブロックが存在）の場合のみチェック
      if (shape[row][col]) {
        const gridX = position.x + col;
        const gridY = position.y + row;

        // 盤面外チェック
        if (gridX < 0 || gridX >= GRID_COLS || gridY < 0 || gridY >= GRID_ROWS) {
          return false;
        }

        // 既存のブロックとの衝突チェック
        if (grid[gridY][gridX] !== 0) {
          return false;
        }
      }
    }
  }

  return true;
}
