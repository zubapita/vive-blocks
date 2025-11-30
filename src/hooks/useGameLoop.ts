import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

/**
 * ゲームループを管理するフック
 * 一定間隔でdropアクションを呼び出す
 */
export function useGameLoop(): void {
  const drop = useGameStore((state) => state.drop);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const isPaused = useGameStore((state) => state.isPaused);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // ゲームオーバー時や一時停止時はループを止める
    if (isGameOver || isPaused) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // ゲームループを開始（1000ms間隔）
    intervalRef.current = window.setInterval(() => {
      drop();
    }, 1000);

    // クリーンアップ
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [drop, isGameOver, isPaused]);
}

