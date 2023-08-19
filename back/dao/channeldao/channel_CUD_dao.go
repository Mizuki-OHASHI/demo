package channeldao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"log"
)

func ChannelCreate(c mainmodel.Channel) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @channel_create_dao\n", err))
	}

	rows, err := tx.Prepare("insert into channel (id, name, createdAt, deleted, bio, publicPw, privatePw, workspaceId) values(?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @channel_create_dao\n", err))
	}

	if _, err := rows.Exec(c.Id, c.Name, c.CreatedAt, false, c.Bio, c.PublicPw, c.PrivatePw, c.WorkspaceId); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @channel_create_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @channel_create_dao\n", err))
	}

	log.Printf("successfully created (%+v)", c)
	return mainmodel.NilError
}

func ChannelDelete(id string) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @channel_delete_dao\n", err))
	}

	rows, err := tx.Prepare("UPDATE channel SET deleted=? WHERE id=?")

	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @channel_delete_dao\n", err))
	}

	if _, err := rows.Exec(true, id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @channel_delete_dao\n", err))
	}

	log.Printf("successfully deleted channel (ID: %s)", id)

	// ------------

	rows, err = tx.Prepare("UPDATE message SET deleted=? WHERE channelId=?")

	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @channel_delete_dao\n", err))
	}

	if _, err := rows.Exec(true, id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @channel_delete_dao\n", err))
	}

	log.Printf("successfully deleted relevant messages (channel ID: %s)", id)

	// ------------

	rows, err = tx.Prepare("UPDATE reply INNER JOIN message ON reply.replyTo = message.id SET reply.deleted=? WHERE channelId=?")

	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @channel_delete_dao\n", err))
	}

	if _, err := rows.Exec(true, id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @channel_delete_dao\n", err))
	}

	log.Printf("successfully deleted relevant replies (channel ID: %s)", id)

	// ------------

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @channel_delete_dao\n", err))
	}

	return mainmodel.NilError
}

func ChannelUpdate(c mainmodel.Channel) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @channel_update_dao\n", err))
	}

	rows, err := tx.Prepare("update channel set name=?, bio=?, publicPw=? where id=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @channel_update_dao\n", err))
	}

	if _, err := rows.Exec(c.Name, c.Bio, c.PublicPw, c.Id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @channel_update_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @channel_update_dao\n", err))
	}

	log.Printf("successfully updated channel (%v)", c)
	return mainmodel.NilError
}
