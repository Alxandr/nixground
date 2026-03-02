ALTER TABLE tags ADD COLUMN chip_label TEXT;
ALTER TABLE tags ADD COLUMN chip_icon TEXT;

INSERT OR IGNORE INTO tag_kinds (slug, name, system_only)
VALUES ('device', 'Device', 1);

INSERT OR IGNORE INTO tags (slug, name, kind_slug, system, chip_icon)
VALUES ('device/desktop', 'Desktop', 'device', 1, 'device-desktop');

INSERT OR IGNORE INTO tags (slug, name, kind_slug, system, chip_icon)
VALUES ('device/mobile', 'Mobile', 'device', 1, 'device-mobile');
