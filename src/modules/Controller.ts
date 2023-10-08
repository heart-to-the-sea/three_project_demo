import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";

export class Controller {
  renderer!: Renderer;
  constroller: OrbitControls;
  constructor(camera: Camera, renderer: Renderer) {
    this.constroller = new OrbitControls(
      camera.camera,
      renderer.renderer.domElement
    );
    this.renderer = renderer;
  }
  update() {
    this.constroller.update();
    this.renderer.update();
  }
}
