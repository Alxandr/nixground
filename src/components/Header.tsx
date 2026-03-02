import type { ReactNode } from "react";

import { Link } from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type HeaderProps = {
	sidebar?: boolean;
	children?: ReactNode;
};

export function Header({ sidebar, children }: HeaderProps) {
	return (
		<header className="bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-20 flex h-(--header-height) shrink-0 items-center gap-2 border-b backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				{sidebar ? (
					<>
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mx-2" />
					</>
				) : null}
				<Link to="/" search={{ upload: false, tags: {} }} className="text-base font-medium">
					NixGround
				</Link>
				{children}
			</div>
		</header>
	);
}

type HeaderActionsProps = {
	children?: ReactNode;
};

export function HeaderActions({ children }: HeaderActionsProps) {
	return <div className="ml-auto flex items-center gap-2">{children}</div>;
}
