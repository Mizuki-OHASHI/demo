package makeupmodel

import "hackathon/model/mainmodel"

type UserInfo struct {
	mainmodel.User `json:"user"`
	Channels []mainmodel.Channel `json:"channels"`
	Workspaces []mainmodel.Workspace `json:"workspaces"`
	mainmodel.Error `json:"error"`
}

type ChannelInfo struct {
	mainmodel.Channel `json:"channel"`
	Members []mainmodel.User `json:"members"`
	Messages []mainmodel.Message `json:"messages"`
	mainmodel.Error `json:"error"`
}

type WorkspaceInfo struct {
	mainmodel.Workspace `json:"workspace"`
	Members []mainmodel.User `json:"members"`
	Channels []mainmodel.Channel `json:"channels"`
	mainmodel.Error `json:"error"`
}

type MessageInfo struct {
	Root mainmodel.Message `json:"root"`
	Replies []mainmodel.Reply `json:"replies"`
	mainmodel.Error `json:"error"`
}
