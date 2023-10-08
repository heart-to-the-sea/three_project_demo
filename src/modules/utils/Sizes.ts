import { EventEmitter } from "events";
export class Sizes extends EventEmitter {
  width = 0;
  height = 0;
  aspect = 1;
  pexeRatio = 1;
  constructor() {
    super();
    this.init();
    window.addEventListener("resize", () => {
      this.init();
      this.emit("resize");
    });
  }
  init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pexeRatio = Math.min(window.devicePixelRatio, 2);
  }
}
