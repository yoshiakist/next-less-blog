import { getApp, getArticles } from '@/lib/newt'
import { ArticleList } from '@/components/articleList'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const app = await getApp()
  return {
    title: app.name,
    description: `${app.name}のブログ`,
  }
}

export default async function Home() {
  const articles = await getArticles()
  return (
    <main className='home'>
      <ArticleList articles={articles} />
    </main>
  )
}
