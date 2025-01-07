import * as constants from "./constants"

export const preload = () => {
  // Add your preload code here
};

export const setup = () => {
  p.createCanvas(constants.width, constants.height)
  p.pixelDensity(1)
  p.frameRate(constants.frameRate)
  // 中央揃えのモードに設定
  p.rectMode(p.CENTER)
  p.textAlign(p.CENTER, p.CENTER)
  resize()
};

export const draw = () => {
  p.background(constants.black)

  // 中心に白い箱
  p.fill(constants.white)
  p.rect(constants.width / 2, constants.height / 2, 200, 200)

  // 箱の中に文字を表示
  p.fill(constants.black)
  p.textSize(32)
  p.text("Hello World", constants.width / 2, constants.height / 2)
};

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
