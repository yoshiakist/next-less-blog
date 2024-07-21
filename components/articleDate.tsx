import { Baskervville } from "next/font/google";
import styles from './articleDate.module.css';

export type Props = {
  datetime: string;
};

const baskervville = Baskervville({
  subsets: ['latin'],
  weight: "400"
});

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}`;
};

export const ArticleDate = ({ datetime }: Props) => {
  return (
    <time className={`
      ${baskervville.className}
      ${styles.time}
    `}>
      { formatDate(datetime) }
    </time>
  )
}