package userdao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"log"
)

func UserGet(userId string) (makeupmodel.UserInfo, error) {
	var userInfo makeupmodel.UserInfo

	if err := userGetUser(userId, &userInfo); err != nil {
		log.Println("an error occurred at dao/userdao/user_get_dao")
		return userInfo, err
	}

	if err := userGetChannel(userId, &userInfo); err != nil {
		log.Println("an error occurred at dao/userdao/user_get_dao")
		return userInfo, err
	}

	if err := userGetWorkspace(userId, &userInfo); err != nil {
		log.Println("an error occurred at dao/userdao/user_get_dao")
		return userInfo, err
	}

	return userInfo, nil
}

func userGetUser(userId string, userInfo *makeupmodel.UserInfo) error {
	rows, err := maindao.Db.Query("select id, name, deleted, bio, img from user where id = ?", userId)

	if err != nil {
		log.Printf("fail: db.Query @userGetUser, %v\n", err)
		userInfo.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @userGetUser, %v\n", err))
		return err
	}

	for rows.Next() {
		var u mainmodel.User
		if err := rows.Scan(&u.Id, &u.Name, &u.Deleted, &u.Bio, &u.Img); err != nil {
			log.Printf("fail: rows.Scan @userGetUser, %v\n", err)
			userInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @userGetUser, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close, %v\n", err_)
				userInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @userGetUser, %v\n", err))
				return err
			}

			return err
		}

		userInfo.User = u
	}

	return nil
}

func userGetChannel(userId string, userInfo *makeupmodel.UserInfo) error {
	rows, err := maindao.Db.Query(
		`SELECT channel.id, channel.name, channel.deleted, channel.bio, channel.workspaceId, 
		owner
		FROM userChannel
		INNER JOIN channel ON channel.id = channelId
		WHERE userId = ?`,
		userId,
	)

	if err != nil {
		log.Printf("fail: db.Query  @userGetChannel, %v\n", err)
		userInfo.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @userGetChannel, %v\n", err))
		return err
	}

	for rows.Next() {
		var c mainmodel.Channel
		if err := rows.Scan(
			&c.Id, &c.Name, &c.Deleted, &c.Bio, &c.WorkspaceId,
			&c.Flag,
		); err != nil {
			log.Printf("fail: rows.Scan @userGetChannel, %v\n", err)
			userInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @userGetChannel, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @userGetChannel, %v\n", err_)
				userInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @userGetChannel, %v\n", err))
				return err
			}

			return err
		}

		userInfo.Channels = append(userInfo.Channels, c)
	}

	return nil
}

func userGetWorkspace(userId string, userInfo *makeupmodel.UserInfo) error {
	rows, err := maindao.Db.Query(
		`SELECT workspace.id, workspace.name, workspace.deleted, workspace.bio, workspace.img,
		userWorkspace.owner
		FROM userWorkspace
		INNER JOIN workspace ON workspace.id = workspaceId
		WHERE userId = ?`,
		userId,
	)

	if err != nil {
		log.Printf("fail: db.Query @userGetWorkspace, %v\n", err)
		userInfo.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @userGetWorkspace, %v\n", err))
		return err
	}

	for rows.Next() {
		var c mainmodel.Workspace
		if err := rows.Scan(
			&c.Id, &c.Name, &c.Deleted, &c.Bio, &c.Img,
			&c.Flag,
		); err != nil {
			log.Printf("fail: rows.Scan @userGetWorkspace, %v\n", err)
			userInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @userGetWorkspace, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @userGetWorkspace, %v\n", err_)
				userInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @userGetWorkspace, %v\n", err))
				return err
			}

			return err
		}

		userInfo.Workspaces = append(userInfo.Workspaces, c)
	}

	return nil
}
