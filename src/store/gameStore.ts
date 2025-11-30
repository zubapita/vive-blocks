import { create } from 'zustand';
import type { Grid, Tetromino, Position, CellType } from '../types/game';
import { createRandomTetromino } from '../utils/pieces';

/**
 * ゲームストアの状態
 */
interface GameStore {
  // 状態
  grid: Grid;
  currentPiece: Tetromino | null;
  isGameOver: boolean;
  isPaused: boolean;

  // アクション
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  drop: () => void;
  reset: () => void;
}

/**
 * 空のグリッド（20行 x 10列）を生成する
 */
function createEmptyGrid(): Grid {
  const rows = 20;
  const cols = 10;
  return Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(0) as CellType[]);
}

/**
 * 初期位置を計算する（盤面の上部中央）
 */
function getInitialPosition(): Position {
  return { x: 3, y: 0 }; // 10列の中央付近（4列目から開始）
}

/**
 * Zustandゲームストア
 */
export const useGameStore = create<GameStore>((set, get) => ({
  // 初期状態
  grid: createEmptyGrid(),
  currentPiece: null,
  isGameOver: false,
  isPaused: false,

  // アクション: 左に移動
  moveLeft: () => {
    console.log('moveLeft called');
    const { currentPiece } = get();
    if (!currentPiece) return;
    // TODO: Phase 3で実装
  },

  // アクション: 右に移動
  moveRight: () => {
    console.log('moveRight called');
    const { currentPiece } = get();
    if (!currentPiece) return;
    // TODO: Phase 3で実装
  },

  // アクション: 回転
  rotate: () => {
    console.log('rotate called');
    const { currentPiece } = get();
    if (!currentPiece) return;
    // TODO: Phase 3で実装
  },

  // アクション: 落下
  drop: () => {
    console.log('drop called');
    const { currentPiece } = get();
    if (!currentPiece) return;
    // TODO: Phase 3で実装
  },

  // アクション: リセット
  reset: () => {
    console.log('reset called');
    set({
      grid: createEmptyGrid(),
      currentPiece: createRandomTetromino(getInitialPosition()),
      isGameOver: false,
      isPaused: false,
    });
  },
}));

