export class Vec3 {
  value: [number, number, number];

  constructor();
  constructor(e0: number, e1: number, e2: number);
  constructor(e0?: number, e1?: number, e2?: number) {
    this.value = [e0 || 0, e1 || 0, e2 || 0];
  }

  x(): number {
    return this.value[0];
  }
  y(): number {
    return this.value[1];
  }
  z(): number {
    return this.value[2];
  }

  negate(): Vec3 {
    return new Vec3(-this.value[0], -this.value[1], -this.value[2]);
  }
  get(i: number): number {
    return this.value[i];
  }
  set(i: number, value: number): void {
    this.value[i] = value;
  }

  add(v: Vec3): Vec3 {
    this.value[0] += v.value[0];
    this.value[1] += v.value[1];
    this.value[2] += v.value[2];
    return this;
  }

  multiply(t: number): Vec3 {
    this.value[0] *= t;
    this.value[1] *= t;
    this.value[2] *= t;
    return this;
  }

  divide(t: number): Vec3 {
    return this.multiply(1 / t);
  }

  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared(): number {
    return (
      this.value[0] * this.value[0] +
      this.value[1] * this.value[1] +
      this.value[2] * this.value[2]
    );
  }
}

// Point3 is just an alias for Vec3, but useful for geometric clarity in the code.
export type Point3 = Vec3;
export const Point = Vec3;

// Vector Utility Functions
export function toString(v: Vec3): string {
  return `${v.value[0]} ${v.value[1]} ${v.value[2]}`;
}

export function add(u: Vec3, v: Vec3): Vec3 {
  return new Vec3(
    u.value[0] + v.value[0],
    u.value[1] + v.value[1],
    u.value[2] + v.value[2]
  );
}

export function subtract(u: Vec3, v: Vec3): Vec3 {
  return new Vec3(
    u.value[0] - v.value[0],
    u.value[1] - v.value[1],
    u.value[2] - v.value[2]
  );
}

export function multiply(u: Vec3, v: Vec3): Vec3;
export function multiply(t: number, v: Vec3): Vec3;
export function multiply(v: Vec3, t: number): Vec3;
export function multiply(a: Vec3 | number, b: Vec3 | number): Vec3 {
  if (typeof a === "number" && b instanceof Vec3) {
    return new Vec3(a * b.value[0], a * b.value[1], a * b.value[2]);
  } else if (a instanceof Vec3 && typeof b === "number") {
    return multiply(b, a);
  } else if (a instanceof Vec3 && b instanceof Vec3) {
    return new Vec3(
      a.value[0] * b.value[0],
      a.value[1] * b.value[1],
      a.value[2] * b.value[2]
    );
  }
  throw new Error("Invalid arguments for multiply function");
}

export function divide(v: Vec3, t: number): Vec3 {
  return multiply(1 / t, v);
}

export function dot(u: Vec3, v: Vec3): number {
  return (
    u.value[0] * v.value[0] + u.value[1] * v.value[1] + u.value[2] * v.value[2]
  );
}

export function cross(u: Vec3, v: Vec3): Vec3 {
  return new Vec3(
    u.value[1] * v.value[2] - u.value[2] * v.value[1],
    u.value[2] * v.value[0] - u.value[0] * v.value[2],
    u.value[0] * v.value[1] - u.value[1] * v.value[0]
  );
}

export function unitVector(v: Vec3): Vec3 {
  return divide(v, v.length());
}

// Color utility functions
export const Color = Vec3;
export type Color = Vec3;

export function clamp_color(vec3: Vec3): Color {
  const [x, y, z] = vec3.value;
  const [r, g, b] = [
    Math.floor(255.999 * x),
    Math.floor(255.999 * y),
    Math.floor(255.999 * z),
  ];
  return new Vec3(r, g, b);
}

clamp_color(new Color(0.25, 0.5, 1));
