import { getApp, getArticlesByTagId, getTagBySlug } from '@/lib/newt'
import { ArticleList } from '@/components/articleList'
import type { Metadata } from 'next'
import styles from './page.module.css'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const app = await getApp()
  const tag = await getTagBySlug(slug);

  return {
    title: `${tag?.name}の話 | ${app.name}`,
    description: tag?.name + 'の記事',
  }
}

export default async function TagList({ params }: Props) {
  const { slug } = params
  const tag = await getTagBySlug(slug);
  if (!tag) return

  const articles = await getArticlesByTagId(tag._id)
  if (!articles) return

  if (articles.length > 0) {
    return (
      <div className={styles.tag_list__title}>
        <h2>{tag.name}の話</h2>
        <ArticleList articles={articles} />
      </div>
    )
  } else {
    return (
      <div
        className={`
          ${styles.tag_list__title}
          ${styles.tag_list__title_none}
        `}>
        <h2>{tag.name}の話はそのうち書きます。</h2>
      </div>
    )
  }
}