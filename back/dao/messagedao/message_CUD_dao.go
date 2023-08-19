package messagedao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"log"
)

func MessageCreate(m mainmodel.Message) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @message_create_dao\n", err))
	}

	rows, err := tx.Prepare("insert into message (id, title, body, postedAt, postedBy, channelId, edited, deleted) values(?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @message_create_dao\n", err))
	}

	if _, err := rows.Exec(m.Id, m.Title, m.Body, m.PostedAt, m.PostedBy, m.ChannelId, false, false); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @message_create_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @message_create_dao\n", err))
	}

	log.Printf("successfully created (%+v)", m)
	return mainmodel.NilError
}

func MessageDelete(id string) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @message_delete_dao\n", err))
	}

	rows, err := tx.Prepare("update message set deleted=? where id=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @message_delete_dao\n", err))
	}

	if _, err := rows.Exec(true, id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @message_delete_dao\n", err))
	}

	log.Printf("successfully deleted message (ID: %s)", id)

	// ------------

	rows, err = tx.Prepare("UPDATE reply SET deleted=? WHERE replyTo=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @message_delete_dao\n", err))
	}

	if _, err := rows.Exec(true, id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @message_delete_dao\n", err))
	}

	log.Printf("successfully deleted relevant replies (message ID: %s)", id)

	// ------------

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @message_delete_dao\n", err))
	}

	return mainmodel.NilError
}

func MessageUpdate(m mainmodel.Message) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @message_update_dao\n", err))
	}

	rows, err := tx.Prepare("update message set title=?, body=?, edited=? where id=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @message_update_dao\n", err))
	}

	if _, err := rows.Exec(m.Title, m.Body, true, m.Id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @message_update_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @message_update_dao\n", err))
	}

	log.Printf("successfully updated message (ID: %s)", m.Id)

	return mainmodel.NilError
}
