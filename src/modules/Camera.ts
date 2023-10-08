import * as THREE from "three";
import Model from "./Model";
export class Camera {
  model!: Model;
  camera!: THREE.PerspectiveCamera;
  constructor() {
    this.model = new Model();
    console.log(this.model.sizes);
    this.camera = this.getCamera();
    this.model.scene.scene.add(this.camera);
  }
  getCamera() {
    const camera = new THREE.PerspectiveCamera(
      45,
      this.model.sizes.aspect,
      0.001,
      1000
    );
    camera.position.set(2, 2, 2);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
  }
  resize() {
    this.camera.aspect = this.model.sizes.aspect;
    this.camera.updateProjectionMatrix();
  }
}
