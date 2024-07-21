import { Article } from '@/types/article'
import { ArticleDate } from "@/components/articleDate"
import Link from 'next/link'
import styles from './articleList.module.css'

export type Props = {
  articles: Article[];
}

export const ArticleList = ({ articles }: Props) => {
  return (
    <>
      <nav className={styles.article__nav}>
        <ul>
          {articles.map((article) => {
            return (
              <li key={article._id}>
                <Link href={`/articles/${article.slug}`}>
                  <ArticleDate datetime={article._sys.createdAt} />
                  <span>{article.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}