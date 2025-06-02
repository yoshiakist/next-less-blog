import { ArticleDate } from "@/components/articleDate";
import type { Article } from "@/types/article";
import Link from "next/link";
import styles from "./articleList.module.css";

export type Props = {
	articles: Article[];
};

export const ArticleList = ({ articles }: Props) => {
	return (
		<>
			<nav className={styles.article__nav}>
				<ul>
					{articles.map((article: Article) => {
						return (
							<li key={article.id}>
								<Link href={`/articles/${article.slug}`}>
									<ArticleDate datetime={article.sys.createdAt} />
									<span>{article.title}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
};
