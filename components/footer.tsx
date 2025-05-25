import Link from 'next/link'
import styles from './footer.module.css';
import { Tag } from '@/types/tag';

type Props = {
  tags: Tag[];
};

export const Footer = ({tags} : Props) => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <h2 className={styles.footer__title}>タグ</h2>
        <nav className={styles.footer__tags}>
          <ul>
            {tags.map((tag) => {
              return (
                <li key={tag.id}>
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