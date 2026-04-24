import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(readFileSync(join(__dirname, 'types.json'), 'utf-8'));
const names = {};
const oids = {};
const descriptions = {};
for (const type of raw) {
    names[type.oid] = type.name;
    oids[type.name] = type.oid;
    descriptions[type.name] = type.description;
}
const api = { names, oids, descriptions };
export default api;
//# sourceMappingURL=index.js.map