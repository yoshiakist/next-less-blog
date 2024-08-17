import satori from "satori";
import sharp from "sharp";
import fs from "fs";

export const writeOgpImage = async (articleTitle: string, datetime: string, slug: string) => {
  // ディレクトリが存在しなければ作成する
  const path = 'public/ogp'
  if (!fs.existsSync(path)) fs.mkdirSync(path);

  // ファイルが既に存在する場合はスキップする
  const filePath = `${path}/${slug}.png`;
  if (fs.existsSync(filePath)) return;

  const image = await generateOgpImage(articleTitle, formatDate(datetime));
  fs.writeFileSync(filePath, image);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}`;
};

const generateOgpImage = async (title: string, date: string) => {
  const fontShippori = fs.readFileSync("public/font/ShipporiMinchoB1-Medium.ttf");
  const fontBaskervville = fs.readFileSync("public/font/Baskervville-Regular.ttf");

  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        background: "#FDFAF5",
        color: "#021A12",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3rem 4rem 2.5rem",
          border: "1px solid #021A12",
          justifyContent: "center",
          width: "100%",
          height: "90%",
        }}
      >
        <p
          style={{
            fontSize: 32,
            fontWeight: 400,
            fontFamily: "Baskervville Old Face",
            letterSpacing: "0.08em",
            paddingLeft: "0.3rem",
            lineHeight: 1,
            marginBottom: "0.5rem"
          }}
        >{date}</p>
        <p
          style={{
            fontSize: 54,
            fontWeight: 500,
            letterSpacing: "0.06em"
          }}
        >{title}</p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Shippori Mincho B1",
          data: fontShippori,
          style: "normal",
          weight: 500,
        },
        {
          name: "Baskervville Old Face",
          data: fontBaskervville,
          style: "normal",
          weight: 400,
        }
      ],
    }
  );

  return await sharp(Buffer.from(svg)).png().toBuffer();
};