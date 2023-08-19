package checkdao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
)

func UserExists(userId string) (bool, mainmodel.Error) {
	var user string

	rows, err := maindao.Db.Query(
		"SELECT id FROM user WHERE id = ?",
		userId,
	)

	if err != nil {
		return true, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @UserExists, %v\n", err))
	}

	for rows.Next() {
		var u string
		if err := rows.Scan( &u ); err != nil {
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @UserExists, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close @UserExists, %v\n", err_))
				return true, err
			}

			return true, err
		}
		
		user = u
	}

	return user != "", mainmodel.NilError
}


func ChannelExists(channelName string, workspaceId string) (bool, mainmodel.Error) {
	var channel string

	rows, err := maindao.Db.Query(
		"SELECT id FROM channel WHERE workspaceId = ? AND name = ?",
		workspaceId,channelName,
	)

	if err != nil {
		return true, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @UserExists, %v\n", err))
	}

	for rows.Next() {
		var c string
		if err := rows.Scan( &c ); err != nil {
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @ChannelExists, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close @ChannelExists, %v\n", err_))
				return true, err
			}

			return true, err
		}
		
		channel = c
	}

	return channel != "", mainmodel.NilError
}


func WorkspaceExists(workspaceName string) (bool, mainmodel.Error) {
	var workspace string

	rows, err := maindao.Db.Query("SELECT id FROM workspace WHERE name = ?", workspaceName)

	if err != nil {
		return true, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @UserExists, %v\n", err))
	}

	for rows.Next() {
		var w string
		if err := rows.Scan( &w ); err != nil {
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @WorkspaceExists, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close @WorkspaceExists, %v\n", err_))
				return true, err
			}

			return true, err
		}
		
		workspace = w
	}

	return workspace != "", mainmodel.NilError
}