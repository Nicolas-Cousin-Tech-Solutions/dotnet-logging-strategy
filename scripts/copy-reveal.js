import fs from "fs";
import path from "path";

const src = "node_modules/reveal.js";
const dest = "docs/reveal";

const copy = (from, to) => {
  fs.mkdirSync(to, { recursive: true });
  for (const item of fs.readdirSync(from)) {
    const s = path.join(from, item);
    const d = path.join(to, item);
    fs.statSync(s).isDirectory() ? copy(s, d) : fs.copyFileSync(s, d);
  }
};

copy(src, dest);
console.log("Reveal.js copied to docs/reveal");
