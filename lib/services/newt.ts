import "server-only";
import type { Article } from "@/types/article";
import type { Tag } from "@/types/tag";
import { createClient } from "newt-client-js";
import { cache } from "react";

type NewtArticle = {
	_id: string;
	_sys: {
		createdAt: string;
	};
	title: string;
	slug: string;
	body: string;
	bodyMd?: string;
	meta: {
		description: string;
	};
	tags: NewtTag[];
};

type NewtTag = {
	_id: string;
	_sys: {
		createdAt: string;
	};
	name: string;
	slug: string;
};

const client = createClient({
	spaceUid: process.env.NEWT_SPACE_UID ?? "",
	token: process.env.NEWT_CDN_API_TOKEN ?? "",
	apiType: "cdn",
});

const getApp = cache(async () => {
	const app = await client.getApp({
		appUid: "blog",
	});
	return app;
});

const getArticles = cache(async () => {
	const { items } = await client.getContents<NewtArticle>({
		appUid: "blog",
		modelUid: "article",
		query: {
			select: ["_id", "_sys", "title", "slug", "body", "meta"],
		},
	});
	return items.map((item: NewtArticle) => ({
		id: item._id,
		sys: item._sys,
		title: item.title,
		slug: item.slug,
		body: item.body,
		bodyMd: item.bodyMd || "",
		meta: item.meta,
		tags: item.tags,
	}));
});

const getArticleBySlug = cache(async (slug: string) => {
	const article = await client.getFirstContent<NewtArticle>({
		appUid: "blog",
		modelUid: "article",
		query: {
			slug,
			select: ["_id", "_sys", "title", "slug", "body", "tags", "meta"],
		},
	});
	if (!article) return null;

	return {
		id: article._id,
		sys: article._sys,
		title: article.title,
		slug: article.slug,
		body: article.body,
		bodyMd: article.bodyMd || "",
		tags: article.tags,
		meta: article.meta,
	};
});

const getTagBySlug = cache(async (slug: string) => {
	const tag = await client.getFirstContent<NewtTag>({
		appUid: "blog",
		modelUid: "tag",
		query: {
			slug,
			select: ["_id", "_sys", "name", "slug"],
		},
	});
	if (!tag) return null;
	return {
		id: tag._id,
		sys: tag._sys,
		name: tag.name,
		slug: tag.slug,
	};
});

const getArticlesByTagId = cache(async (tagId: string) => {
	const { items } = await client.getContents<NewtArticle>({
		appUid: "blog",
		modelUid: "article",
		query: {
			select: ["_id", "_sys", "title", "slug"],
			tags: {
				in: [tagId],
			},
			order: ["-_sys.createdAt"],
		},
	});
	return items.map((item: NewtArticle) => ({
		id: item._id,
		sys: item._sys,
		title: item.title,
		slug: item.slug,
		body: item.body,
		bodyMd: item.bodyMd || "",
		tags: item.tags,
		meta: item.meta,
	}));
});

const getPast3Articles = cache(async (article: NewtArticle) => {
	const { items } = await client.getContents<NewtArticle>({
		appUid: "blog",
		modelUid: "article",
		query: {
			select: ["_id", "_sys", "title", "slug", "body"],
			"_sys.createdAt": {
				lt: article._sys.createdAt,
			},
			order: ["-_sys.createdAt"],
		},
	});
	return items
		.map((item: NewtArticle) => ({
			id: item._id,
			sys: item._sys,
			title: item.title,
			slug: item.slug,
			body: item.body,
			bodyMd: item.bodyMd || "",
			tags: item.tags,
			meta: item.meta,
		}))
		.slice(0, 3);
});

const getTags = cache(async () => {
	const { items } = await client.getContents<NewtTag>({
		appUid: "blog",
		modelUid: "tag",
		query: {
			select: ["_id", "_sys", "name", "slug"],
			order: ["-_sys.customOrder"],
		},
	});
	return items.map((item: NewtTag) => ({
		id: item._id,
		sys: item._sys,
		name: item.name,
		slug: item.slug,
	}));
});

export default {
	getApp,
	getArticles,
	getArticleBySlug,
	getTagBySlug,
	getArticlesByTagId,
	getPast3Articles,
	getTags,
};
