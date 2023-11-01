import * as THREE from "three";
import Model from "../../Model";
import fs from "./glsl/box.fs";
import vs from "./glsl/box.vs";

export class TestMouseModelPoint {
  camera!: THREE.Camera;
  scene!: THREE.Scene;
  shader!: THREE.ShaderMaterial;
  point!: THREE.Vector3;
  constructor() {
    const model = new Model();
    const { scene } = model.scene;
    scene.add(this.getBox());
    this.camera = model.camera.camera;
    this.scene = scene;
    document.addEventListener("mousemove", (e) => this.handleClick(e));
  }
  getBox() {
    const group = new THREE.Group();
    const geometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_point: {
          value: new THREE.Vector3(0.5, 0.5, 0.5),
        },
        height: { value: 0.5 },
      },
      fragmentShader: fs,
      vertexShader: vs,
      side: THREE.DoubleSide,
    });
    this.shader = material;
    const mesh = new THREE.Points(geometry, material);
    group.add(mesh);
    return group;
  }
  handleClick(event: MouseEvent) {
    // 将坐标转化为 [-1,1]的元矩阵
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const instanceObj = raycaster.intersectObjects(this.scene.children, true);
    if (instanceObj[0]) {
      this.point = instanceObj[0].point;
      this.shader.uniforms.u_point.value = this.point;
      // console.log(this.point);
    }
  }
}
