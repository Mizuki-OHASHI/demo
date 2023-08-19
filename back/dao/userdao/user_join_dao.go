package userdao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"log"
)

func UserJoinChannel(userId string, channelId string, owner bool) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		log.Printf("fail: db.Begin, %v\n", err)
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v\n", err))
	}

	rows, err := tx.Prepare("insert into userChannel (userId, channelId, owner) values(?, ?, ?)")
	if err != nil {
		log.Printf("fail: tx.Prepare, %v\n", err)
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v\n", err))
	}

	if _, err := rows.Exec(userId, channelId, owner); err != nil {
		log.Printf("fail: tx.Exec, %v\n", err)
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v\n", err))
	}

	if err := tx.Commit(); err != nil {
		log.Printf("fail: tx.Commit, %v\n", err)
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v\n", err))
	}

	log.Printf("user(%s) successfully joined into channel(%s)", userId, channelId)
	return mainmodel.NilError
}

func UserJoinWorkspace(userId string, workspaceId string, owner bool) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		log.Printf("fail: db.Begin, %v\n", err)
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v\n", err))
	}

	rows, err := tx.Prepare("insert into userWorkspace (userId, workspaceId, owner) values(?, ?, ?)")
	if err != nil {
		log.Printf("fail: tx.Prepare, %v\n", err)
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v\n", err))
	}

	if _, err := rows.Exec(userId, workspaceId, owner); err != nil {
		log.Printf("fail: tx.Exec, %v\n", err)
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v\n", err))
	}

	if err := tx.Commit(); err != nil {
		log.Printf("fail: tx.Commit, %v\n", err)
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v\n", err))
	}

	log.Printf("user(%s) successfully joined into workspace(%s)", userId, workspaceId)
	return mainmodel.NilError
}
