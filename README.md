# next-less-blog

日記を書くことだけにフォーカスした、Next.jsベースのミニマルなブログテンプレートです。
現在、バックエンドには国産のヘッドレスCMSである Newt を利用できます。

※ 利用上の注意

yossi が自分のブログ開発のために利用しています。
ご自身のブログテンプレートにも使ってみたい場合、fork して利用することをお勧め致します。

## Installation

### step 1. Environment

- node: v22.3.0
- npm: v10.8.1
- yarn: v3.8.3

※ JavaScript パッケージマネージャの Volta をインストールしてある場合は自動で設定されます

### step 2. Setup Newt

- Newt にアカウントを作成する
- デフォルトのブログテンプレートを利用してスペースを作成する
- `スペースUID` と `CDN API トークン` を取得する

### step 3. Setting .env.local

プロジェクトルートに .env.local を作成する

``` 
# .env.local

NEWT_SPACE_UID=your_space_uid
NEWT_CDN_API_TOKEN=XXX_YOUR_TOKEN
```

### step 4. Start!

```
yarn install
yarn dev
```

## Links

Vercel 上にデプロイする場合、参考資料として以下のリンクもオススメです

- [NewtとNext.js (App Router) を利用してブログを作成する](https://www.newt.so/docs/tutorials/get-contents-in-nextjs)
- [コンテンツの更新時にVercelでデプロイを行う](https://www.newt.so/docs/tutorials/deploy-to-vercel-with-webhooks)


## Trouble Shooting

- Q: エディタ上で、import したライブラリについて module not found が出る
  - A: 以下の記事を参照してみてください。
  - [【TypeScript】yarn4 + VSCodeでts2307が一生出続ける問題の解消法](https://qiita.com/Enokisan/items/8007c6a943058bcf7073)


## Contribute

気に入ってくれた方、PR もお待ちしております。
Issue も参照してみてください。