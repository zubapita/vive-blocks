import { create } from 'zustand';
import type { Grid, Tetromino, Position, CellType } from '../types/game';
import { createRandomTetromino } from '../utils/pieces';
import { isValidPosition } from '../utils/collision';

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
  start: () => void;
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
  return { x: 3, y: -1 }; // 10列の中央付近（4列目から開始）、y=-1で上部から開始
}

/**
 * テトリミノを時計回りに90度回転させる
 */
function rotateTetromino(piece: Tetromino): Tetromino {
  const { shape } = piece;
  const rotated: boolean[][] = Array(4)
    .fill(null)
    .map(() => Array(4).fill(false));

  // 4x4の行列を時計回りに90度回転
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      rotated[col][3 - row] = shape[row][col];
    }
  }

  return {
    ...piece,
    shape: rotated,
  };
}

/**
 * テトリミノを盤面に固定する
 */
function lockPieceToGrid(grid: Grid, piece: Tetromino): Grid {
  const newGrid = grid.map((row) => [...row]);
  const { shape, position, type } = piece;

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (shape[row][col]) {
        const gridX = position.x + col;
        const gridY = position.y + row;

        if (gridY >= 0 && gridY < 20 && gridX >= 0 && gridX < 10) {
          newGrid[gridY][gridX] = type as CellType;
        }
      }
    }
  }

  return newGrid;
}

/**
 * 揃った行を削除する
 */
function clearLines(grid: Grid): { newGrid: Grid; linesCleared: number } {
  const newGrid: Grid = [];
  let linesCleared = 0;

  for (let row = 0; row < 20; row++) {
    const isFullLine = grid[row].every((cell) => cell !== 0);
    if (!isFullLine) {
      newGrid.push([...grid[row]]);
    } else {
      linesCleared++;
    }
  }

  // 削除した行数分、上部に空の行を追加
  while (newGrid.length < 20) {
    newGrid.unshift(Array(10).fill(0) as CellType[]);
  }

  return { newGrid, linesCleared };
}

/**
 * ゲームオーバーをチェックする
 */
function checkGameOver(grid: Grid, piece: Tetromino): boolean {
  // 新しいブロックが配置できない場合、ゲームオーバー
  return !isValidPosition(grid, piece, piece.position);
}

/**
 * Zustandゲームストア
 */
export const useGameStore = create<GameStore>((set, get) => ({
  // 初期状態
  grid: createEmptyGrid(),
  currentPiece: createRandomTetromino(getInitialPosition()),
  isGameOver: false,
  isPaused: false,

  // アクション: 左に移動
  moveLeft: () => {
    const { grid, currentPiece, isGameOver, isPaused } = get();
    if (!currentPiece || isGameOver || isPaused) return;

    const newPosition = { x: currentPiece.position.x - 1, y: currentPiece.position.y };
    if (isValidPosition(grid, currentPiece, newPosition)) {
      set({
        currentPiece: {
          ...currentPiece,
          position: newPosition,
        },
      });
    }
  },

  // アクション: 右に移動
  moveRight: () => {
    const { grid, currentPiece, isGameOver, isPaused } = get();
    if (!currentPiece || isGameOver || isPaused) return;

    const newPosition = { x: currentPiece.position.x + 1, y: currentPiece.position.y };
    if (isValidPosition(grid, currentPiece, newPosition)) {
      set({
        currentPiece: {
          ...currentPiece,
          position: newPosition,
        },
      });
    }
  },

  // アクション: 回転
  rotate: () => {
    const { grid, currentPiece, isGameOver, isPaused } = get();
    if (!currentPiece || isGameOver || isPaused) return;

    const rotated = rotateTetromino(currentPiece);
    if (isValidPosition(grid, rotated, rotated.position)) {
      set({ currentPiece: rotated });
    }
  },

  // アクション: 落下
  drop: () => {
    const { grid, currentPiece, isGameOver, isPaused } = get();
    if (!currentPiece || isGameOver || isPaused) return;

    const newPosition = { x: currentPiece.position.x, y: currentPiece.position.y + 1 };
    if (isValidPosition(grid, currentPiece, newPosition)) {
      // 下に移動可能
      set({
        currentPiece: {
          ...currentPiece,
          position: newPosition,
        },
      });
    } else {
      // 着地：ブロックを固定
      const newGrid = lockPieceToGrid(grid, currentPiece);
      const { newGrid: clearedGrid } = clearLines(newGrid);

      // 新しいブロックをスポーン
      const newPiece = createRandomTetromino(getInitialPosition());

      // ゲームオーバーチェック
      const gameOver = checkGameOver(clearedGrid, newPiece);

      set({
        grid: clearedGrid,
        currentPiece: gameOver ? null : newPiece,
        isGameOver: gameOver,
      });
    }
  },

  // アクション: リセット
  reset: () => {
    set({
      grid: createEmptyGrid(),
      currentPiece: createRandomTetromino(getInitialPosition()),
      isGameOver: false,
      isPaused: false,
    });
  },

  // アクション: ゲーム開始
  start: () => {
    const { currentPiece } = get();
    if (!currentPiece) {
      set({
        currentPiece: createRandomTetromino(getInitialPosition()),
        isGameOver: false,
        isPaused: false,
      });
    }
  },
}));
