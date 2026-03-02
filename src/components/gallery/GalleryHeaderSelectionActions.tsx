import { IconEdit } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

type GalleryHeaderSelectionActionsProps = {
	selectedImages: number;
	onBulkEdit: () => void;
	onClearSelection: () => void;
};

export function GalleryHeaderSelectionActions({
	selectedImages,
	onBulkEdit,
	onClearSelection,
}: GalleryHeaderSelectionActionsProps) {
	if (selectedImages <= 0) {
		return null;
	}

	return (
		<div className="flex items-center gap-2">
			<p className="text-muted-foreground text-sm">{selectedImages} selected</p>
			<Button variant="secondary" size="icon-sm" onClick={onBulkEdit}>
				<IconEdit />
				<span className="sr-only">Bulk edit selected images</span>
			</Button>
			<Button variant="outline" size="sm" onClick={onClearSelection}>
				Clear
			</Button>
		</div>
	);
}
