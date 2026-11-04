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

## Releases

Pull requests, merge queue entries and main changes run CI on GitHub-hosted
runners. After main validation succeeds, a GitHub App commits the next version
to `package.json` and creates its matching SemVer tag. Do not edit the root
package version manually. Tag creation starts the GitHub Packages publishing
workflow; this repository does not publish to npmjs.org.

Before enabling releases, configure fork-run approval, required CI checks,
GitHub Packages access, and the release App's branch and tag protection
bypasses. Disable the old Tekton publisher at cutover. If publishing fails,
rerun the tag workflow against the same tag; it verifies the release commit and
the package version before publishing.

## License

BSD-3-Clause
