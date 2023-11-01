import Model from "../../Model";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
export default class AudioBufferGeometry {
  box: THREE.Group;
  scene!: THREE.Scene;
  constructor() {
    const model = new Model();
    const { scene } = model.scene;
    this.scene = scene;
    scene.add(this.getLine());
    this.box = this.getBox();
    scene.add(this.box);
    scene.add(this.getPlan());
  }
  getCanvasTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.fillStyle = "#ffffff";
    context.strokeRect(0, 0, 100, 100);
    return canvas;
  }

  getBox() {
    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry(1, 1, 1, 1);

    const material = new THREE.MeshPhysicalMaterial({
      thickness: 3.0,
      roughness: 0.1,
      clearcoat: 0.1,
      transmission: 0.99,
      ior: 1.1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    group.position.setZ(3);
    return group;
  }

  getPlan() {
    const group = new THREE.Group();
    const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      premultipliedAlpha: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;

    const reflector = new Reflector(geometry, {
      color: 0xffffff, // 反射面的颜色
      textureWidth: 5120, // 反射像素宽度
      textureHeight: 5120, // 反射像素高度
      clipBias: 0, // 裁剪偏移量
      shader: undefined, //
      encoding: THREE.sRGBEncoding, //
      multisample: 0,
    });
    reflector.castShadow = true;
    reflector.receiveShadow = true;
    group.add(reflector);

    // group.add(mesh);
    return group;
  }

  getLine() {
    const group = new THREE.Group();
    // const line = new THREE.PointLight(0xff0000, 1000);
    // line.position.setZ(5);
    // line.castShadow = true;
    // group.add(line);

    // group.add(new THREE.PointLightHelper(line));

    const spotLight = new THREE.SpotLight(0xffffff, 500);
    spotLight.position.set(10, 10, 10);
    spotLight.angle = 0.3;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.bias = -0.001;
    spotLight.shadow.radius = 20;
    spotLight.shadow.blurSamples = 10;
    spotLight.shadow.camera.far = 15;
    group.add(spotLight);
    this.scene.add(spotLight.shadow.camera);
    return group;
  }

  update() {
    this.box.rotateY(0.01);
  }
}
