package makeupmodel

import "hackathon/model/mainmodel"

type JoinInfo struct {
	UserId string `json:"userid"`
	Direction string `json:"direction"`
	Id string `json:"id"`
	Password string `json:"password"`
	Owner bool `json:"owner"`
}

type Workspaces struct {
	List []mainmodel.Workspace `json:"list"`
	mainmodel.Error `json:"error"`
}