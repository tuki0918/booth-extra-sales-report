import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version, description } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name:
    env.mode === "staging"
      ? "[INTERNAL] BOOTH Extra Sales Report"
      : "BOOTH Extra Sales Report",
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  // https://developer.chrome.com/docs/extensions/mv3/manifest/
  description,
  icons: {
    "16": "src/assets/icon-16.png",
    "32": "src/assets/icon-32.png",
    "48": "src/assets/icon-48.png",
    "128": "src/assets/icon-128.png",
  },
  permissions: ["activeTab", "scripting"],
  action: {
    default_popup: "src/index.html",
  },
  content_scripts: [
    {
      matches: ["https://manage.booth.pm/sales/daily/recent"],
      js: ["src/content/index.tsx"],
    },
  ],
  background: {
    service_worker: "src/background/index.ts",
  },
}));
