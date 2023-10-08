import * as THREE from "three";
export class Scene {
  scene!: THREE.Scene;
  constructor() {
    this.scene = new THREE.Scene();
    // 添加世界坐标原点
    this.scene.add(this.getAxes());
  }
  getAxes() {
    const axes = new THREE.AxesHelper(5);
    return axes;
  }
}
