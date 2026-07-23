const sharp = require("sharp");
const path = require("path");

const size = 256;
const radius = 56; // ~22% — matches the header logo's rounded-lg look

const mask = Buffer.from(
  `<svg width="${size}" height="${size}"><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`
);

sharp(path.join(__dirname, "..", "public", "logo.png"))
  .resize(size, size, { fit: "cover" })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toFile(path.join(__dirname, "..", "app", "icon.png"))
  .then(() => console.log("icon.png created"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
