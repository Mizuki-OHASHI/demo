package makeupmodel

import "hackathon/model/mainmodel"

type MessageCUD struct {
	mainmodel.Message `json:"message"`
}

type ReplyCUD struct {
	mainmodel.Reply `json:"reply"`
}

type UserCUD struct {
	mainmodel.User `json:"user"`
}

type ChannelCUD struct {
	UserId            string `json:"userid"`
	mainmodel.Channel `json:"channel"`
}

type WorkspaceCUD struct {
	UserId              string `json:"userid"`
	mainmodel.Workspace `json:"workspace"`
}
