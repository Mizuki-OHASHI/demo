package usecase

import (
	"hackathon/dao/checkdao"
	"hackathon/dao/userdao"
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"log"
)

func UserGet(userId string) makeupmodel.UserInfo {
	userInfo, err := userdao.UserGet(userId)
	if err != nil {
		log.Println("an error occurred at usecase/user_usecase")
		return userInfo
	}

	return userInfo
}

func UserJoin(joinInfo makeupmodel.JoinInfo) mainmodel.Error {
	switch joinInfo.Direction {
	case "channel":
		return userJoinChannel(joinInfo.UserId, joinInfo.Id, joinInfo.Owner, joinInfo.Password)
	case "workspace":
		return userJoinWorkspace(joinInfo.UserId, joinInfo.Id, joinInfo.Owner, joinInfo.Password)
	default:
		return mainmodel.MakeError(53, "error: join direction is invalid")
	}
}

func userJoinChannel(userId string, channelId string, owner bool, password string) mainmodel.Error {
	publicPw, privatePw, err := checkdao.ChannelPassword(channelId)

	if err.Code == 1 {
		log.Println("error occurred at usecase/user_usecsase")
		return err
	}

	if owner {
		if privatePw == password {
			return userdao.UserJoinChannel(userId, channelId, true)
		} else {
			log.Println("error: incorrect password")
			return mainmodel.MakeError(35, "error: incorrect password")
		}
	} else {
		if publicPw == password {
			return userdao.UserJoinChannel(userId, channelId, false)
		} else {
			log.Println("error: incorrect password")
			return mainmodel.MakeError(35, "error: incorrect password")
		}
	}
}

func userJoinWorkspace(userId string, workspaceId string, owner bool, password string) mainmodel.Error {
	publicPw, privatePw, err := checkdao.WorkspacePassword(workspaceId)

	if err.Code == 1 {
		log.Println("error occurred at usecase/user_usecsase")
		return err
	}

	if owner {
		if privatePw == password {
			return userdao.UserJoinWorkspace(userId, workspaceId, true)
		} else {
			log.Println("error: incorrect password")
			return mainmodel.MakeError(35, "error: incorrect password")
		}
	} else {
		if publicPw == password {
			return userdao.UserJoinWorkspace(userId, workspaceId, false)
		} else {
			log.Println("error: incorrect password")
			return mainmodel.MakeError(35, "error: incorrect password")
		}
	}
}

func UserCreate(userC makeupmodel.UserCUD) mainmodel.Error {
	if len(userC.User.Id) != 28 {
		return mainmodel.MakeError(15, "Invalid user ID")
	}

	b, err := checkdao.UserExists(userC.Id)
	if err.Code != 0 {
		return err
	}

	if b {
		return userdao.UserUpdate(userC.User)
	}

	return userdao.UserCreate(userC.User)
}

func UserDelete(userD makeupmodel.UserCUD) mainmodel.Error {
	return userdao.UserDelete(userD.Id)
}

func UserUpdate(userU makeupmodel.UserCUD) mainmodel.Error {
	return userdao.UserUpdate(userU.User)
}
