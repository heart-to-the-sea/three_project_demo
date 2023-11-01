/// <reference types="vite/client" />
declare module "*.vs" {
  const src: string;
  export default src;
}

declare module "*.fs" {
  const src: string;
  export default src;
}

module "oimo" {
  export class World {
    constructor(any);
    step();
    add(any);
  }
}
