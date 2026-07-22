import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const fail = (message) => {
  console.error(`Validation failed: ${message}`);
  process.exitCode = 1;
};

const html = read("index.html");
const app = read("app.js");

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicateIds.length) fail(`duplicate HTML ids: ${duplicateIds.join(", ")}`);

const tabs = [...html.matchAll(/class="[^"]*\btab-btn\b[^"]*"[^>]*data-tab="([^"]+)"/g)]
  .map((match) => match[1]);
const missingSections = tabs.filter((tab) => !ids.includes(`tab-${tab}`));
if (missingSections.length) fail(`tabs without matching content: ${missingSections.join(", ")}`);

const requiredHeadContent = [
  'name="description"',
  'rel="canonical"',
  'property="og:title"',
  'property="og:description"',
];
for (const marker of requiredHeadContent) {
  if (!html.includes(marker)) fail(`missing head metadata: ${marker}`);
}

for (const file of ["style.css", "app.js", "favicon.svg", "robots.txt", "sitemap.xml"]) {
  if (!fs.existsSync(path.join(root, file))) fail(`missing required file: ${file}`);
}

const quizCount = [...app.matchAll(/title:\s*"场景/g)].length;
if (quizCount < 25) fail(`expected at least 25 quiz scenarios, found ${quizCount}`);

if (!process.exitCode) {
  console.log(`Validation passed: ${ids.length} unique ids, ${tabs.length} tabs, ${quizCount} quizzes.`);
}
