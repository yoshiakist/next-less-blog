import Link from 'next/link'
import { getTags } from '@/lib/newt'
import styles from './footer.module.css';

export const Footer = async () => {
  const tags = await getTags()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <h2 className={styles.footer__title}>タグ</h2>
        <nav className={styles.footer__tags}>
          <ul>
            {tags.map((tag) => {
              return (
                <li key={tag._id}>
                  <Link href={`/tags/${tag.slug}`}>{tag.name}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </footer>
  )
}