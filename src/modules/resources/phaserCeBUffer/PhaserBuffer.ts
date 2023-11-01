import Model from "../../Model";

import Phaser from "phaser-ce";
export class PhaserBuffer {
  model: Model;
  constructor() {
    this.model = new Model();
    const world = new Phaser.World();
  }
  update() {}
}
