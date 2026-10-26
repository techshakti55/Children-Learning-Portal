import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
await rm(`${root}dist`, { recursive: true, force: true });
await mkdir(`${root}dist`, { recursive: true });
await cp(`${root}index.html`, `${root}dist/index.html`);
await cp(`${root}src`, `${root}dist/src`, { recursive: true, filter: source => !source.endsWith('README.md') });
console.log('Built static UI in frontend/dist (no runtime dependencies).');
