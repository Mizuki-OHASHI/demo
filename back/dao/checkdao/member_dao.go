package checkdao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
)

func ChannelGetMemberId(channelId string) ([]string, mainmodel.Error) {
	var members []string
	rows, err := maindao.Db.Query(
		"SELECT userId FROM userChannel WHERE channelId = ?",
		channelId,
	)

	if err != nil {
		return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @channelGetChannel, %v\n", err))
	}

	for rows.Next() {
		var m string
		if err := rows.Scan( &m ); err != nil {
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @channelGetMember, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close @channelGetMember, %v\n", err_))
				return nil, err
			}

			return nil, err
		}
		
		members = append(members, m)
	}

	return members, mainmodel.NilError
}


func ChannelGetOwnerId(channelId string) ([]string, mainmodel.Error) {
	var owners []string
	rows, err := maindao.Db.Query(
		"SELECT userId FROM userChannel WHERE channelId = ? AND owner = ?",
		channelId, true,
	)

	if err != nil {
		return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @channelGetChannel, %v\n", err))
	}

	for rows.Next() {
		var o string
		if err := rows.Scan( &o ); err != nil {
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @channelGetMember, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close @channelGetMember, %v\n", err_))
				return nil, err
			}

			return nil, err
		}
		
		owners = append(owners, o)
	}

	return owners, mainmodel.NilError
}


func WorkspaceGetMemberId(workspaceId string) ([]string, mainmodel.Error) {
	var members []string
	rows, err := maindao.Db.Query(
		"SELECT userId FROM userWorkspace WHERE workspaceId = ?",
		workspaceId,
	)

	if err != nil {
		return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @workspaceGetWorkspace, %v\n", err))
	}

	for rows.Next() {
		var m string
		if err := rows.Scan( &m ); err != nil {
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @workspaceGetMember, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close @workspaceGetMember, %v\n", err_))
				return nil, err
			}

			return nil, err
		}
		
		members = append(members, m)
	}

	return members, mainmodel.NilError
}


func WorkspaceGetOwnerId(workspaceId string) ([]string, mainmodel.Error) {
	var owners []string
	rows, err := maindao.Db.Query(
		"SELECT userId FROM userWorkspace WHERE workspaceId = ? AND owner = ?",
		workspaceId, true,
	)

	if err != nil {
		return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @workspaceGetWorkspace, %v\n", err))
	}

	for rows.Next() {
		var o string
		if err := rows.Scan( &o ); err != nil {
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @workspaceGetMember, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close @workspaceGetMember, %v\n", err_))
				return nil, err
			}

			return nil, err
		}
		
		owners = append(owners, o)
	}

	return owners, mainmodel.NilError
}


func MessageGetChannelMemberId(messageId string) ([]string, mainmodel.Error) {
	var members []string
	rows, err := maindao.Db.Query(
		`SELECT userId FROM userChannel
		WHERE channelId = (SELECT channelId FROM message WHERE id = ?)`,
		messageId,
	)

	if err != nil {
		return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @channelGetChannel, %v\n", err))
	}

	for rows.Next() {
		var m string
		if err := rows.Scan( &m ); err != nil {
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @channelGetMember, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close @channelGetMember, %v\n", err_))
				return nil, err
			}

			return nil, err
		}
		
		members = append(members, m)
	}

	return members, mainmodel.NilError
}