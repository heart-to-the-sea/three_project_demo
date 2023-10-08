import * as THREE from "three";
import Model from "../Model";
import ammo from "ammojs-typed";
import fs from "./glsl/box.fs";
import vs from "./glsl/box.vs";
import gsap from "gsap";
export class Box {
  Ammo!: typeof ammo;
  box!: THREE.Mesh;
  pointBox!: THREE.Points;
  constructor() {
    const model = new Model();
    this.Ammo = model.ammo.Ammo;

    this.box = this.getBox();
    model.scene.scene.add(this.box);
    this.pointBox = this.getPointBox();
    model.scene.scene.add(this.pointBox);
  }
  getBox() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.ShaderMaterial({
      fragmentShader: fs,
      vertexShader: vs,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }
  getPointBox() {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
    const material = new THREE.PointsMaterial({ color: 0x00c4c4, size: 0.1 });
    const mesh = new THREE.Points(geometry, material);
    return mesh;
  }
  toAmmo(obj: THREE.Mesh) {
    const shape = new this.Ammo.btBoxShape(
      new this.Ammo.btVector3(0.5, 0.5, 0.5)
    );
    shape.setMargin(0.05);
    return this.createRightBody(
      obj,
      shape,
      new THREE.Vector3(0, 0, 0),
      new THREE.Quaternion(0, 0, 0, 1)
    );
  }
  createRightBody(
    threeObj: THREE.Mesh,
    shape: ammo.btBoxShape,
    pos: THREE.Vector3,
    quat: THREE.Quaternion
  ) {
    threeObj.position.copy(pos);
    threeObj.quaternion.copy(quat);

    const transform = new this.Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new this.Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(
      new this.Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w)
    );
    const motionState = new this.Ammo.btDefaultMotionState();

    const localInterial = new this.Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(35, localInterial);

    const rbInfo = new this.Ammo.btRigidBodyConstructionInfo(
      35,
      motionState,
      shape,
      localInterial
    );

    const body = new this.Ammo.btRigidBody(rbInfo);
    threeObj.userData.physicsBody = body;
    body.setActivationState(4);
    return threeObj;
  }
  getHelper(mesh: THREE.Mesh) {
    return new THREE.BoxHelper(mesh);
  }
  update() {
    if (this.pointBox) {
      this.pointBox.quaternion.w += 0.1;
    }
  }
}
