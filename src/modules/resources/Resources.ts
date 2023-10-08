import { Box } from "./Box";
import { BufferPointsBox } from "./BufferPointsBox";

export class Resources {
  box!: Box;
  pointBox!: BufferPointsBox;
  constructor() {
    // this.box = new Box();
    this.pointBox = new BufferPointsBox();
  }
  update() {
    // this.box.update();
    this.pointBox.update();
  }
}
