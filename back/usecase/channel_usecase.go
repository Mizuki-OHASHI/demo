package usecase

import (
	"fmt"
	"hackathon/dao/channeldao"
	"hackathon/dao/checkdao"
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"log"
)

func ChannelGet(channelId string) makeupmodel.ChannelInfo {
	channelInfo, err := channeldao.ChannelGet(channelId)
	if err != nil {
		log.Println("an error occurred at usecase/channel_usecase")
		return channelInfo
	}

	return channelInfo
}

func ChannelCreate(channelC makeupmodel.ChannelCUD) mainmodel.Error {
	if len(channelC.WorkspaceId) != 26 {
		return mainmodel.MakeError(33, "Invalid workspace ID")
	}

	b, err := checkdao.ChannelExists(channelC.Name, channelC.WorkspaceId)
	if err.Code != 0 {
		return err
	}

	if b {
		return mainmodel.MakeError(32, "channel already exists")
	}

	if err := channelC.MakeId(); err.Code != 0 {
		return err
	}

	if err := channeldao.ChannelCreate(channelC.Channel); err.Code != 0 {
		return err
	}

	return userJoinChannel(channelC.UserId, channelC.Id, true, channelC.PrivatePw)
}

func ChannelDelete(channelD makeupmodel.ChannelCUD) mainmodel.Error {
	// Check if the user is an owner and public password is correct
	owners, err_ := checkdao.ChannelGetOwnerId(channelD.Id)
	if err_.Code != 0 {
		return err_
	}

	isOwner := false
	for _, owner := range owners {
		if owner == channelD.UserId {
			isOwner = true
			break
		}
	}

	if !(isOwner) {
		return mainmodel.MakeError(35, "no authority to delete channel")
	}

	_, privatePw, err := checkdao.ChannelPassword(channelD.Id)
	if err.Code != 0 {
		return err
	}
	if privatePw != channelD.PrivatePw {
		return mainmodel.MakeError(35, "inccorect password")
	}

	return channeldao.ChannelDelete(channelD.Id)
}

func ChannelUpdate(channelU makeupmodel.ChannelCUD) mainmodel.Error {
	if len(channelU.WorkspaceId) != 26 {
		return mainmodel.MakeError(33, "Invalid workspace ID")
	}

	// Check if the user is an owner and public password is correct
	owners, err_ := checkdao.ChannelGetOwnerId(channelU.Id)
	if err_.Code != 0 {
		return err_
	}

	isOwner := false
	for _, owner := range owners {
		if owner == channelU.UserId {
			isOwner = true
			break
		}
	}

	if !(isOwner) {
		return mainmodel.MakeError(35, "no authority to update channel")
	}

	_, privatePw, err := checkdao.ChannelPassword(channelU.Id)
	if err.Code != 0 {
		return err
	}
	if privatePw != channelU.PrivatePw {
		fmt.Println("input:", privatePw, "answer:", channelU.PrivatePw)
		return mainmodel.MakeError(35, "inccorect password")
	}

	return channeldao.ChannelUpdate(channelU.Channel)
}
