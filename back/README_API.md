# API

## 例

### URI

    /v1/user

### JSON

    {"cert":{"id":[送信者のユーザID], "pw":[必要に応じて]}, "user":{"id": ...}}

- `/v1` はバージョンを表す。
- `/user` はリクエストの対象を表す。`/user` の他,

  - `/channel`
  - `/workspace`
  - `/message`

  がある。また, 対象間のマッピング (「チャンネルのメンバー」など) には `/list` を使う。

- リクエストおよびレスポンスは JSON 形式で行う。
- `"cert":{"id":[送信者のユーザID],"pw":[...]}` の部分は認証に用いる。送信者のユーザ ID や入力されたパスワードが入る。以下では省略する。
- クエリ (URL パラメータ) は使わない。

## /list

### GET

    {"info":{"in":"channel","out":["user","message"],"inid":"12345678901234567890123456"}}

- 上の例は, ID が 12345678901234567890123456 であるチャンネルについて, 所属する user と投稿された message の一覧をリクエストしている。
- "in" ----> "out" の候補 :
  - `user` ----> `channel`
  - `channel` ----> `user`
  - `channel` ----> `message`
- "out" は **リスト** なので注意。

## /user

### GET : ユーザ情報の取得

    {"user":{"id":[情報が欲しいユーザのID]}}

### POST : ユーザの新規登録

    {"user":{"id":[ユーザID],"name":[名前],"bio":[自己紹介],"img":[アイコンの画像のパス?]}}

### PUT : ユーザ情報の更新

    {"user":{"id":[ユーザID],"name":[名前],"bio":[自己紹介],"img":[アイコンの画像のパス?]}}

- ID は変更できない。
- `cert.id` と `user.id` は一致している必要がある。つまり本人しか更新できない。

### DELETE : ユーザの削除

    {"user":{"id":[削除したいユーザのID]}}

- `cert.id` と `user.id` は一致している必要がある。つまり本人しか削除できない。

## /message

### GET

### POST

### PUT

### DELETE

## /channel

### GET

### POST

### PUT

### DELETE
