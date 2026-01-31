import { useCallback, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

/**
 * スマホ用ゲームコントローラー
 * タッチ操作でブロックを操作するためのボタンUI
 */
export function MobileController() {
  const moveLeft = useGameStore((state) => state.moveLeft);
  const moveRight = useGameStore((state) => state.moveRight);
  const rotate = useGameStore((state) => state.rotate);
  const drop = useGameStore((state) => state.drop);
  const isGameOver = useGameStore((state) => state.isGameOver);

  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // 長押しリピート処理を開始
  const startRepeat = useCallback((action: () => void) => {
    if (isGameOver) return;
    action();
    // 最初の長押し判定まで少し待つ
    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        action();
      }, 80);
    }, 200);
  }, [isGameOver]);

  // 長押しリピート処理を停止
  const stopRepeat = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 単発アクション（回転など）
  const handleAction = useCallback((action: () => void) => {
    if (isGameOver) return;
    action();
  }, [isGameOver]);

  // ボタン共通のタッチイベントハンドラ（長押しリピート対応）
  const repeatHandlers = useCallback((action: () => void) => ({
    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault();
      startRepeat(action);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault();
      stopRepeat();
    },
    onTouchCancel: () => {
      stopRepeat();
    },
    // マウス操作もサポート（デバッグ用）
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault();
      startRepeat(action);
    },
    onMouseUp: () => {
      stopRepeat();
    },
    onMouseLeave: () => {
      stopRepeat();
    },
  }), [startRepeat, stopRepeat]);

  // 単発タッチイベントハンドラ
  const singleHandlers = useCallback((action: () => void) => ({
    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault();
      handleAction(action);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault();
    },
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault();
      handleAction(action);
    },
  }), [handleAction]);

  const buttonBase =
    'select-none touch-none rounded-xl font-bold text-white active:scale-95 active:brightness-110 transition-transform duration-75 flex items-center justify-center';

  return (
    <div className="w-full max-w-xs mx-auto mt-4 select-none touch-none">
      {/* 上段: 回転ボタン */}
      <div className="flex justify-center mb-3">
        <button
          type="button"
          className={`${buttonBase} w-16 h-16 bg-purple-600 text-2xl`}
          {...singleHandlers(rotate)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6" />
            <path d="M21.34 13.72A9 9 0 1 1 18.57 5.06L21.5 8" />
          </svg>
        </button>
      </div>

      {/* 下段: 左・落下・右 */}
      <div className="flex justify-center items-center gap-3">
        {/* 左移動 */}
        <button
          type="button"
          className={`${buttonBase} w-20 h-20 bg-blue-600 text-3xl`}
          {...repeatHandlers(moveLeft)}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* 落下 */}
        <button
          type="button"
          className={`${buttonBase} w-20 h-20 bg-orange-600 text-3xl`}
          {...repeatHandlers(drop)}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="M19 12l-7 7-7-7" />
          </svg>
        </button>

        {/* 右移動 */}
        <button
          type="button"
          className={`${buttonBase} w-20 h-20 bg-blue-600 text-3xl`}
          {...repeatHandlers(moveRight)}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
