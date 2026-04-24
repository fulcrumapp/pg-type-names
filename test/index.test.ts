import pgTypeNames from '../src/index.js';

describe('postgres type names', () => {
  describe('names', () => {
    it('returns the name given a type oid', () => {
      expect(pgTypeNames.names[20]).toBe('bigint');
    });

    it('returns undefined for an unknown oid', () => {
      expect(pgTypeNames.names[999999]).toBeUndefined();
    });

    it('maps all known oids to string names', () => {
      for (const [oid, name] of Object.entries(pgTypeNames.names)) {
        expect(typeof Number(oid)).toBe('number');
        expect(Number.isFinite(Number(oid))).toBe(true);
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(0);
      }
    });
  });

  describe('oids', () => {
    it('returns the oid given a type name', () => {
      expect(pgTypeNames.oids['bigint']).toBe(20);
    });

    it('returns undefined for an unknown type name', () => {
      expect(pgTypeNames.oids['nonexistent_type']).toBeUndefined();
    });

    it('maps all known names to numeric oids', () => {
      for (const [name, oid] of Object.entries(pgTypeNames.oids)) {
        expect(typeof name).toBe('string');
        expect(typeof oid).toBe('number');
        expect(Number.isFinite(oid)).toBe(true);
      }
    });
  });

  describe('descriptions', () => {
    it('returns the type description given a type name', () => {
      expect(pgTypeNames.descriptions['bigint']).toBe(
        '~18 digit integer, 8-byte storage',
      );
    });

    it('returns undefined for an unknown type name', () => {
      expect(pgTypeNames.descriptions['nonexistent_type']).toBeUndefined();
    });

    it('all descriptions are strings', () => {
      for (const desc of Object.values(pgTypeNames.descriptions)) {
        expect(typeof desc).toBe('string');
      }
    });
  });

  describe('consistency', () => {
    it('names and oids are inverse lookups', () => {
      for (const [oid, name] of Object.entries(pgTypeNames.names)) {
        expect(pgTypeNames.oids[name]).toBe(Number(oid));
      }
    });

    it('every named type has a description entry', () => {
      for (const name of Object.values(pgTypeNames.names)) {
        expect(pgTypeNames.descriptions).toHaveProperty(name);
      }
    });

    it('contains expected common postgres types', () => {
      const expectedTypes = [
        'boolean',
        'integer',
        'bigint',
        'text',
        'json',
        'jsonb',
        'uuid',
        'date',
        'timestamp without time zone',
        'timestamp with time zone',
        'numeric',
        'real',
        'double precision',
      ];

      for (const typeName of expectedTypes) {
        expect(pgTypeNames.oids[typeName]).toBeDefined();
        expect(typeof pgTypeNames.oids[typeName]).toBe('number');
      }
    });
  });

  describe('edge cases', () => {
    it('handles array type names', () => {
      expect(pgTypeNames.oids['integer[]']).toBeDefined();
      expect(pgTypeNames.oids['text[]']).toBeDefined();
    });

    it('handles quoted type names', () => {
      expect(pgTypeNames.oids['"char"']).toBeDefined();
    });

    it('exports a frozen-shape object with names, oids, and descriptions', () => {
      expect(pgTypeNames).toHaveProperty('names');
      expect(pgTypeNames).toHaveProperty('oids');
      expect(pgTypeNames).toHaveProperty('descriptions');
      expect(Object.keys(pgTypeNames).sort()).toEqual(
        ['descriptions', 'names', 'oids'],
      );
    });
  });
});
