# MANUAL

## WHOLE STRUCTURE

    hackathon-back-end
    ├── Dockerfile
    ├── README.md
    ├── controller
    │   ├── channelcontroller
    │   │   ├── channel_controller.go
    │   │   ├── channel_create_controller.go
    │   │   ├── channel_delete_controller.go
    │   │   ├── channel_read_controller.go
    │   │   └── channel_update_controller.go
    │   ├── listcontroller
    │   │   ├── list_controller.go
    │   │   └── list_read_controller.go
    │   ├── maincontroller
    │   │   └── controller.go
    │   ├── messagecontroller
    │   │   ├── message_controller.go
    │   │   ├── message_create_controller.go
    │   │   ├── message_delete_controller.go
    │   │   ├── message_read_controller.go
    │   │   └── message_update_controller.go
    │   └── usercontroller
    │       ├── user_controller.go
    │       ├── user_create_controller.go
    │       ├── user_delete_controller.go
    │       ├── user_read_controller.go
    │       └── user_update_controller.go
    ├── dao
    │   ├── channeldao
    │   │   ├── channel_create_dao.go
    │   │   ├── channel_delete_dao.go
    │   │   ├── channel_read_dao.go
    │   │   └── channel_update_dao.go
    │   ├── maindao
    │   │   └── dao.go
    │   ├── mapdao
    │   │   ├── map_channel_message_dao.go
    │   │   ├── map_channel_user_dao.go
    │   │   └── map_user_channel_dao.go
    │   ├── messagedao
    │   │   ├── message_create_dao.go
    │   │   ├── message_delete_dao.go
    │   │   ├── message_read_dao.go
    │   │   └── message_update_dao.go
    │   ├── userdao
    │   │   ├── user_create_dao.go
    │   │   ├── user_delete_dao.go
    │   │   ├── user_join_channel_dao.go
    │   │   ├── user_read_dao.go
    │   │   └── user_update_dao.go
    │   └── workspacedao
    │       └── workspace_dao.go
    ├── go.mod
    ├── go.sum
    ├── main.go
    ├── model
    │   ├── certification_model.go
    │   ├── channel_model.go
    │   ├── error_model.go
    │   ├── message_model.go
    │   ├── relation_model.go
    │   ├── ulid_model.go
    │   ├── user_model.go
    │   └── workspace_model.go
    └── usecase
        ├── channelusecase
        │   ├── channel_certification_usecase.go
        │   ├── channel_create_usecase.go
        │   ├── channel_delete_usecase.go
        │   ├── channel_read_usecase.go
        │   └── channel_update_usecase.go
        ├── mapusecase
        │   ├── map_channel_user.go
        │   ├── map_include.go
        │   ├── map_usecase.go
        │   └── map_user_channel.go
        ├── messageusecase
        │   ├── message_certification_usecase.go
        │   ├── message_create_usecase.go
        │   ├── message_delete_usecase.go
        │   ├── message_read_usecase.go
        │   └── message_update_usecase.go
        └── userusecase
            ├── user_create_usecase.go
            ├── user_delete_usecase.go
            ├── user_read_usecase.go
            └── user_update_usecase.go

## USECASE

### 構造

- 第一段階: user message channel workspace
- 第二段階: CRUD

### メソッドの引数

#### User の場合

- read, update, delete はそのまま, create はポインタとして渡す

#### message channel workspace の場合

- read, delete はそのまま, update, create はポインタとして渡す

## MODEL

### 構造

- 第一段階: user message channel workspace error ulid

### エラーコード

     0 : NO error
     1 : DB error
     3 : Invalid Request                            無効な要求

    1_ : Error about USER
    2_ : Error about WORKSPACE
    3_ : Error about CHANNEL
    4_ : Error about MESSAGE
    5_ : Error about JOIN

    _0 : Requested XXX dose not exist               存在しない
    _1 : Requested XXX had been deleted             削除済み
    _2 : Requested XXX already exists               すでに存在する
    _3 : Requested XXX is invalid                   無効な要求
    _4 : XXX's ID already exists                    すでにIDが存在する
    _5 : No authority
            (incorrect passwor d, owner)            権限がない (不正なパスワード, 管理者でない)
    _6 : Incomplete process                         不完全な処理

## CONTROLLER

### 構造

- 第一段階: user message channel workspace
- 第二段階: CRUD

## DAO

### 構造

- 第一段階: user message channel workspace
- 第二段階: CRUD

# TEST CODE FOR COMMAND LINE TOOL

## USER

    curl -X GET http://localhost:8080/v1/user -H 'Content-Type: application/json' -d '{ "id":"1234567890123456789012345671"}'

    curl -X POST http://localhost:8080/v1/user -H 'Content-Type: application/json' -d '{ "id":"1234567890123456789012345671", "name":"ichiniro", "bio":"This is a test (3)", "img":"" }'

    curl -X POST http://localhost:8080/v1/user -H 'Content-Type: application/json' -d '{ "user":{id":"1234567890123456789012345666", "name":"sanshiro", "bio":"This is a test (5)", "img":"" }}'

    curl -X POST http://localhost:8080/v1/user -H 'Content-Type: application/json' -d '{ "user":{"id":"1234567890123456789012345671", "name":"sanshiro", "bio":"This is a test (5)", "img":"" }}'

    curl -X PUT http://localhost:8080/v1/user -H 'Content-Type: application/json' -d '{ "id":"1234567890123456789012345671", "name":"ichiniro", "bio":"This is a test (5)", "img":"" }'

    curl -X DELETE http://localhost:8080/v1/user -H 'Content-Type: application/json' -d '{ "id":"1234567890123456789012345671"}'

## CHANNEL

    curl -X POST http://localhost:8080/v1/channel -H 'Content-Type: application/json' -d '{ "cert":{"id":"1234567890123456789012345678"},"channel":{"name":"channel test", "bio":"This is a test chanbnel (1)", "createdAt":"2023-05-05", "publicpassword":"", "privatepassword":"43214321"}}'

## LIST

    curl -X GET http://localhost:8080/v1/list -H 'Content-Type: application/json' -d '{ "cert":{"id":"1234567890123456789012345678"},"map":{"info":{"in":"channel","out":["user"],"inid":"01GZMX939A9XY4G85YHX0ZAGFT"}}}'

    curl -X GET http://localhost:8080/v1/list -H 'Content-Type: application/json' -d '{ "cert":{"id":"1234567890123456789012345678"},"map":{"info":{"in":"user","out":["channel"],"inid":"1234567890123456789012345678"}}}'

    curl -X POST https://hackathon-mizuki-ohashi-ljvjdwbmtq-uc.a.run.app/v1/channel -H 'Content-Type: application/json' -d '{ "cert":{"id":"1234567890123456789012345678"},"channel":{"name":"channel test", "bio":"This is a test chanbnel (1)", "createdAt":"2023-05-06", "publicpassword":"", "privatepassword":"43214321"}}'

    curl -X POST http://localhost:8080/v1/message -H 'Content-Type: application/json' -d '{"userid":"1234567890123456789012345678","message":{"id": "","title": "testmessage","body": "","postedat": "2023-05-23T00:00:00Z","postedby": "1234567890123456789012345678","name": "taro","channelid": "01GZMX939A9XY4G85YHX0ZAGFT","edited": false,"deleted": false}}'

    curl -X POST http://localhost:8080/v1/message -H 'Content-Type: application/json' -d '{"userid":"1234567890123456789012345678","message":{"id": "","title": "testmessage","body": "","postedat": "2023-05-23","channelid": "01GZMX939A9XY4G85YHX0ZAGFT","edited": false,"deleted": false}}'

## MEMO

    find . -type d -exec bash -c 'echo hackathon/$(echo "{}" | sed "s/^..//") \\' \;
    find . -type d -exec bash -c 'echo \&\& go install hackathon/$(echo "{}" | sed "s/^..//") \\' \;
    find . -type d -exec bash -c 'echo go install hackathon/$(echo "{}" | sed "s/^..//")\; \\' \;
    find . -type d -exec bash -c 'echo RUN go install hackathon/$(echo "{}" | sed "s/^..//")' \;
    find . -type d -exec bash -c 'echo hackathon/$(echo "{}" | sed "s/^..//")' \;

    gitpush () {
    rm hackathon
    GOOS=linux GOARCH=amd64 go build && \
    docker image build -t backend:latest .; docker container run backend:latest
    git add . && git commit -m "$(date): $1" && git push origin h4
    }

    docker image build -t backend:latest .; docker container run backend:latest

    GOOS=linux go build
    GOOS=linux GOARCH=amd64 go build　-trimpath # -ldflags='-s -w'
