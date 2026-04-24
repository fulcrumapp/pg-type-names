# @fulcrumapp/pg-type-names

Return the data type names given postgres OIDs. This module provides simple lookup tables for OID → typename.

## Installation

```sh
npm install @fulcrumapp/pg-type-names
```

## Example

```ts
import pgTypeNames from '@fulcrumapp/pg-type-names';

console.log(pgTypeNames.names[20]);
// bigint

console.log(pgTypeNames.oids['bigint']);
// 20

console.log(pgTypeNames.descriptions['bigint']);
// ~18 digit integer, 8-byte storage
```

## API

### `pgTypeNames.names`

A `Record<number, string>` mapping OIDs to type names.

### `pgTypeNames.oids`

A `Record<string, number>` mapping type names to OIDs.

### `pgTypeNames.descriptions`

A `Record<string, string>` mapping type names to their descriptions.

## Development

```sh
npm install
npm run build
npm test
npm run lint
npm run validate
```

## License

BSD-3-Clause
