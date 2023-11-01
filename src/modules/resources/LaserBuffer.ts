import Model from "../Model";
import * as THREE from "three";
import LaserParty, { Laser } from "./three-laser-party";
export class LaserBuffer {
  model!: Model;
  constructor() {
    this.model = new Model();
    const laser = new Laser({ raycastOnce: false });

    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0x00c4c4 })
    );
    mesh.position.setZ(100);
    this.model.scene.scene.add(laser);
    this.model.scene.scene.add(mesh);
    laser.raycast.once();
    laser.raycast.add(mesh);
    LaserParty.raycast.addGlobal(mesh);

    this.model.scene.scene.add(new THREE.AmbientLight());
  }
}
