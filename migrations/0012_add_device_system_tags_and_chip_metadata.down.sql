PRAGMA foreign_keys = OFF;

DELETE FROM image_tags
WHERE tag_slug IN ('device/desktop', 'device/mobile');

DELETE FROM tags
WHERE slug IN ('device/desktop', 'device/mobile');

DELETE FROM tag_kinds
WHERE slug = 'device';

CREATE TABLE tags_new (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    kind_slug TEXT NOT NULL REFERENCES tag_kinds (slug) ON DELETE RESTRICT,
    system INTEGER NOT NULL DEFAULT 0
);

INSERT INTO tags_new (slug, name, kind_slug, system)
SELECT
    slug,
    name,
    kind_slug,
    system
FROM tags;

DROP TABLE tags;
ALTER TABLE tags_new RENAME TO tags;

CREATE INDEX idx_tags_name ON tags (name);
CREATE INDEX idx_tags_kind ON tags (kind_slug);

PRAGMA foreign_keys = ON;
