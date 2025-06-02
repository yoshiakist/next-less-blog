import type { Article } from "@/types/article";
import type { Sys } from "@/types/sys";
import type { Tag } from "@/types/tag";
import { cache } from "react";

// モック用のSys生成関数
const createSys = (date: string, customOrder = 0): Sys => ({
	createdAt: date,
	updatedAt: date,
	customOrder,
	raw: {
		createdAt: date,
		updatedAt: date,
		firstPublishedAt: date,
		publishedAt: date,
	},
});

// MOCK_TAGS
export const MOCK_TAGS: Tag[] = [
	{
		id: "1",
		sys: createSys("2024-01-01T00:00:00Z", 1),
		name: "読書",
		slug: "reading",
	},
	{
		id: "2",
		sys: createSys("2024-01-02T00:00:00Z", 2),
		name: "web",
		slug: "web",
	},
	{
		id: "3",
		sys: createSys("2024-01-03T00:00:00Z", 3),
		name: "運動",
		slug: "fiftness",
	},
];

// MOCK_ARTICLES
export const MOCK_ARTICLES: Article[] = [
	{
		id: "a1",
		sys: createSys("2024-04-05T10:00:00Z", 1),
		title: "シンプルなエントリ",
		slug: "mock-article-simple-entry",
		body: `
      <p>The IndieWeb Movement とは、次のようなコンセプトの運動を指す。</p>
      <ul>
        <li>Owning your domain and using it as your primary identity</li>
        <li>Publishing on your site (Optionally Syndicating Elsewhere)</li>
        <li>Owning your data</li>
      </ul>
      <p>日本語でざっくり言えば、</p>
      <ul>
        <li>自分のドメインで</li>
        <li>自分のサイトを公開し</li>
        <li>自分の持つコンテンツを発信しろ</li>
      </ul>
      <p>ということだ。</p>
    `,
		tags: [MOCK_TAGS[0]],
		meta: { description: "シンプルなpタグのみの短いエントリ" },
		bodyMd: "",
	},
	{
		id: "a2",
		sys: createSys("2024-04-04T10:00:00Z", 2),
		title: "見出しとリスト",
		slug: "mock-article-heading-list",
		body: "<h2>セクションタイトル</h2><p>説明文</p><h3>小見出し</h3><ul><li>リスト1<ul><li>リスト1-1</li><li>リスト1-2</li></ul></li><li>リスト2</li></ul>",
		tags: [MOCK_TAGS[1]],
		meta: { description: "h2, h3, ul, liを含むエントリ" },
		bodyMd: "",
	},
	{
		id: "a3",
		sys: createSys("2024-04-03T10:00:00Z", 3),
		title: "引用と区切り",
		slug: "mock-article-blockquote-hr",
		body: "<blockquote><p>これは引用文です。</p></blockquote><p>引用文の後のテキスト。</p><hr><p>区切り線の後のテキスト。</p>",
		tags: [MOCK_TAGS[2]],
		meta: { description: "blockquoteとhrを含むエントリ" },
		bodyMd: "",
	},
	{
		id: "a4",
		sys: createSys("2024-04-02T10:00:00Z", 4),
		title: "他の記事へのリンク",
		slug: "mock-article-link-to-others",
		body: '<p>他の記事はこちら: <a href="/articles/mock-article-markdown-body">マークダウンもサポート</a></p>',
		bodyMd: "",
		tags: [MOCK_TAGS[0], MOCK_TAGS[1]],
		meta: { description: "他の記事へのリンクを含むエントリ" },
	},
	{
		id: "a5",
		sys: createSys("2024-04-01T10:00:00Z", 4),
		title: "マークダウンによる記述",
		slug: "mock-article-markdown-body",
		body: '<p>他の記事はこちら: <a href="/articles/mock-article-simple-entry">シンプルなエントリ</a></p>',
		bodyMd:
			"# セクションタイトル\n説明文\n改行が反映される\n## リスト\n- リスト1\n- リスト2\n## リンク\n[リンクテキスト](./mock-article-link-to-others)",
		tags: [MOCK_TAGS[0], MOCK_TAGS[1]],
		meta: { description: "他の記事へのリンクを含むエントリ" },
	},
];

export const getApp = cache(async () => ({
	uid: "mock-app",
	name: "Mock Blog",
	description: "これはモックのブログアプリです",
}));

export const getArticles = cache(async () =>
	[...MOCK_ARTICLES]
		.map((a) => ({ ...a, bodyMd: a.bodyMd || "" }))
		.sort((a, b) => b.sys.createdAt.localeCompare(a.sys.createdAt)),
);

export const getArticleBySlug = cache(async (slug: string) => {
	const a = MOCK_ARTICLES.find((a) => a.slug === slug);
	return a ? { ...a, bodyMd: a.bodyMd || "" } : null;
});

export const getTagBySlug = cache(
	async (slug: string) => MOCK_TAGS.find((t) => t.slug === slug) || null,
);

export const getArticlesByTagId = cache(async (tagId: string) =>
	[...MOCK_ARTICLES]
		.filter((a) => a.tags.some((t) => t.id === tagId))
		.map((a) => ({ ...a, bodyMd: a.bodyMd || "" }))
		.sort((a, b) => b.sys.createdAt.localeCompare(a.sys.createdAt)),
);

export const getPast3Articles = cache(async (article: Article) => {
	return [...MOCK_ARTICLES]
		.filter((a) => a.sys.createdAt < article.sys.createdAt)
		.map((a) => ({ ...a, bodyMd: a.bodyMd || "" }))
		.sort((a, b) => b.sys.createdAt.localeCompare(a.sys.createdAt))
		.slice(0, 3);
});

export const getTags = cache(async () => MOCK_TAGS);

export default {
	getApp,
	getArticles,
	getArticleBySlug,
	getTagBySlug,
	getArticlesByTagId,
	getPast3Articles,
	getTags,
};
