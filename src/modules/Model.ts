import { Sizes } from "./utils/Sizes";
import { Times } from "./utils/Times";
import { Scene } from "./Scene";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { Resources } from "./resources/Resources";
import { Amo } from "./resources/Amo";
import { Controller } from "./Controller";
/**
 * 模型总入口
 */
export default class Model {
  static instance: Model;
  ammo!: Amo;
  sizes!: Sizes;
  scene!: Scene;
  times!: Times;
  camera!: Camera;
  renderer!: Renderer;
  resources!: Resources;
  controller!: Controller;
  box?: HTMLCanvasElement;
  constructor(canvas?: HTMLCanvasElement) {
    if (Model.instance) {
      return Model.instance;
    }
    Model.instance = this;
    if (canvas) {
      this.box = canvas;
    }
    console.log("init one");
    this.ammo = new Amo();
    this.ammo.init().then(() => {
      this.sizes = new Sizes();
      this.times = new Times();
      this.scene = new Scene();
      this.camera = new Camera();
      this.renderer = new Renderer();
      this.resources = new Resources();
      this.controller = new Controller(this.camera, this.renderer);
      this.sizes.on("resize", () => this.resize());
      this.times.on("update", () => this.update());
    });
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.box = canvas;
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.resources.update();
    this.controller.update();
    // this.renderer.update();
    // console.log("update");
  }
}
