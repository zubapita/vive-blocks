/**
 * セルの種類を表す型
 * 0 = 空、1-7 = テトリミノの種類
 */
export type CellType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * グリッドの型定義
 * 2次元配列で、20行 x 10列
 * grid[y][x] の形式（yが行、xが列）
 */
export type Grid = CellType[][];

/**
 * 座標を表す型
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * テトリミノの種類
 */
export const TetrominoType = {
  I: 1,
  O: 2,
  T: 3,
  S: 4,
  Z: 5,
  J: 6,
  L: 7,
} as const;

export type TetrominoType = (typeof TetrominoType)[keyof typeof TetrominoType];

/**
 * テトリミノの形状データ
 * 4x4のグリッドで表現（回転状態を含む）
 */
export interface Tetromino {
  type: TetrominoType;
  shape: boolean[][]; // 4x4の形状データ
  position: Position; // 現在の位置（左上の座標）
}

/**
 * ゲームの状態
 */
export interface GameState {
  grid: Grid; // 20x10の盤面
  currentPiece: Tetromino | null; // 現在操作中のブロック
  isGameOver: boolean;
  isPaused: boolean;
}

