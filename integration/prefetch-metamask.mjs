import https from "https";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// dappeteer's own downloader only reads page 1 (30 releases) of the GitHub API with no
// pagination, so an older pinned version falls off the list as MetaMask keeps shipping
// releases. Pre-populating dappeteer's cache directory here makes it skip that search
// entirely (it only searches when the extraction directory is missing).
const METAMASK_VERSION = "v10.31.0";
const CACHE_DIR = path.resolve("node_modules", ".cache", ".metamask");
const EXTRACT_DIR = path.resolve(CACHE_DIR, METAMASK_VERSION.replace(/\./g, "_"));
const DOWNLOAD_DIR = path.resolve(CACHE_DIR, "download");
const RELEASES_URL = "https://api.github.com/repos/metamask/metamask-extension/releases";
const MAX_PAGES = 10;

const getJson = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve(JSON.parse(body)));
      })
      .on("error", reject);
  });

const findChromeAssetUrl = async () => {
  for (let page = 1; page <= MAX_PAGES; page++) {
    const releases = await getJson(`${RELEASES_URL}?per_page=100&page=${page}`);
    if (!Array.isArray(releases) || releases.length === 0) break;

    const release = releases.find((r) => r.tag_name === METAMASK_VERSION);
    if (release) {
      const asset = release.assets.find((a) => a.name.startsWith("metamask-chrome-"));
      if (asset) return asset.browser_download_url;
    }
  }
  throw new Error(`Could not find MetaMask ${METAMASK_VERSION} chrome release asset`);
};

const download = (url, dest) =>
  new Promise((resolve, reject) => {
    const request = (requestUrl) =>
      https
        .get(requestUrl, (res) => {
          if (res.statusCode === 301 || res.statusCode === 302) {
            request(res.headers.location);
            return;
          }
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on("finish", () => file.close(resolve));
        })
        .on("error", reject);
    request(url);
  });

const main = async () => {
  if (fs.existsSync(EXTRACT_DIR)) {
    console.info(`MetaMask ${METAMASK_VERSION} already cached at ${EXTRACT_DIR}`);
    return;
  }

  console.info(`Searching MetaMask releases for ${METAMASK_VERSION}...`);
  const downloadUrl = await findChromeAssetUrl();

  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
  const zipPath = path.resolve(DOWNLOAD_DIR, `${METAMASK_VERSION}.zip`);
  console.info(`Downloading ${downloadUrl}`);
  await download(downloadUrl, zipPath);

  fs.mkdirSync(EXTRACT_DIR, { recursive: true });
  execSync(`unzip -q -o "${zipPath}" -d "${EXTRACT_DIR}"`);
  console.info(`Extracted MetaMask ${METAMASK_VERSION} to ${EXTRACT_DIR}`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
