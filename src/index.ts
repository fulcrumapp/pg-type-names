import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface TypeEntry {
  oid: number;
  name: string;
  description: string;
}

export interface PgTypeNames {
  names: Record<number, string>;
  oids: Record<string, number>;
  descriptions: Record<string, string>;
}

const __dirname = dirname(fileURLToPath(import.meta.url));

const raw: TypeEntry[] = JSON.parse(
  readFileSync(join(__dirname, 'types.json'), 'utf-8'),
);

const names: Record<number, string> = {};
const oids: Record<string, number> = {};
const descriptions: Record<string, string> = {};

for (const type of raw) {
  names[type.oid] = type.name;
  oids[type.name] = type.oid;
  descriptions[type.name] = type.description;
}

const api: PgTypeNames = { names, oids, descriptions };

export default api;
