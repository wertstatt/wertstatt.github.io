# Wertstatt Interactive Brand Style Guide

This folder contains the first interactive EN/DE style guide for Wertstatt.

Published URL:

https://wertstatt.github.io/

## Open

Open `index.html` in a browser. For browser-generated PNG and favicon exports, use a local server if direct file opening blocks local SVG loading.

Example:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080` from this folder.

## Structure

- `index.html` - interactive guide.
- `styles.css` - visual system and responsive layout.
- `script.js` - language toggle, copy buttons, navigation state, PNG/favicon generator.
- `assets/logos/svg` - approved SVG logo assets.
- `assets/logos/display` - non-redrawn SVG copies with cropped viewBox for web display.
- `assets/fonts` - Metropolis font files and SIL Open Font License.
- `downloads/logos` - downloadable SVG master files.
- `downloads/logos-trimmed` - non-redrawn SVG copies with cropped viewBox for practical web placement.
- `downloads/fonts` - Metropolis ZIP.
- `downloads/favicon` - generated favicon SVG, PNG sizes and ICO.

## Notes

The logo has not been redrawn. All displayed logo files are copied from the approved source assets.
