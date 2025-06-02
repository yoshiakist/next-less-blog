import type { Sys } from "@/types/sys";
import type { Tag } from "@/types/tag";

export interface Article {
	id: string;
	sys: Sys;
	title: string;
	slug: string;
	body: string;
	bodyMd: string;
	tags: Tag[];
	meta: {
		description: string;
	};
}
