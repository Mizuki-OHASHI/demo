package messagedao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"log"
)

func ReplyCreate(m mainmodel.Reply) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @reply_create_dao\n", err))
	}

	rows, err := tx.Prepare("insert into reply (id, title, body, postedAt, postedBy, replyTo, edited, deleted) values(?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @reply_create_dao\n", err))
	}

	if _, err := rows.Exec(m.Id, m.Title, m.Body, m.PostedAt, m.PostedBy, m.ReplyTo, false, false); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @reply_create_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @reply_create_dao\n", err))
	}

	log.Printf("successfully created (%+v)", m)
	return mainmodel.NilError
}


func ReplyDelete (id string) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @reply_delete_dao\n", err))
	}

	rows, err := tx.Prepare("update reply set deleted=? where id=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @reply_delete_dao\n", err))
	}

	if _, err := rows.Exec(true, id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @reply_delete_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @reply_delete_dao\n", err))
	}

	log.Printf("successfully deleted reply (ID: %s)", id)
	return mainmodel.NilError
}


func ReplyUpdate(m mainmodel.Reply) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @reply_update_dao\n", err))
	}

	rows, err := tx.Prepare("update reply set title=?, body=?, edited=? where id=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @reply_update_dao\n", err))
	}

	if _, err := rows.Exec(m.Title, m.Body, true, m.Id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @reply_update_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @reply_update_dao\n", err))
	}

	log.Printf("successfully updated reply (ID: %s)", m.Id)

	return mainmodel.NilError
}

