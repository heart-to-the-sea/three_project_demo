import { Box } from "./Box";
import { BufferPointsBox } from "./BufferPointsBox";
import { GuttingPlane } from "./GuttingPlane";
import AudioBufferGeometry from "./audioBuffer/AudioBuffer";
import { TestMouseModelPoint } from "./testMouseModelPoint/testMouseModelPoint";
// import { LaserBuffer } from "./LaserBuffer";
// import { OimoWork } from "./oimoWork/OimoWork";
// import { PhaserBuffer } from "./phaserCeBUffer/PhaserBuffer";

export class Resources {
  box!: Box;
  pointBox!: BufferPointsBox;
  guttingPlane!: GuttingPlane;
  audioBuffer!:AudioBufferGeometry
  // oimoWork: OimoWork;
  // phaserBuffer!: PhaserBuffer;
  // laser;
  constructor() {
    // this.box = new Box();
    // this.pointBox = new BufferPointsBox();
    // this.guttingPlane = new GuttingPlane()
    // this.oimoWork = new OimoWork();
    // this.laser = new LaserBuffer();
    // this.phaserBuffer = new PhaserBuffer();
    // this.audioBuffer=new AudioBufferGeometry()
    new TestMouseModelPoint()
  }
  update() {
    // this.box.update();
    // this.pointBox.update();
    // this.guttingPlane.update()
    // this.oimoWork.update();
    // this.phaserBuffer.update();
    // this.audioBuffer.update()
  }
}
