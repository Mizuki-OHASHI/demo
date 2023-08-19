package usecase

import (
	"hackathon/dao/checkdao"
	"hackathon/dao/workspacedao"
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"log"
)

func WorkspaceGet(workspaceId string) makeupmodel.WorkspaceInfo {
	workspaceInfo, err := workspacedao.WorkspaceGet(workspaceId)
	if err != nil {
		log.Println("an error occurred at usecase/workspace_usecase")
		return workspaceInfo
	}

	return workspaceInfo
}

func WorkspaceCreate(workspaceC makeupmodel.WorkspaceCUD) mainmodel.Error {
	b, err := checkdao.WorkspaceExists(workspaceC.Name)
	if err.Code != 0 {
		return err
	}

	if b {
		return mainmodel.MakeError(22, "workspace already exists")
	}

	if err := workspaceC.MakeId(); err.Code != 0 {
		return err
	}

	if err := workspacedao.WorkspaceCreate(workspaceC.Workspace); err.Code != 0 {
		return err
	}

	return userJoinWorkspace(workspaceC.UserId, workspaceC.Id, true, workspaceC.PrivatePw)
}

func WorkspaceDelete(workspaceD makeupmodel.WorkspaceCUD) mainmodel.Error {
	// Check if the user is an owner and public password is correct
	owners, err_ := checkdao.WorkspaceGetOwnerId(workspaceD.Id)

	if err_.Code != 0 {
		return err_
	}

	isOwner := false
	for _, owner := range owners {
		if owner == workspaceD.UserId {
			isOwner = true
			break
		}
	}

	if !(isOwner) {
		return mainmodel.MakeError(25, "no authority to delete workspace")
	}

	_, privatePw, err := checkdao.WorkspacePassword(workspaceD.Id)
	if err.Code != 0 {
		return err
	}
	if privatePw != workspaceD.PrivatePw {
		return mainmodel.MakeError(25, "inccorect password")
	}

	return workspacedao.WorkspaceDelete(workspaceD.Id)
}

func WorkspaceUpdate(workspaceU makeupmodel.WorkspaceCUD) mainmodel.Error {
	// Check if the user is an owner and public password is correct
	owners, err_ := checkdao.WorkspaceGetOwnerId(workspaceU.Id)
	if err_.Code != 0 {
		return err_
	}

	isOwner := false
	for _, owner := range owners {
		if owner == workspaceU.UserId {
			isOwner = true
			break
		}
	}

	if !(isOwner) {
		return mainmodel.MakeError(25, "no authority to delete workspace")
	}

	_, privatePw, err := checkdao.WorkspacePassword(workspaceU.Id)
	if err.Code != 0 {
		return err
	}
	if privatePw != workspaceU.PrivatePw {
		return mainmodel.MakeError(25, "inccorect password")
	}

	return workspacedao.WorkspaceUpdate(workspaceU.Workspace)
}

func GetAllWorkspace() makeupmodel.Workspaces {
	return workspacedao.GetAllWorkspace()
}
