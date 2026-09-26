export const SAMPLE_NAME = 'Welcome.md';

export const SAMPLE = `# Markdown Preview Editor

A **Markdown** editor and previewer that works *only inside your browser*.
Documents are never sent anywhere — not to this site, not to anyone else.

> [!TIP]
> Drop a \`.md\` file, several files or a whole folder onto the **left half of the window** — they open in tabs.
> Images dropped together with a document are picked up automatically.

## Features

- [x] Live preview and synchronized scrolling
- [x] Tables, task lists, footnotes[^1], ==highlight==, H~2~O and x^2^
- [x] Code highlighting, math and diagrams
- [ ] Sending your data anywhere — **never**

| Mode | External links | External images |
| :--- | :---: | :---: |
| Full protection | inactive | not loaded |
| With permissions | checked | checked |

## Code

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Math

Euler's identity: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Diagrams

\`\`\`mermaid
flowchart LR
    A[.md file] --> B(Browser)
    B --> C{External resources?}
    C -->|Full protection| D[Blocked]
    C -->|Allowed| E[Threat check]
\`\`\`

## Protection in action

This image lives on an external server, so it is not loaded in *Full protection* mode:

![External image](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

This link stays inactive until "Allow links" is enabled: [CommonMark](https://commonmark.org/).

And this link is suspicious — its text shows one address but it leads to another: [https://bank.example.com](https://bank-example.xyz/login).

---

Shortcuts: <kbd>Ctrl</kbd>+<kbd>B</kbd> bold, <kbd>Ctrl</kbd>+<kbd>I</kbd> italic, <kbd>Ctrl</kbd>+<kbd>K</kbd> link, <kbd>Ctrl</kbd>+<kbd>S</kbd> save, <kbd>Ctrl</kbd>+<kbd>O</kbd> open, <kbd>Ctrl</kbd>+<kbd>F</kbd> find.

[^1]: This is what a footnote looks like.
`;
