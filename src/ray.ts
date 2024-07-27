import { Vec3, type Point3 } from "./vec3";

export class Ray {
  private _origin: Vec3;
  private _direction: Vec3;

  constructor();
  constructor(origin: Point3, direction: Vec3);
  constructor(origin?: Point3, direction?: Vec3) {
    this._origin = origin ?? new Vec3(0, 0, 0);
    this._direction = direction ?? new Vec3(0, 0, 0);
  }

  get origin(): Point3 {
    return this._origin;
  }

  get direction(): Vec3 {
    return this._direction;
  }

  at(distance: number): Point3 {
    return this._origin.add(this._direction.multiply(distance));
  }
}
