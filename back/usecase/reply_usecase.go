package usecase

import (
	"fmt"
	"hackathon/dao/checkdao"
	"hackathon/dao/messagedao"
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
)

func ReplyCreate(replyC makeupmodel.ReplyCUD) mainmodel.Error {
	if len(replyC.ReplyTo) != 26 {
		return mainmodel.MakeError(63, "Invalid message ID")
	}

	// Check if the user belong to the message
	members, err := checkdao.MessageGetChannelMemberId(replyC.ReplyTo)
	if err.Code == 1 {
		return err
	}

	fmt.Println(replyC, members)

	isMember := false
	for _, member := range members {
		if member == replyC.PostedBy {
			isMember = true
			break
		}
	}
	fmt.Println(replyC.Reply.Id)
	if err := replyC.Reply.MakeId(); err.Code != 0 {
		return err
	}

	if !(isMember) {
		return mainmodel.MakeError(45, "error: no authority to reply")
	}

	return messagedao.ReplyCreate(replyC.Reply)
}

func ReplyDelete(replyD makeupmodel.ReplyCUD) mainmodel.Error {
	// Check if the reply was posted by the same user as requester
	posterId, err := checkdao.ReplyPosterId(replyD.Id)
	if err.Code != 0 {
		return err
	}

	if posterId != replyD.PostedBy {
		return mainmodel.MakeError(45, "no authority to delete reply")
	}

	return messagedao.ReplyDelete(replyD.Id)
}

func ReplyUpdate(replyU makeupmodel.ReplyCUD) mainmodel.Error {
	// Check if the reply was posted by the same user
	fmt.Println(replyU)

	posterId, err := checkdao.ReplyPosterId(replyU.Id)
	if err.Code != 0 {
		return err
	}

	fmt.Println(posterId)

	if posterId != replyU.PostedBy {
		return mainmodel.MakeError(45, "no authority to update reply")
	}

	return messagedao.ReplyUpdate(replyU.Reply)
}
