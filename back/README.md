# バックエンドについて

## デプロイ

Docker を用いて Clound Run に CD しています. クラウド上でビルドしようとすると何故かエラーになる (ゴールデンウィークまるまる使っても解決しませんでした...) ので, ローカルでビルドしてバイナリファイルにしてから, そのバイナリファイルをデプロイしています. ビルドする際は,

```
GOOS=linux GOARCH=amd64 go build
```

のように環境をクラウド側に合わせて設定する必要があります.

## Go パッケージの構造

ディレクトリの構造は以下のとおりです. 研修にあった,

```
(FE -) controller - usecase - model - dao (- DB)
```

を基調とし, 分量の多い dao はさらに細分化しました.

```
hackathon-back-end
├── Dockerfile
├── README.md
├── README_API.md
├── README_NOTE.md
├── controller
│   ├── channel_controller.go
│   ├── controller.go
│   ├── join_controller.go
│   ├── message_controller.go
│   ├── reply_controller.go
│   ├── statistics_controller.go
│   ├── user_controller.go
│   └── workspace_controller.go
├── dao
│   ├── channeldao
│   │   ├── channel_CUD_dao.go
│   │   └── channel_get_dao.go
│   ├── checkdao
│   │   ├── member_dao.go
│   │   ├── password_dao.go
│   │   └── uniqueness_dao.go
│   ├── maindao
│   │   └── maindao.go
│   ├── messagedao
│   │   ├── message_CUD_dao.go
│   │   ├── message_get_dao.go
│   │   └── reply_CUD_dao.go
│   ├── statisticsdao
│   │   ├── channel_static_dao.go
│   │   ├── user_static_dao.go
│   │   └── workspace_static_dao.go
│   ├── userdao
│   │   ├── user_CUD_dao.go
│   │   ├── user_get_dao.go
│   │   └── user_join_dao.go
│   └── workspacedao
│       ├── workspace_CUD_dao.go
│       └── workspace_get_dao.go
├── go.mod
├── go.sum
├── hackathon
├── main.go
├── model
│   ├── mainmodel
│   │   ├── channel_model.go
│   │   ├── error_model.go
│   │   ├── message_model.go
│   │   ├── statistics_model.go
│   │   ├── ulid_model.go
│   │   ├── user_model.go
│   │   └── workspace_model.go
│   └── makeupmodel
│       ├── CUD_model.go
│       ├── get_model.go
│       ├── join_model.go
│       ├── statistics_model.go
│       └── statistics_model_test.go
└── usecase
    ├── _tmp.go
    ├── channel_usecase.go
    ├── message_usecase copy.go
    ├── reply_usecase.go
    ├── statistics_usecase.go
    ├── user_usecase.go
    └── workspace_usecase.go

14 directories, 52 files
```

## 各パッケージについて

### controller

`/user` `/message` `/channel` `/workspace` `/join` の API を受け付けます (API については別途説明).
HTTP メソッドに応じて `usecase` パッケージの関数を呼び出し, レスポンスします.

### model

`makeupmodel` と `mainmodel`　にパッケージが分かれています. `mainmodel` で `User`, `Messege` などの汎用的な構造体を定義し, `makeupmodel` では `mainmodel` で定めた構造体を要素に含むような上位の構造体を定義します. `dao` - `usecase` のやり取りには `mainmodel` の構造体を用い, `usecase` で処理を経て `makeupmodel` で定義される構造体の形で `controller` に渡されます. `controller` では受け取った構造体を JSON 形式にして送るだけになっています.

### dao

データベースとのやり取りをします.

#### authdao

ユーザーがチャンネルのメンバーに含まれるか, パスワードがあっているかなどを `usecase` で確認するために必要な情報を取得するメソッドが定義されています.

#### channeldao

チャンネルにまつわることを行うメソッドが定義されています. CUD (create, update, delete) と あるチャンネルに関する一連の情報 (所属するメンバーの情報やメッセージの情報も含む) の取得を行います.

#### maindao

初めに行うデータベースとの接続を行います (`main.go` から呼び出される).

#### messagedao

メッセージの CUD を行うメソッドが定義されています.

#### userdao

ユーザーにまつわることを行うメソッドが定義されています. CUD と あるユーザーに関する一連の情報 (所属するチャンネル, ワークスペースの情報も含む) の取得を行います.

#### workspacedao

ワークスペースにまつわることを行うメソッドが定義される予定です.

### usecase

`model` や `dao` で作った構造体やメソッドを使い, 諸々の処理を行い, JSON 形式にする直前の状態の構造体を `controller` に渡します.

## API について

レスポンスする構造体は以下の通りです.

| HTTP method | /user    | /channel    | /workspace    | /message | /join |
| ----------- | -------- | ----------- | ------------- | -------- | ----- |
| GET         | UserInfo | ChannelInfo | WorkspaceInfo | -        | -     |
| POST        | Error    | Error       | Error         | Error    | Error |
| PUT         | Error    | Error       | Error         | Error    | -     |
| DELET       | Error    | Error       | Error         | Error    | -     |

構造体 Error には `Code (int)` と　`Detail (string)` が格納されていて, パスワードが違う, 登録しようとした名前が被っている, などのエラー情報を返します. `Code : 0` が正常な場合です. `Code` が 1 桁のものはシステム側のエラーで, 開発用の利便性のためにあります. 他のエラーについては, 十の位が何関連のエラーか, 一の位が具体的なエラー内容を表しています.

| Code | meanings                       | 意味                           |
| ---- | ------------------------------ | ------------------------------ |
| 0    | NO error                       |                                |
| 1    | DB error                       |                                |
| 3    | Invalid Request                | 無効な要求                     |
|      |                                |                                |
| 1\_  | Error about USER               |                                |
| 2\_  | Error about WORKSPACE          |                                |
| 3\_  | Error about CHANNEL            |                                |
| 4\_  | Error about MESSAGE            |                                |
| 5\_  | Error about JOIN               |                                |
| 6\_  | Error about Reply              |                                |
|      |                                |                                |
| \_0  | Requested XXX dose not exist   | 存在しない                     |
| \_1  | Requested XXX had been deleted | 削除済み                       |
| \_2  | Requested XXX already exists   | すでに存在する                 |
| \_3  | Requested XXX is invalid       | 無効な要求                     |
| \_4  | XXX's ID already exists        | すでに ID が存在する           |
| \_5  | Incorrect password, owner      | 不正なパスワード, 管理者でない |
| \_6  | Incomplete process             | 不完全な処理                   |

例 : コード 10 なら「リクエストされたユーザーが存在しない」の意.
