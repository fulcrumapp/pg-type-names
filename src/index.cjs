const { createRequire } = require('node:module');
const { join } = require('node:path');

const raw = require(join(__dirname, 'types.json'));

const names = {};
const oids = {};
const descriptions = {};

for (const type of raw) {
  names[type.oid] = type.name;
  oids[type.name] = type.oid;
  descriptions[type.name] = type.description;
}

const api = { names, oids, descriptions };

module.exports = api;
