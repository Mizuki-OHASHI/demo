package userdao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"log"
)

func UserCreate(u mainmodel.User) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @user_create_dao\n", err))
	}

	rows, err := tx.Prepare("insert into user (id, name, deleted, bio, img) values(?, ?, ?, ?, ?)")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @user_create_dao\n", err))
	}

	if _, err := rows.Exec(u.Id, u.Name, false, u.Bio, u.Img); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @user_create_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @user_create_dao\n", err))
	}

	log.Printf("successfully created (%+v)", u)
	return mainmodel.NilError
}

func UserDelete(id string) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @user_delete_dao\n", err))
	}

	rows, err := tx.Prepare("update user set deleted=? where id=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @user_delete_dao\n", err))
	}

	if _, err := rows.Exec(true, id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @user_delete_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @user_delete_dao\n", err))
	}

	log.Printf("successfully deleted user (ID: %s)", id)
	return mainmodel.NilError
}

func UserUpdate(u mainmodel.User) mainmodel.Error {
	tx, err := maindao.Db.Begin()

	if err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: db.Begin, %v @user_update_dao\n", err))
	}

	rows, err := tx.Prepare("update user set name=?, bio=?, img=?, deleted=? where id=?")
	if err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Prepare, %v @user_update_dao\n", err))
	}

	if _, err := rows.Exec(u.Name, u.Bio, u.Img, false, u.Id); err != nil {
		tx.Rollback()
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Exec, %v @user_update_dao\n", err))
	}

	if err := tx.Commit(); err != nil {
		return mainmodel.MakeError(1, fmt.Sprintf("fail: tx.Commit, %v @user_update_dao\n", err))
	}

	log.Printf("successfully updated user (ID: %v)", u)

	return mainmodel.NilError
}
