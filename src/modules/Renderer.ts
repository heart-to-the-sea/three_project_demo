import * as THREE from "three";
import Model from "./Model";
export class Renderer {
  model!: Model;
  renderer!: THREE.WebGLRenderer;
  constructor() {
    this.model = new Model();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.model.box,
      alpha: true,
    });
    // this.renderer.setClearColor(0x101104);
    this.renderer.setSize(this.model.sizes.width, this.model.sizes.height);
    this.renderer.setPixelRatio(this.model.sizes.pexeRatio);
  }
  resize() {
    this.renderer.setSize(this.model.sizes.width, this.model.sizes.height);
    this.renderer.setPixelRatio(this.model.sizes.pexeRatio);
  }
  update() {
    this.renderer.render(this.model.scene.scene, this.model.camera.camera);
  }
}
