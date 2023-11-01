import * as THREE from "three";
import Model from "../../Model";
const LIGHT = 2;
const NUMBER = 7;
const THICKNESS = LIGHT / NUMBER;

export class GuttingPlane {
  model!: Model;
  constructor() {
    this.model = new Model();
    this.addLight();
    this.addObject();
    this.addFloor();
  }
  addObject() {
    // const geometry = new THREE.BoxGeometry(1, 1, 1, 1);
    // const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
    // const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.setY(0.5);
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
    // this.model.scene.scene.add(mesh);

    const ribbons: Ribbon[] = [];
    for (let i = 0; i < NUMBER; i++) {
      const ribbon = new Ribbon();
      ribbons.push(ribbon);
      ribbon.mesh.position.x = i*0.2855;
      ribbon.mesh.position.y = 0.5;
      this.model.scene.scene.add(ribbon.mesh);
    }
  }
  addFloor() {
    const geometry = new THREE.PlaneGeometry(30, 30, 100, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(-Math.PI / 2);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.model.scene.scene.add(mesh);
  }
  addLight() {
    const light1 = new THREE.AmbientLight(0xffffff, 1);
    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(1, 0, 0.866);
    light2.castShadow = true; // 开启阴影
    light2.shadow.mapSize.width = 4096;
    light2.shadow.mapSize.height = 4096;
    light2.shadow.camera.near = 0.1;
    light2.shadow.camera.far = 10;
    light2.shadow.camera.top = 2;
    light2.shadow.camera.bottom = -2;
    light2.shadow.camera.left = -2;
    light2.shadow.camera.right = 2;
    light2.shadow.bias = 0.0001;
    this.model.scene.scene.add(light2);
    this.model.scene.scene.add(light1);
  }
  update() {}
}
class Ribbon {
  mesh: THREE.Mesh;
  constructor() {
    const geometry = new THREE.PlaneGeometry(THICKNESS, LIGHT, 1, 10).rotateX(
      Math.PI / 2
    );
    const material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      color: 0xff0000,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.mesh = mesh;
  }
}
