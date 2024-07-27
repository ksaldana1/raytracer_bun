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
          const [r, g, b] = [
            columnIndex / (width - 1),
            rowIndex / (height - 1),
            0,
          ];
          return `${r * 255.999} ${g * 255.999} ${b * 255.999}`;
        })
        .join(" ");
    })
    .join("\n");
  console.log("Done.");
  return `${headers}\n${colors}`;
};

Bun.write("image.ppm", buildPPM([255, 255]));
