import { readFileSync, writeFileSync, mkdirSync, cpSync } from "fs";
import { join } from "path";

const DIST = "dist";

// Ensure dist directory exists
mkdirSync(join(DIST, "css"), { recursive: true });
mkdirSync(join(DIST, "js"), { recursive: true });

// ===== Minify CSS =====
const css = readFileSync("src/css/style.css", "utf-8");
const minifiedCSS = css
  .replace(/\/\*[\s\S]*?\*\//g, "")   // remove comments
  .replace(/\s+/g, " ")               // collapse whitespace
  .replace(/\s*([{}:;,>~+])\s*/g, "$1") // remove space around symbols
  .replace(/;}/g, "}")                // remove last semicolon before }
  .trim();

writeFileSync(join(DIST, "css", "style.min.css"), minifiedCSS);
console.log(`✓ CSS minified: ${css.length} → ${minifiedCSS.length} bytes`);

// ===== Bundle & Minify JS =====
const buildResult = await Bun.build({
  entrypoints: ["src/js/main.js"],
  outdir: join(DIST, "js"),
  minify: true,
  naming: "[dir]/main.min.[ext]",
});

if (!buildResult.success) {
  console.error("JS build failed:", buildResult.logs);
  process.exit(1);
}

for (const output of buildResult.outputs) {
  console.log(`✓ JS minified: ${output.path} (${output.size} bytes)`);
}

// ===== Process HTML — rewrite asset paths to minified versions =====
let html = readFileSync("index.html", "utf-8");
html = html.replace('src/css/style.css', 'css/style.min.css');
html = html.replace('src/js/main.js', 'js/main.min.js');

// Basic HTML minification
const minifiedHTML = html
  .replace(/<!--[\s\S]*?-->/g, "")     // remove comments
  .replace(/\n\s*/g, "\n")             // collapse indentation
  .replace(/\n+/g, "\n")              // collapse blank lines
  .trim();

writeFileSync(join(DIST, "index.html"), minifiedHTML);
console.log(`✓ HTML minified: ${html.length} → ${minifiedHTML.length} bytes`);

console.log(`\n🎉 Build complete! Output in ./${DIST}/`);
