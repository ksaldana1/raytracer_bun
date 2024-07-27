import { Vec3, clamp_color } from "./vec3";

type Dimensions = [width: number, height: number];

const buildPPM = (dimensions: Dimensions): string => {
  const [width, height] = dimensions;
  const headers = `P3
${width} ${height}
255`;

  const colors = new Array(height)
    .fill(true)
    .map((_, rowIndex) => {
      console.log(`Scalines remaining ${height - rowIndex}`);
      return new Array(width)
        .fill(true)
        .map((_, columnIndex) => {
          const vec3 = new Vec3(
            columnIndex / (width - 1),
            rowIndex / (height - 1),
            0
          );
          const [r, g, b] = clamp_color(vec3).value;
          return `${r} ${g} ${b}`;
        })
        .join(" ");
    })
    .join("\n");
  console.log("Done.");
  return `${headers}\n${colors}`;
};

Bun.write("image.ppm", buildPPM([255, 255]));
