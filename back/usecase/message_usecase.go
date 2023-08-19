package usecase

import (
	"fmt"
	"hackathon/dao/checkdao"
	"hackathon/dao/messagedao"
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"log"
)

func MessageGet(messageId string) makeupmodel.MessageInfo {
	messageInfo, err := messagedao.MessageGet(messageId)
	if err != nil {
		log.Println("an error occurred at usecase/message_usecase")
		return messageInfo
	}

	return messageInfo
}

func MessageCreate(messageC makeupmodel.MessageCUD) mainmodel.Error {
	if len(messageC.ChannelId) != 26 {
		return mainmodel.MakeError(43, "Invalid channel ID")
	}

	// Check if the user belong to the channel
	members, err := checkdao.ChannelGetMemberId(messageC.ChannelId)
	if err.Code == 1 {
		return err
	}

	isMember := false
	for _, member := range members {
		if member == messageC.PostedBy {
			isMember = true
			break
		}
	}
	fmt.Println(messageC.Message.Id)
	if err := messageC.Message.MakeId(); err.Code != 0 {
		return err
	}

	if !(isMember) {
		return mainmodel.MakeError(45, "error: no authority to post message")
	}

	return messagedao.MessageCreate(messageC.Message)
}

func MessageDelete(messageD makeupmodel.MessageCUD) mainmodel.Error {
	// Check if the message was posted by the same user as requester
	posterId, err := checkdao.MessagePosterId(messageD.Id)
	if err.Code != 0 {
		return err
	}

	if posterId != messageD.PostedBy {
		return mainmodel.MakeError(45, "no authority to delete message")
	}

	return messagedao.MessageDelete(messageD.Id)
}

func MessageUpdate(messageU makeupmodel.MessageCUD) mainmodel.Error {
	// Check if the message was posted by the same user
	fmt.Println(messageU)

	posterId, err := checkdao.MessagePosterId(messageU.Id)
	if err.Code != 0 {
		return err
	}

	fmt.Println(posterId)

	if posterId != messageU.PostedBy {
		return mainmodel.MakeError(45, "no authority to update message")
	}

	return messagedao.MessageUpdate(messageU.Message)
}
