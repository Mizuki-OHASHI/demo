package messagedao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"log"
)

func MessageGet(messageId string) (makeupmodel.MessageInfo, error) {
	var messageInfo makeupmodel.MessageInfo
	
	if err := messageGetMessage(messageId, &messageInfo); err != nil {
		log.Println("an error occurred at dao/messagedao/message_get_dao")
		return messageInfo, err
	}

	if err := messageGetReply(messageId, &messageInfo); err != nil {
		log.Println("an error occurred at dao/messagedao/message_get_dao")
		return messageInfo, err
	}

	return messageInfo, nil
}

func messageGetMessage(messageId string, messageInfo *makeupmodel.MessageInfo) error {
	rows, err := maindao.Db.Query(
		`SELECT message.id, message.title, message.body, message.postedAt,
		message.postedBy, user.name, user.img, message.edited, message.deleted
		FROM message
		INNER JOIN user ON message.postedBy = user.id
		WHERE message.id = ?`,
		messageId,
	)

	if err != nil {
		log.Printf("fail: db.Query @messageGetMessage, %v\n", err)
		messageInfo.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @messageGetMessage, %v\n", err))
		return err
	}

	for rows.Next() {
		var m mainmodel.Message
		if err := rows.Scan(
			&m.Id, &m.Title, &m.Body, &m.PostedAt, &m.PostedBy, &m.Name, &m.Icon, &m.Edited, &m.Deleted,
		); err != nil {
			log.Printf("fail: rows.Scan @messageGetMessage, %v\n", err)
			messageInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @messageGetMessage, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @messageGetMessage, %v\n", err_)
				messageInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @messageGetMessage, %v\n", err))
				return err
			}

			return err
		}
		
		messageInfo.Root = m
	}

	return nil
}

func messageGetReply(messageId string, messageInfo *makeupmodel.MessageInfo) error {
	rows, err := maindao.Db.Query(
		`SELECT reply.id, reply.title, reply.body, reply.postedAt,
		reply.postedBy, user.name, user.img, reply.edited, reply.deleted
		FROM reply
		INNER JOIN user ON reply.postedBy = user.id
		WHERE reply.replyTo = ?
		ORDER BY reply.postedAt ASC`,
		messageId,
	)

	if err != nil {
		log.Printf("fail: db.Query @messageGetMessage, %v\n", err)
		messageInfo.Error.UpdateError(1, fmt.Sprintf("fail: db.Query @messageGetReply, %v\n", err))
		return err
	}

	for rows.Next() {
		var m mainmodel.Reply
		if err := rows.Scan(
			&m.Id, &m.Title, &m.Body, &m.PostedAt, &m.PostedBy, &m.Name, &m.Icon, &m.Edited, &m.Deleted,
		); err != nil {
			log.Printf("fail: rows.Scan @messageGetReply, %v\n", err)
			messageInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Scan @messageGetReply, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @messageGetReply, %v\n", err_)
				messageInfo.Error.UpdateError(1, fmt.Sprintf("fail: rows.Close @messageGetReply, %v\n", err))
				return err
			}

			return err
		}
		
		messageInfo.Replies = append(messageInfo.Replies, m)
	}

	return nil
}