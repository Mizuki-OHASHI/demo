# フロントエンドについて

## 使用したフレーム・ライブラリほか

- **Next.js**
- Firebase
- TailwindCSS
- Mantine
- Katex
- Tabler Icons

## ディレクトリ構造

    /src
    ├── methods  # ロジカルな処理や, バックエンドとのやり取りを行うメソッド
    │   ├── Authenticate.tsx  # 認証.
    │   ├── Fetch.tsx  # BEから情報を受け取る.
    │   ├── Parser.tsx  # マークダウンのような形で入力されたテキストデータを綺麗に表示する.
    │   │                 こだわりポイントのひとつ. KaTeX を用いて数式の表示も可能!
    │   ├── Request.tsx  # BEにリクエストを送る.
    │   ├── ShortCut.txt  # ショートカットコマンドにも対応したい (未実装).
    │   ├── Tools.tsx  # 時刻のフォーマットの変更などの便利なメソッドたち.
    │   ├── Type.tsx  # BEから受け取る JSON の型を指定.
    │   ├── firebase.ts  # 認証.
    │   └── gpt.ts  # GPTとの接続 (本当は BE でやるべきらしい)
    ├── pages
    │   ├── _app.tsx
    │   ├── _document.tsx
    │   ├── home.tsx
    │   ├── index.tsx
    │   ├── index_.txt
    │   ├── login.tsx
    │   ├── register.tsx
    │   ├── settings
    │   │   ├── channel.tsx
    │   │   └── user.tsx
    │   └── settings.tsx
    ├── pages-component  # 表示するためのメソッド
    │   ├── Home
    │   │   ├── Home-component
    │   │   │   ├── Header.tsx
    │   │   │   ├── Sidebar-component
    │   │   │   │   ├── Create.tsx
    │   │   │   │   ├── Join.tsx
    │   │   │   │   └── List.tsx
    │   │   │   ├── Sidebar.tsx
    │   │   │   ├── Thread-component
    │   │   │   │   ├── EditMessage.tsx
    │   │   │   │   ├── MessageWrapper.tsx
    │   │   │   │   ├── PostMessages.tsx
    │   │   │   │   └── ViewMessages.tsx
    │   │   │   ├── Thread.tsx
    │   │   │   └── commandPalet.txt  # コマンドによる操作を実現したい (未実装).
    │   │   ├── index.ts
    │   │   └── page.tsx
    │   ├── LP  # CSS未実装
    │   │   ├── index.ts
    │   │   └── page.tsx
    │   ├── Login  # CSS未実装
    │   │   ├── index.ts
    │   │   └── page.tsx
    │   ├── Register  # CSS未実装
    │   │   ├── index.ts
    │   │   └── page.tsx
    │   └── Settings  # ほぼ未実装
    │       ├── Channel
    │       │   ├── index.ts
    │       │   └── page.tsx
    │       ├── Header
    │       │   ├── DropdownMenu.tsx
    │       │   ├── index.ts
    │       │   └── page.tsx
    │       ├── User
    │       │   ├── index.ts
    │       │   └── page.tsx
    │       ├── Workspace
    │       │   ├── index.ts
    │       │   └── page.tsx
    │       ├── index.ts
    │       └── page.tsx
    └── styles
        └── globals.css
