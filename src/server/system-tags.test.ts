import { describe, expect, it } from "bun:test";

import { resolveSystemTagsForImage } from "./system-tags";

function image(widthPx: number, heightPx: number, sizeBytes = 1024) {
	return { widthPx, heightPx, sizeBytes };
}

describe("system tag resolution", () => {
	it("assigns resolution/4k for exact 4K 16:9", () => {
		expect(resolveSystemTagsForImage(image(3840, 2160))).toEqual([
			"resolution/4k",
			"aspect-ratio/16-9",
			"device/desktop",
		]);
	});

	it("assigns resolution/4k for larger exact 16:9 resolutions", () => {
		expect(resolveSystemTagsForImage(image(7680, 4320))).toEqual([
			"resolution/4k",
			"aspect-ratio/16-9",
			"device/desktop",
		]);
	});

	it("does not assign resolution/4k when below minimum dimensions", () => {
		expect(resolveSystemTagsForImage(image(2560, 1440))).toEqual([
			"aspect-ratio/16-9",
			"device/desktop",
		]);
	});

	it("assigns resolution/4k for non-16:9 when dimensions meet minimum", () => {
		expect(resolveSystemTagsForImage(image(4096, 2160))).toEqual([
			"resolution/4k",
			"device/desktop",
		]);
	});

	it("assigns resolution/4k for 16:10 when dimensions meet minimum", () => {
		expect(resolveSystemTagsForImage(image(3840, 2400))).toEqual([
			"resolution/4k",
			"aspect-ratio/16-10",
			"device/desktop",
		]);
	});

	it("does not assign resolution/4k when either dimension is below minimum", () => {
		expect(resolveSystemTagsForImage(image(3839, 2160))).toEqual(["device/desktop"]);
		expect(resolveSystemTagsForImage(image(3840, 2159))).toEqual(["device/desktop"]);
	});

	it("assigns aspect-ratio/16-9 for matching ratios", () => {
		expect(resolveSystemTagsForImage(image(1920, 1080))).toEqual([
			"aspect-ratio/16-9",
			"device/desktop",
		]);
	});

	it("assigns aspect-ratio/16-10 for matching ratios", () => {
		expect(resolveSystemTagsForImage(image(2560, 1600))).toEqual([
			"aspect-ratio/16-10",
			"device/desktop",
		]);
	});

	it("assigns device/mobile for portrait images", () => {
		expect(resolveSystemTagsForImage(image(1080, 1920))).toEqual(["device/mobile"]);
	});

	it("requires at least 4:3 ratio for device/desktop", () => {
		expect(resolveSystemTagsForImage(image(1024, 768))).toContain("device/desktop");
		expect(resolveSystemTagsForImage(image(1000, 800))).not.toContain("device/desktop");
	});

	it("requires at least 4:3 inverse ratio for device/mobile", () => {
		expect(resolveSystemTagsForImage(image(768, 1024))).toContain("device/mobile");
		expect(resolveSystemTagsForImage(image(800, 1000))).not.toContain("device/mobile");
	});

	it("does not assign aspect-ratio tags for non-matching ratios", () => {
		expect(resolveSystemTagsForImage(image(1000, 1000))).toEqual([]);
	});
});
