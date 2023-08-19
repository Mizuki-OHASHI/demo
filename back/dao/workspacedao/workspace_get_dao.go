package workspacedao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"log"
)

func WorkspaceGet(workspaceId string) (makeupmodel.WorkspaceInfo, error) {
	var workspaceInfo makeupmodel.WorkspaceInfo

	if err := workspaceGetWorkspace(workspaceId, &workspaceInfo); err != nil {
		log.Println("an error occurred at dao/workspacedao/workspace_get_dao")
		return workspaceInfo, err
	}

	if err := workspaceGetMember(workspaceId, &workspaceInfo); err != nil {
		log.Println("an error occurred at dao/workspacedao/workspace_get_dao")
		return workspaceInfo, err
	}

	if err := workspaceGetChannel(workspaceId, &workspaceInfo); err != nil {
		log.Println("an error occurred at dao/workspacedao/workspace_get_dao")
		return workspaceInfo, err
	}

	return workspaceInfo, nil
}

func workspaceGetWorkspace(workspaceId string, workspaceInfo *makeupmodel.WorkspaceInfo) error {
	rows, err := maindao.Db.Query("select id, name, deleted, bio, img, createdAt, publicPw from workspace where id = ?", workspaceId)

	if err != nil {
		log.Printf("fail: db.Query @workspaceGetWorkspace, %v\n", err)
		workspaceInfo.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @workspaceGetWorkspace, %v\n", err))
		return err
	}

	for rows.Next() {
		var w mainmodel.Workspace
		if err := rows.Scan(&w.Id, &w.Name, &w.Deleted, &w.Bio, &w.Img, &w.CreatedAt, &w.PublicPw); err != nil {
			log.Printf("fail: rows.Scan @workspaceGetWorkspace, %v\n", err)
			workspaceInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @workspaceGetWorkspace, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close, %v\n", err_)
				workspaceInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @workspaceGetWorkspace, %v\n", err))
				return err
			}

			return err
		}

		workspaceInfo.Workspace = w
	}
	return nil
}

func workspaceGetMember(workspaceId string, workspaceInfo *makeupmodel.WorkspaceInfo) error {
	rows, err := maindao.Db.Query(
		`SELECT user.id, user.name, user.deleted, user.bio, user.img, owner
		FROM userWorkspace
		INNER JOIN user ON user.id = userId
		WHERE userWorkspace.workspaceId = ?`,
		workspaceId,
	)

	if err != nil {
		log.Printf("fail: db.Query  @workspaceGetWorkspace, %v\n", err)
		workspaceInfo.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @workspaceGetWorkspace, %v\n", err))
		return err
	}

	for rows.Next() {
		var m mainmodel.User
		if err := rows.Scan(
			&m.Id, &m.Name, &m.Deleted, &m.Bio, &m.Img, &m.Flag,
		); err != nil {
			log.Printf("fail: rows.Scan @workspaceGetMember, %v\n", err)
			workspaceInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @workspaceGetMember, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @workspaceGetMember, %v\n", err_)
				workspaceInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @workspaceGetMember, %v\n", err))
				return err_
			}

			return err
		}

		workspaceInfo.Members = append(workspaceInfo.Members, m)
	}

	return nil
}

func workspaceGetChannel(workspaceId string, workspaceInfo *makeupmodel.WorkspaceInfo) error {
	rows, err := maindao.Db.Query(
		"select id, name, deleted, bio, createdAt, publicPw from channel where workspaceId = ?",
		workspaceId,
	)

	if err != nil {
		log.Printf("fail: db.Query @workspaceGetMessage, %v\n", err)
		workspaceInfo.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @workspaceGetMessage, %v\n", err))
		return err
	}

	for rows.Next() {
		var c mainmodel.Channel
		if err := rows.Scan(
			&c.Id, &c.Name, &c.Deleted, &c.Bio, &c.CreatedAt, &c.PublicPw,
		); err != nil {
			log.Printf("fail: rows.Scan @workspaceGetMessage, %v\n", err)
			workspaceInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @workspaceGetMessage, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @workspaceGetMessage, %v\n", err_)
				workspaceInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @workspaceGetMessage, %v\n", err))
				return err
			}

			return err
		}

		workspaceInfo.Channels = append(workspaceInfo.Channels, c)
	}

	return nil
}

func GetAllWorkspace() makeupmodel.Workspaces {
	var workspaces makeupmodel.Workspaces
	rows, err := maindao.Db.Query(
		"SELECT id, name, bio, createdAt FROM workspace WHERE deleted = ?",
		false,
	)

	if err != nil {
		log.Printf("fail: db.Query @workspaceGetMessage, %v\n", err)
		workspaces.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @workspaceGetMessage, %v\n", err))
		return workspaces
	}

	for rows.Next() {
		var w mainmodel.Workspace
		if err := rows.Scan(
			&w.Id, &w.Name, &w.Bio, &w.CreatedAt,
		); err != nil {
			log.Printf("fail: rows.Scan @workspaceGetMessage, %v\n", err)
			workspaces.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @workspaceGetMessage, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @workspaceGetMessage, %v\n", err_)
				workspaces.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @workspaceGetMessage, %v\n", err))
				return workspaces
			}

			return workspaces
		}

		workspaces.List = append(workspaces.List, w)
	}

	return workspaces
}
