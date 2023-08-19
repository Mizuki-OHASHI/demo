package workspacedao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"log"
)

func WorkspaceCreate(c mainmodel.Workspace) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @workspace_create_dao\n", err))
	}

	rows, err := tx.Prepare("insert into workspace (id, name, createdAt, deleted, bio, img, publicPw, privatePw) values(?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @workspace_create_dao\n", err))
	}

	if _, err := rows.Exec(c.Id, c.Name, c.CreatedAt, false, c.Bio, c.Img, c.PublicPw, c.PrivatePw); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @workspace_create_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @workspace_create_dao\n", err))
	}

	log.Printf("successfully created (%+v)", c)
	return mainmodel.NilError
}

func WorkspaceDelete(id string) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @workspace_delete_dao\n", err))
	}

	rows, err := tx.Prepare("update workspace set deleted=? where id=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @workspace_delete_dao\n", err))
	}

	if _, err := rows.Exec(true, id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @workspace_delete_dao\n", err))
	}

	log.Printf("successfully deleted workspace (ID: %s)", id)

	// ------------

	rows, err = tx.Prepare("UPDATE channel SET deleted=? WHERE workspaceId=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @workspace_delete_dao\n", err))
	}

	if _, err := rows.Exec(true, id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @workspace_delete_dao\n", err))
	}

	log.Printf("successfully deleted relevant channels (workspace ID: %s)", id)

	// ------------

	rows, err = tx.Prepare("UPDATE message INNER JOIN channel ON channel.id = message.channelId SET message.deleted=? WHERE channel.workspaceId=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @workspace_delete_dao\n", err))
	}

	if _, err := rows.Exec(true, id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @workspace_delete_dao\n", err))
	}

	log.Printf("successfully deleted relevant messages (workspace ID: %s)", id)

	// ------------

	rows, err = tx.Prepare(`
		UPDATE reply
			INNER JOIN message ON reply.replyTo = message.id
			INNER JOIN channel ON message.channelId = channel.id
		SET reply.deleted = ?
		WHERE channel.workspaceId = ?
	`)
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @workspace_delete_dao\n", err))
	}

	if _, err := rows.Exec(true, id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @workspace_delete_dao\n", err))
	}

	log.Printf("successfully deleted relevant replies (workspace ID: %s)", id)

	// ------------

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @workspace_delete_dao\n", err))
	}

	return mainmodel.NilError
}

func WorkspaceUpdate(c mainmodel.Workspace) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @workspace_update_dao\n", err))
	}

	rows, err := tx.Prepare("update workspace set name=?, bio=?, img=?, publicPw=? where id=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @workspace_update_dao\n", err))
	}

	if _, err := rows.Exec(c.Name, c.Bio, c.Img, c.PublicPw, c.Id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @workspace_update_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @workspace_update_dao\n", err))
	}

	log.Printf("successfully updated workspace (%v)", c)
	return mainmodel.NilError
}
