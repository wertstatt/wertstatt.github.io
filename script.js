const logoDownloads = [
  {
    title: "Vertical Combination",
    titleDe: "Vertikale Kombination",
    file: "Vertical Combination.svg",
    recommended: "Primary logo",
    recommendedDe: "Primaerlogo",
  },
  {
    title: "Horizontal Combination",
    titleDe: "Horizontale Kombination",
    file: "Horizontal Combination.svg",
    recommended: "Digital default",
    recommendedDe: "Digitaler Standard",
  },
  {
    title: "Icon only",
    titleDe: "Nur Zeichen",
    file: "Icon only (The 'W' mark).svg",
    recommended: "Favicon, avatar, small UI",
    recommendedDe: "Favicon, Avatar, kleine UI",
  },
  {
    title: "Wordmark only",
    titleDe: "Nur Wortmarke",
    file: "Wordmark only WERTSTATT.svg",
    recommended: "Compact brand name",
    recommendedDe: "Kompakter Markenname",
  },
  {
    title: "Gold wordmark",
    titleDe: "Goldene Wortmarke",
    file: "Wordmark only WERTSTATT gold.svg",
    recommended: "Premium accent use",
    recommendedDe: "Premium-Akzent",
  },
  {
    title: "Split gold wordmark",
    titleDe: "Geteilte Gold-Wortmarke",
    file: "Wordmark only WERTSTATT gold 2.svg",
    recommended: "Display use only",
    recommendedDe: "Nur Display-Nutzung",
  },
  {
    title: "Vertical Combination Invert",
    titleDe: "Vertikale Kombination invertiert",
    file: "Vertical Combination invert.svg",
    recommended: "Conditional dark mode",
    recommendedDe: "Bedingter Dark Mode",
    dark: true,
  },
  {
    title: "Horizontal Combination Invert",
    titleDe: "Horizontale Kombination invertiert",
    file: "Horizontal Combination invert.svg",
    recommended: "Conditional dark mode",
    recommendedDe: "Bedingter Dark Mode",
    dark: true,
  },
  {
    title: "Wordmark Invert",
    titleDe: "Wortmarke invertiert",
    file: "Wordmark only WERTSTATT invert.svg",
    recommended: "Conditional dark mode",
    recommendedDe: "Bedingter Dark Mode",
    dark: true,
  },
  {
    title: "Vertical Combination Invert Line",
    titleDe: "Vertikale Kombination invertiert Line",
    file: "Vertical Combination invert line.svg",
    recommended: "Preferred dark-mode prototype",
    recommendedDe: "Bevorzugter Dark-Mode-Prototyp",
    dark: true,
  },
  {
    title: "Horizontal Combination Invert Line",
    titleDe: "Horizontale Kombination invertiert Line",
    file: "Horizontal Combination invert line.svg",
    recommended: "Preferred dark-mode prototype",
    recommendedDe: "Bevorzugter Dark-Mode-Prototyp",
    dark: true,
  },
  {
    title: "Icon Invert Line",
    titleDe: "Zeichen invertiert Line",
    file: "Icon only (The 'W' mark) invert line.svg",
    recommended: "Dark UI icon, signage, compact use",
    recommendedDe: "Dark-UI-Zeichen, Schild, kompakte Nutzung",
    dark: true,
  },
  {
    title: "Wordmark Invert Line",
    titleDe: "Wortmarke invertiert Line",
    file: "Wordmark only WERTSTATT invert line.svg",
    recommended: "Dark-mode wordmark",
    recommendedDe: "Dark-Mode-Wortmarke",
    dark: true,
  },
  {
    title: "Wordmark Invert Line 2",
    titleDe: "Wortmarke invertiert Line 2",
    file: "Wordmark only WERTSTATT invert line 2.svg",
    recommended: "Dark-mode wordmark variant",
    recommendedDe: "Dark-Mode-Wortmarkenvariante",
    dark: true,
  },
  {
    title: "Gold Wordmark Invert Line",
    titleDe: "Goldene Wortmarke invertiert Line",
    file: "Wordmark only WERTSTATT gold invert line.svg",
    recommended: "Dark premium accent use",
    recommendedDe: "Dunkler Premium-Akzent",
    dark: true,
  },
];

const toast = document.querySelector("[data-toast]");
const languageButtons = document.querySelectorAll("[data-set-language]");
const themeButtons = document.querySelectorAll("[data-set-theme]");
const logoThemeImages = document.querySelectorAll("[data-logo-light][data-logo-dark]");
const navLinks = document.querySelectorAll(".sidebar__nav a");

function currentLanguage() {
  return document.documentElement.dataset.language || "en";
}

function showToast(en, de = en) {
  toast.textContent = currentLanguage() === "de" ? de : en;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 1900);
}

async function copyToClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);
    showToast("Copied", "Kopiert");
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = value;
    document.body.append(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
    showToast("Copied", "Kopiert");
  }
}

document.addEventListener("click", (event) => {
  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) {
    copyToClipboard(copyButton.dataset.copy);
  }
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.dataset.setLanguage;
    document.documentElement.dataset.language = lang;
    document.documentElement.lang = lang;
    languageButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    showToast(lang === "de" ? "Deutsch aktiviert" : "English enabled", "Deutsch aktiviert");
  });
});

function setThemePreview(theme, announce = true) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.themePreview = nextTheme;
  themeButtons.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.setTheme === nextTheme);
  });
  logoThemeImages.forEach((image) => {
    image.src = image.dataset[nextTheme === "dark" ? "logoDark" : "logoLight"];
  });

  try {
    localStorage.setItem("wertstatt-theme-preview", nextTheme);
  } catch {
    // File previews can disable storage; the toggle should still work.
  }

  if (announce) {
    showToast(
      nextTheme === "dark" ? "Dark preview enabled" : "Light preview enabled",
      nextTheme === "dark" ? "Dark Preview aktiviert" : "Light Preview aktiviert",
    );
  }
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => setThemePreview(button.dataset.setTheme));
});

try {
  const storedTheme = localStorage.getItem("wertstatt-theme-preview");
  if (storedTheme) {
    setThemePreview(storedTheme, false);
  }
} catch {
  setThemePreview("light", false);
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-30% 0px -55% 0px", threshold: [0.2, 0.45, 0.7] },
);

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

function pathForLogo(file) {
  return `assets/logos/display/${file}`;
}

function downloadPathForLogo(file) {
  return `downloads/logos/${file}`;
}

function cleanFileName(value) {
  return value
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildDownloads() {
  const grid = document.querySelector("[data-downloads-grid]");
  grid.innerHTML = logoDownloads
    .map((item) => {
      const path = pathForLogo(item.file);
      const downloadPath = downloadPathForLogo(item.file);
      const cleanName = `wertstatt-${cleanFileName(item.title)}`;
      const darkClass = item.dark ? " download-card__preview--dark" : "";
      const actions = item.raster
        ? `<a class="button button--small" href="${downloadPath}" download>JPG</a>`
        : `
              <a class="button button--small" href="${downloadPath}" download>SVG</a>
              <button
                class="button button--small button--ghost"
                type="button"
                data-export-png="${path}"
                data-export-name="${cleanName}"
              >
                PNG
              </button>
            `;

      return `
        <article class="download-card">
          <div class="download-card__preview${darkClass}">
            <img src="${path}" alt="${item.title}" />
          </div>
          <div>
            <h3>
              <span data-lang="en">${item.title}</span>
              <span data-lang="de">${item.titleDe}</span>
            </h3>
            <p>
              <span data-lang="en">${item.recommended}</span>
              <span data-lang="de">${item.recommendedDe}</span>
            </p>
            <div class="download-card__actions">
              ${actions}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

buildDownloads();

async function fetchSvgMarkup(svgPath) {
  const response = await fetch(svgPath);
  if (!response.ok) {
    throw new Error(`Cannot load ${svgPath}`);
  }
  return response.text();
}

function svgMarkupToImage(svgMarkup) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const blob = new Blob([svgMarkup], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("SVG image could not be rendered"));
    };
    image.src = url;
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function exportSvgAsPng(svgPath, fileName, requestedSize) {
  const svgMarkup = await fetchSvgMarkup(svgPath);
  const image = await svgMarkupToImage(svgMarkup);
  const size = Number(requestedSize) || Math.max(image.naturalWidth, image.naturalHeight, 1600);
  const ratio = image.naturalWidth / image.naturalHeight || 1;
  const width = ratio >= 1 ? size : Math.round(size * ratio);
  const height = ratio >= 1 ? Math.round(size / ratio) : size;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  canvas.toBlob((blob) => {
    if (!blob) {
      showToast("PNG export failed", "PNG-Export fehlgeschlagen");
      return;
    }
    downloadBlob(blob, `${fileName}.png`);
    showToast("PNG generated", "PNG generiert");
  }, "image/png");
}

function writeUint16(view, offset, value) {
  view.setUint16(offset, value, true);
}

function writeUint32(view, offset, value) {
  view.setUint32(offset, value, true);
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

async function buildFavicon(svgPath) {
  const svgMarkup = await fetchSvgMarkup(svgPath);
  const image = await svgMarkupToImage(svgMarkup);
  const sizes = [16, 32, 48, 64, 128, 256];
  const pngBuffers = [];

  for (const size of sizes) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, size, size);
    context.drawImage(image, 0, 0, size, size);
    const blob = await canvasToBlob(canvas);
    pngBuffers.push({ size, buffer: await blob.arrayBuffer() });
  }

  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + entrySize * pngBuffers.length;
  const totalSize = offset + pngBuffers.reduce((sum, item) => sum + item.buffer.byteLength, 0);
  const ico = new ArrayBuffer(totalSize);
  const view = new DataView(ico);

  writeUint16(view, 0, 0);
  writeUint16(view, 2, 1);
  writeUint16(view, 4, pngBuffers.length);

  pngBuffers.forEach((item, index) => {
    const entryOffset = headerSize + index * entrySize;
    view.setUint8(entryOffset, item.size === 256 ? 0 : item.size);
    view.setUint8(entryOffset + 1, item.size === 256 ? 0 : item.size);
    view.setUint8(entryOffset + 2, 0);
    view.setUint8(entryOffset + 3, 0);
    writeUint16(view, entryOffset + 4, 1);
    writeUint16(view, entryOffset + 6, 32);
    writeUint32(view, entryOffset + 8, item.buffer.byteLength);
    writeUint32(view, entryOffset + 12, offset);
    new Uint8Array(ico, offset, item.buffer.byteLength).set(new Uint8Array(item.buffer));
    offset += item.buffer.byteLength;
  });

  downloadBlob(new Blob([ico], { type: "image/x-icon" }), "favicon.ico");
  showToast("favicon.ico generated", "favicon.ico generiert");
}

document.addEventListener("click", async (event) => {
  const pngButton = event.target.closest("[data-export-png]");
  if (pngButton) {
    try {
      await exportSvgAsPng(
        pngButton.dataset.exportPng,
        pngButton.dataset.exportName || "wertstatt-logo",
        pngButton.dataset.exportSize,
      );
    } catch (error) {
      console.error(error);
      showToast(
        "Open via a local server to generate PNG",
        "Fuer PNG-Export ueber lokalen Server oeffnen",
      );
    }
  }

  const faviconButton = event.target.closest("[data-export-favicon]");
  if (faviconButton) {
    try {
      await buildFavicon(faviconButton.dataset.exportFavicon);
    } catch (error) {
      console.error(error);
      showToast(
        "Open via a local server to generate favicon",
        "Fuer Favicon-Export ueber lokalen Server oeffnen",
      );
    }
  }
});
