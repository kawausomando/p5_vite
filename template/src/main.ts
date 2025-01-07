import { draw, setup, preload, resize } from "./visualizers/index";

window.onload = () => {
  // @ts-ignore
  new p5((p) => {
    // @ts-ignore
    window.p = p;
    p.preload = preload;
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  });
};
