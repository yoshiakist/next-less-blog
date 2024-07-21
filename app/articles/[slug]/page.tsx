import { getApp, getArticles, getArticleBySlug, getPast3Articles } from '@/lib/newt'
import type { Metadata } from 'next'
import type { Article } from '@/types/article'
import { ArticleDate } from "@/components/articleDate"
import { ArticleList } from '@/components/articleList'
import Link from 'next/link'
import styles from './page.module.css'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const app = await getApp()
  const article = await getArticleBySlug(slug)

  return {
    title: `${article?.title} | ${app.name}`,
    description: article?.meta.description || 'meta description を設定し忘れるときだってあるさ',
  }
}

export default async function Article({ params }: Props) {
  const { slug } = params
  const article = await getArticleBySlug(slug)
  if (!article) return

  const past3Articles = await getPast3Articles(article)

  return (
    <>
      <article>
        <header className={styles.article__header}>
          <h1 className={styles.article__title}>{article.title}</h1>
          <ArticleDate datetime={article._sys.createdAt} />
        </header>
        <div
          className={styles.article__content}
          dangerouslySetInnerHTML={{ __html: article.body }} />
        <footer className={styles.article__footer}>
          <ul>
            {article.tags.map((tag) => {
              return (
                <li key={tag._id}>
                  <Link href={`/tags/${tag.slug}`}>{tag.name}</Link>
                </li>
              )
            })}
          </ul>
        </footer>
      </article>
      <ArticleList articles={past3Articles} />
    </>
  )
}
