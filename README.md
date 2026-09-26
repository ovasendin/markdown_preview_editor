<div align="center">

# Markdown Preview Editor

**A self-hosted Markdown editor and live previewer where your documents never leave the browser.**

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Tracking: none](https://img.shields.io/badge/tracking-none-brightgreen.svg)
![Static site](https://img.shields.io/badge/hosting-any%20static%20host-informational.svg)

![Screenshot](.github/screenshot.png)

</div>

A static website you host yourself. Everything is processed locally in the browser: there is no backend, no analytics and no CDN. A strict Content-Security-Policy forbids the page from sending data anywhere.

## Features

- Live preview with synchronized scrolling, light and dark themes, mobile layout.
- GitHub-flavored Markdown, code highlighting, math (KaTeX) and diagrams (Mermaid).
- Drag & drop onto the editor: several files, whole folders, images dropped together with a document.
- Formatting toolbar with a collapsible *Advanced editor* row.
- Save as `.md`, export to self-contained HTML, print or save as PDF.

## Privacy & safety

- The rendered document is shown in a sandboxed frame where scripts cannot run, and it is sanitized with DOMPurify.
- **Full protection** is on by default: external images, media and links are not loaded or followed. You can allow them one by one.
- Allowed links and media go through a lightweight offline check that flags phishing tricks, look-alike domains, executables and local-network addresses. It is a set of heuristics, not an antivirus.

## License

[MIT](LICENSE)
