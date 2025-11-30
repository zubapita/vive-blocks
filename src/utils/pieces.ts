import { TetrominoType } from '../types/game';
import type { Tetromino, Position } from '../types/game';

/**
 * 7種類のテトリミノの基本形状定義
 * 各形状は4x4のグリッドで表現される
 */
const TETROMINO_SHAPES: Record<number, boolean[][]> = {
  [TetrominoType.I]: [
    [false, false, false, false],
    [true, true, true, true],
    [false, false, false, false],
    [false, false, false, false],
  ],
  [TetrominoType.O]: [
    [false, false, false, false],
    [false, true, true, false],
    [false, true, true, false],
    [false, false, false, false],
  ],
  [TetrominoType.T]: [
    [false, false, false, false],
    [false, true, false, false],
    [true, true, true, false],
    [false, false, false, false],
  ],
  [TetrominoType.S]: [
    [false, false, false, false],
    [false, true, true, false],
    [true, true, false, false],
    [false, false, false, false],
  ],
  [TetrominoType.Z]: [
    [false, false, false, false],
    [true, true, false, false],
    [false, true, true, false],
    [false, false, false, false],
  ],
  [TetrominoType.J]: [
    [false, false, false, false],
    [true, false, false, false],
    [true, true, true, false],
    [false, false, false, false],
  ],
  [TetrominoType.L]: [
    [false, false, false, false],
    [false, false, true, false],
    [true, true, true, false],
    [false, false, false, false],
  ],
};

/**
 * テトリミノの種類に対応するTailwind CSS v4の色クラスを返す
 */
export function getTetrominoColor(type: TetrominoType | 0): string {
  if (type === 0) {
    return 'bg-gray-800'; // 空のセル
  }

  const colorMap: Record<number, string> = {
    [TetrominoType.I]: 'bg-cyan-500', // Iピース: シアン
    [TetrominoType.O]: 'bg-yellow-500', // Oピース: イエロー
    [TetrominoType.T]: 'bg-purple-500', // Tピース: パープル
    [TetrominoType.S]: 'bg-green-500', // Sピース: グリーン
    [TetrominoType.Z]: 'bg-red-500', // Zピース: レッド
    [TetrominoType.J]: 'bg-blue-500', // Jピース: ブルー
    [TetrominoType.L]: 'bg-orange-500', // Lピース: オレンジ
  };

  return colorMap[type];
}

/**
 * 新しいテトリミノを生成する
 */
export function createTetromino(type: TetrominoType, position: Position): Tetromino {
  return {
    type,
    shape: TETROMINO_SHAPES[type].map(row => [...row]), // ディープコピー
    position,
  };
}

/**
 * ランダムなテトリミノを生成する
 */
export function createRandomTetromino(position: Position): Tetromino {
  const types = [
    TetrominoType.I,
    TetrominoType.O,
    TetrominoType.T,
    TetrominoType.S,
    TetrominoType.Z,
    TetrominoType.J,
    TetrominoType.L,
  ];
  const randomType = types[Math.floor(Math.random() * types.length)];
  return createTetromino(randomType, position);
}

/**
 * テトリミノの形状データを取得する
 */
export function getTetrominoShape(type: TetrominoType): boolean[][] {
  return TETROMINO_SHAPES[type].map(row => [...row]);
}
