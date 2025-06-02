import { Baskervville } from "next/font/google";
import Link from "next/link";
import styles from "./header.module.css";

export type Props = {
	appName: string;
};

const baskervville = Baskervville({
	subsets: ["latin"],
	weight: "400",
});

export const Header = async ({ appName }: Props) => {
	return (
		<header className={`${baskervville.className} header`}>
			<div className="container">
				<h1 className={styles.site_name}>
					<Link href={"/"}>{appName}</Link>
				</h1>
			</div>
		</header>
	);
};
