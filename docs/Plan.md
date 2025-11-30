# Project Context
We are building a web-based falling block puzzle game.
The goal is to start with a solid logic foundation and progressively make the UI/UX richer.

# Tech Stack
- Runtime: React (Vite)
- Language: TypeScript (Strict mode)
- State Management: Zustand
- Styling: Tailwind CSS
- Animation: Framer Motion
- Icons: Lucide React

# Directory Structure (Strict Enforcement)
Follow this structure for all new files. Do not create separate CSS files; use Tailwind.

/src
  /components     # UI Components (View only)
    - Board.tsx
    - Cell.tsx
    - Controls.tsx
    - ScoreBoard.tsx
    - NextPiece.tsx
  /hooks          # React Hooks
    - useGameLoop.ts  # Handles requestAnimationFrame
  /store          # State Management (Logic center)
    - gameStore.ts    # Zustand store containing ALL game state & actions
  /types          # Type Definitions
    - game.ts         # Shared types (Grid, Tetromino, GameState)
  /utils          # Pure functions & Constants
    - pieces.ts       # Tetromino shapes & color definitions
    - collision.ts    # Collision detection logic

# Coding Guidelines

## TypeScript
- Always use strict typing. Avoid `any`.
- Define shared types in `src/types/game.ts` first, then import them.
- Use explicit return types for complex functions.

## State Management (Zustand)
- **Separation of Concerns:** The React components should ONLY handle rendering and user input.
- ALL game logic (movement, rotation, line clearing, score calculation) must reside in `src/store/gameStore.ts`.
- Components should subscribe to the store state to react to changes.

## Styling (Tailwind CSS)
- Use mobile-first responsive design classes.
- Use distinct colors for different Tetromino types defined in `src/utils/pieces.ts`.
- Ensure high contrast for readability.

## Game Logic Rules
- **Grid:** 0-indexed, typically 20 rows x 10 columns.
- **Coordinates:** {x: 0, y: 0} is Top-Left. x increases right, y increases down.
- **Piece Definitions:** Strictly use `src/utils/pieces.ts` for shape data.

## Animation
- Use `Framer Motion` for UI transitions (e.g., line clears, game over modal).
- Keep animations performant (avoid layout trashing).

# Development Workflow (Vibe Coding)
- [Phase 0] 初期化
- [Phase 1] TypeScriptの型定義とZustandストアの実装
- [Phase 2] React + Tailwindによる盤面描画
- [Phase 3] Framer Motionによるアニメーション追加
- [Phase 4] ゲームオーバー処理とリトライ機能

## [Phase 0] 初期化

```
git pull origin main

npm create vite@latest . -- --template react-ts
npm install
npm install zustand framer-motion lucide-react clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```


## Phase 1: 「見えないテトリス」を作る（ロジック構築）
まずはUIを無視して、TypeScriptでゲームのルールだけを作ります。

プロンプト案:

```
Phase 1の実装を開始します。

src/types/game.ts を作成し、盤面(Grid)、テトリミノ(Tetromino)、GameStateの型定義を行ってください。

src/utils/pieces.ts を作成し、7種類のテトリミノの形状定義と、対応するTailwindの色クラス（v4標準パレット使用）を定義してください。

src/store/gameStore.ts を作成し、Zustandで以下の初期実装を行ってください。

20x10のグリッド管理（1次元配列ではなく2次元配列で）

現在のブロックの座標管理

moveLeft, moveRight, rotate, drop の空のアクション関数（中身はconsole.logでOK）

まだUIコンポーネントは作成しないでください。
```

## Phase 2: React + Tailwindによる盤面描画

ロジックを画面に繋ぎ込みます。

プロンプト案：

```
Phase 2の実装を開始します。 以下のUIコンポーネントを作成し、src/App.tsx で表示できるようにしてください。

src/components/Cell.tsx:

1つのブロックを表示するコンポーネント。

引数（Props）で type (テトリミノの種類) を受け取る。

src/utils/pieces.ts の getTetrominoColor を使って、Tailwind v4のクラスで色をつける。

何もない場合（type=0）は、薄いグレーの背景にする。

src/components/Board.tsx:

useGameStore から grid (盤面データ) を取得する。

grid をmap関数で展開し、20x10個の Cell コンポーネントを配置する。

CSS Grid または Flexbox を使ってきれいに並べる。

src/App.tsx:

画面全体をダークモード（暗い背景）にする。

中央に Board を配置する。

タイトル「TETRIS (Vibe Coding)」を表示する。

※ まだブロックは落ちてきませんが、空のグリッド（20x10）が画面に描画されればOKです。
```

## Phase 3: Framer Motionによるアニメーション追加

Reactでゲームを作る最大のメリットがこれです。DOM操作ベースのアニメーションライブラリ Framer Motion を使います。

プロンプト案：

```
Phase 3の実装を開始します。 ゲームのコアロジックとループ処理を実装してください。

src/utils/collision.ts:

isValidPosition 関数を実装してください。

盤面外への飛び出しや、他のブロックとの衝突を判定します。

src/store/gameStore.ts:

Phase 1で作った空のアクション（moveLeft, moveRight, rotate, drop）の中身を実装してください。

すべての操作で isValidPosition を使い、移動不可能な場合は何もしないようにします。

drop アクションで下に移動できない場合（着地）は、その位置にブロックを固定（盤面に書き込み）し、新しいブロックをスポーンさせてください。

行が揃った場合の「ライン消去」処理も実装してください。

src/hooks/useGameLoop.ts:

setInterval または requestAnimationFrame を使い、一定間隔（例: 1000ms）でストアの drop アクションを呼び出すフックを作成してください。

ゲームオーバー時や一時停止時はループを止めてください。

src/App.tsx (または新しい Controls.tsx):

useEffect を使い、キーボード操作（矢印キー）を受け付けてストアのアクションを呼び出すようにしてください。

useGameLoop を実行してゲームを開始してください。

実装後、ブラウザでブロックが落下し、矢印キーで操作できることを確認したいです。
```



## Phase 4: ゲームオーバー処理とリトライ機能

Phase 4では、ゲームを「ただ動くプログラム」から**「完成された製品」**に仕上げます。具体的には、以下の要素を追加します。

- ゲームオーバー画面とリトライ機能
- スコア計算と表示
- 次のブロック（Next Piece）の表示
- 全体のレイアウト調整（メイン画面の横に情報を表示）

プロンプト案：

```
Phase 4（UIの仕上げとゲームサイクルの完成）の実装を行います。

1. src/store/gameStore.ts の更新:

stateに score (number), nextPiece (Tetromino), isGameOver (boolean) を追加してください。

drop アクション内で、ライン消去時にスコアを加算してください（例: 1列100点, 4列同時なら800点など）。

drop アクション内で、ブロックが固定されたら nextPiece を currentPiece に昇格させ、新しい nextPiece を生成してください。

resetGame アクションを実装し、盤面、スコア、ゲームオーバー状態を初期化してください。

ゲームオーバー時は isGameOver を true にし、操作を受け付けないようにしてください。

2. 新規コンポーネントの作成:

src/components/ScoreBoard.tsx: 現在のスコアとレベル（あれば）を表示するカッコいいパネルを作成してください。

src/components/NextPiece.tsx: nextPiece の形状を4x4のグリッドで表示するコンポーネントを作成してください。

src/components/GameOverModal.tsx: isGameOver が true の時だけ表示されるモーダルを作成してください。Framer Motionを使って「ふわっ」と表示させ、「Try Again」ボタンで resetGame を呼び出してください。

3. src/App.tsx のレイアウト更新:

画面レイアウトを「左側にゲーム盤面」「右側に情報パネル（Next, Score, 操作説明）」の2カラム構成（スマホでは縦積み）に変更してください。

GameOverModal を配置してください。

全体的に Tailwind CSS でダークテーマでモダンな見た目（少しサイバーパンク風など）に整えてください。

実装後、ゲームオーバーからリトライまでの一連の流れが機能するようにしてください。
```
