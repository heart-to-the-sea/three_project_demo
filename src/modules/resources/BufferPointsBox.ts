import * as THREE from "three";
import Model from "../Model";

export class BufferPointsBox {
  model!: Model;
  alpha = 1;
  box!: THREE.Group;
  constructor() {
    this.model = new Model();
    this.box = this.getBox();
    this.model.scene.scene.add(this.box);
  }
  private getBox() {
    const sg = new THREE.SphereGeometry(5, 10, 10, 10);
    console.log(sg.getAttribute("position").array.length);
    const group = new THREE.Group();
    const geometry = new THREE.BufferGeometry();
    const partices = 50000;

    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    const color = new THREE.Color();

    const n = 1,
      n2 = n / 2;

    for (let i = 0; i < partices; i++) {
      const x = Math.random() * n - n2;
      const y = Math.random() * n - n2;
      const z = Math.random() * n - n2;

      positions.push(x, y, z);

      const vx = x / n + 0.5;
      const vy = y / n + 0.5;
      const vz = z / n + 0.5;

      color.setRGB(vx, vy, vz, THREE.SRGBColorSpace);
      colors.push(color.r, color.g, color.b, this.alpha);

      const size = Math.random() * 0.5;
      sizes.push(size);
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 4));
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
    geometry.computeBoundingSphere();
    geometry.computeVertexNormals();
    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
    });
    const points = new THREE.Points(geometry, material);
    group.add(points);
    // group.add(
    //   new THREE.Line(
    //     geometry,
    //     new THREE.LineBasicMaterial({ linewidth: 2, color: 0x00ffff11 })
    //   )
    // );
    return group;
  }

  update() {
    // this.box.rotateY(+0.001);
  }
}
