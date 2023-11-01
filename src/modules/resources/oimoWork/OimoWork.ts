import * as OIMO from "oimo";
import Model from "../../Model";
import * as THREE from "three";

export class OimoWork {
  model: Model;
  work: OIMO.World;
  groundBody: any;
  body: any;
  sphere!: any;
  constructor() {
    this.model = new Model();
    this.work = this.initWork();
    this.initModel();
  }
  initModel() {
    const groundBody = this.getGroundBody();
    const body = this.getBody();
    const sphere = this.getSphere();
    sphere.position.copy(body.getPosition());
    this.sphere = sphere;
    this.body = body;
    const plance = this.getPlance();
    plance.position.copy(groundBody.getPosition());
    this.model.scene.scene.add(plance);
    this.model.scene.scene.add(sphere);
  }
  initWork() {
    console.log("-->", OIMO);
    const work = new OIMO.World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
      worldscale: 1, // scale full world
      random: true, // randomize sample
      info: false, // calculate statistic or not
      gravity: [0, -9.8, 0],
    });
    console.log(work, OIMO);

    return work;
  }
  getGroundBody() {
    const groundBody = this.work.add({
      type: "box",
      size: [10000, 0.0000001, 10000],
      pos: [0, 0, 0],
      rot: [0, 0, 0],
      move: false, // 是否可移动
      density: 1, // 密度
      friction: 1, // 摩擦力
      restitution: 0.3, // 弹性
      belongsTo: 1,
    });
    return groundBody;
  }
  getBody() {
    const body = this.work.add(
      {
        type: "sphere",
        size: [10], // 半径
        pos: [0, 20, 0], // 位置
        rot: [0, 0, 0], // 旋转
        move: true, // 是否可移动
        density: 100, // 密度
        friction: 0.0002, // 摩擦力
        info: true,
        restitution: 3, // 弹性
        mass: 1,
        moment: 1,
        belongsTo: 1,
        collidesWith: 0xffffffff, // 0xffffffff
        // pos: [10, 10, 10],
      },
      true
    );
    // body.addForceListener((model: THREE.Mesh) => {
    //   console.log(model);
    // });
    return body;
  }
  getSphere() {
    const geometry = new THREE.SphereGeometry(10, 50, 50);
    const material = new THREE.LineBasicMaterial({
      color: 0xff0000,
    });
    const points = new THREE.Line(geometry, material);
    return points;
  }
  getPlance() {
    const planeGeometry = new THREE.PlaneGeometry(10000, 10000, 1, 1);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x44aa88,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    return plane;
  }
  update() {
    this.work.step();
    this.sphere.position.copy(this.body.getPosition());
    // console.log(this.body)
    this.sphere.quaternion.copy(this.body.getQuaternion());
  }
}
