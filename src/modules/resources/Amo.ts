import Model from "../Model";
import ammo from "ammojs-typed";
import THREE from "three";
// Cannot read properties of undefined (reading 'Ammo') 报错解决
const Ammo = ammo.bind(window);

export class Amo {
  Ammo!: typeof ammo;
  model!: Model;
  physicsWorld!: ammo.btDiscreteDynamicsWorld;
  rigidBodies: THREE.Object3D[] = [];
  transformAux1!: ammo.btTransform;
  constructor() {
    this.model = new Model();
    this.init();
  }
  init() {
    return Ammo(Ammo).then(() => {
      this.Ammo = Ammo;
      this.physicsWorld = this.initAmmojs();
      this.transformAux1 = new Ammo.btTransform();
    });
  }
  // 初始化场景
  initAmmojs() {
    const collisitionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    const dispatcher = new Ammo.btCollisionDispatcher(collisitionConfiguration);
    const broadphase = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    const physicsWorld = new Ammo.btDiscreteDynamicsWorld(
      dispatcher,
      broadphase,
      solver,
      collisitionConfiguration
    );
    physicsWorld.setGravity(new Ammo.btVector3(0, -9.8, 0));
    return physicsWorld;
  }
  generatorRigidBody(
    threeObject: THREE.Object3D,
    pos: THREE.Vector3,
    quat: THREE.Quaternion
  ) {
    threeObject.position.copy(pos);
    threeObject.quaternion.copy(quat);
  }
  // 场景更新
  update() {
    this.physicsWorld.stepSimulation(1);
    for (let i = 0; i < this.rigidBodies.length; i++) {
      const objThree = this.rigidBodies[i];
      const objPhys = objThree.userData.physicsBody;
      const ms = objPhys.getMotionState();
      if (ms) {
        ms.getWorldTransform(this.transformAux1);
        const p = this.transformAux1.getOrigin();
        const q = this.transformAux1.getRotation();
        objThree.position.set(p.x(), p.y(), p.z());
        objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
      }
    }
  }
}
