package channeldao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"log"
)

func ChannelGet(channelId string) (makeupmodel.ChannelInfo, error) {
	var channelInfo makeupmodel.ChannelInfo

	if err := channelGetChannel(channelId, &channelInfo); err != nil {
		log.Println("an error occurred at dao/channeldao/channel_get_dao")
		return channelInfo, err
	}

	if err := channelGetMember(channelId, &channelInfo); err != nil {
		log.Println("an error occurred at dao/channeldao/channel_get_dao")
		return channelInfo, err
	}

	if err := channelGetMessage(channelId, &channelInfo); err != nil {
		log.Println("an error occurred at dao/channeldao/channel_get_dao")
		return channelInfo, err
	}

	return channelInfo, nil
}

func channelGetChannel(channelId string, channelInfo *makeupmodel.ChannelInfo) error {
	rows, err := maindao.Db.Query(
		`SELECT id, name, deleted, bio, createdAt, publicPw, workspaceId FROM channel	where id = ?`,
		channelId,
	)

	if err != nil {
		log.Printf("fail: db.Query @channelGetChannel, %v\n", err)
		channelInfo.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @channelGetChannel, %v\n", err))
		return err
	}

	for rows.Next() {
		var c mainmodel.Channel
		if err := rows.Scan(&c.Id, &c.Name, &c.Deleted, &c.Bio, &c.CreatedAt, &c.PublicPw, &c.WorkspaceId); err != nil {
			log.Printf("fail: rows.Scan @channelGetChannel, %v\n", err)
			channelInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @channelGetChannel, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close, %v\n", err_)
				channelInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @channelGetChannel, %v\n", err))
				return err
			}

			return err
		}

		channelInfo.Channel = c
	}

	return nil
}

func channelGetMember(channelId string, channelInfo *makeupmodel.ChannelInfo) error {
	rows, err := maindao.Db.Query(
		`SELECT user.id, user.name, user.deleted, user.bio, user.img,
		owner
		FROM userChannel
		INNER JOIN user ON user.id = userId
		WHERE userChannel.channelId = ?`,
		channelId,
	)

	if err != nil {
		log.Printf("fail: db.Query  @channelGetChannel, %v\n", err)
		channelInfo.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @channelGetChannel, %v\n", err))
		return err
	}

	for rows.Next() {
		var m mainmodel.User
		if err := rows.Scan(
			&m.Id, &m.Name, &m.Deleted, &m.Bio, &m.Img,
			&m.Flag,
		); err != nil {
			log.Printf("fail: rows.Scan @channelGetMember, %v\n", err)
			channelInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @channelGetMember, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @channelGetMember, %v\n", err_)
				channelInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @channelGetMember, %v\n", err))
				return err_
			}

			return err
		}

		channelInfo.Members = append(channelInfo.Members, m)
	}

	return nil
}

func channelGetMessage(channelId string, channelInfo *makeupmodel.ChannelInfo) error {
	rows, err := maindao.Db.Query(
		`SELECT message.id, message.title, message.body, message.postedAt,
		message.postedBy, user.name, user.img, message.edited, message.deleted
		FROM message
		INNER JOIN user ON message.postedBy = user.id
		WHERE message.channelId = ?
		ORDER BY message.postedAt ASC`,
		channelId,
	)

	if err != nil {
		log.Printf("fail: db.Query @channelGetMessage, %v\n", err)
		channelInfo.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @channelGetMessage, %v\n", err))
		return err
	}

	for rows.Next() {
		var m mainmodel.Message
		if err := rows.Scan(
			&m.Id, &m.Title, &m.Body, &m.PostedAt, &m.PostedBy, &m.Name, &m.Icon, &m.Edited, &m.Deleted,
		); err != nil {
			log.Printf("fail: rows.Scan @channelGetMessage, %v\n", err)
			channelInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @channelGetMessage, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @channelGetMessage, %v\n", err_)
				channelInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @channelGetMessage, %v\n", err))
				return err
			}

			return err
		}

		channelInfo.Messages = append(channelInfo.Messages, m)
	}

	return nil
}
