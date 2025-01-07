import * as constants from "./constants"

const cols = constants.cols;
const rows = constants.rows;
let grid: number[][];
let next: number[][];
// 自動で動く点の位置
let autoPointX: number;
let autoPointY: number;

export const preload = () => {
  // Add your preload code here
};

export const setup = () => {
  p.createCanvas(constants.width, constants.height)
  grid = create2DArray(cols, rows);
  next = create2DArray(cols, rows);
  // 自動点の初期位置を真ん中に設定
  autoPointX = p.floor(cols / 2);
  autoPointY = p.floor(rows / 2);

  // 初期化
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y] = 0;
      next[x][y] = 0;
    }
  }

  p.pixelDensity(1)
  p.frameRate(constants.frameRate)
  resize()
};

export const draw = () => {
  p.background(0);

  // グリッドを表示
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let val = grid[x][y];
      p.fill(val * 255);
      p.noStroke();
      p.rect(x * constants.width / cols, y * constants.height / rows, constants.width / cols, constants.height / rows);
    }
  }

  // 次のステップを計算
  for (let x = 1; x < cols - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      next[x][y] = (
        grid[x - 1][y] +
        grid[x + 1][y] +
        grid[x][y - 1] +
        grid[x][y + 1]
      ) / 4; // 平均をとる
    }
  }

  // 反映
  let temp = grid;
  grid = next;
  next = temp;

  // 自動で値を加える
  grid[autoPointX][autoPointY] = 1;

  // 自動点を動かす
  autoPointX += p.floor(p.random(-1, 2)); // -1, 0, 1のいずれか
  autoPointY += p.floor(p.random(-1, 2));

  // 画面外に出ないように制限
  autoPointX = p.constrain(autoPointX, 0, cols - 20);
  autoPointY = p.constrain(autoPointY, 0, rows - 20);
}

export const resize = () => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement
  canvas.style.position = "absolute"
  canvas.style.top = "50%"
  canvas.style.left = "50%"
  const scale = Math.min(
    window.innerWidth / constants.width,
    window.innerHeight / constants.height
  )
  canvas.style.transform = `translate(-50%, -50%) scale(${scale})`
};

function create2DArray(cols: number, rows: number) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows).fill(0);
  }
  return arr;
}