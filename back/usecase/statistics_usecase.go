package usecase

import (
	"hackathon/dao/statisticsdao"
	"hackathon/model/makeupmodel"
)

func UserMessageCounts(userId string) makeupmodel.UserStatistics {
	mcs, err := statisticsdao.UserMessageCounts(userId)

	var us makeupmodel.UserStatistics

	if err.Code != 0 {
		us.Error = err
		return us
	}

	us.MessageCounts = makeupmodel.FillHourBlank(mcs)

	mls, err := statisticsdao.UserMessageLength(userId)

	if err.Code != 0 {
		us.Error = err
		return us
	}

	us.MessageLength = makeupmodel.CalcRate(mls)

	us.Id = userId

	return us
}

func ChannelMessageCounts(channelId string) makeupmodel.ChannelStatistics {
	mcs, err := statisticsdao.ChannelMessageCounts(channelId)

	var us makeupmodel.ChannelStatistics

	if err.Code != 0 {
		us.Error = err
		return us
	}

	us.MessageCounts = makeupmodel.FillHourBlank(mcs)

	us.MessageCounts = makeupmodel.FillHourBlank(mcs)

	mls, err := statisticsdao.ChannelMessageLength(channelId)

	if err.Code != 0 {
		us.Error = err
		return us
	}

	us.MessageLength = makeupmodel.CalcRate(mls)

	us.Id = channelId

	return us
}

func WorkspaceMessageCounts(workspaceId string) makeupmodel.WorkspaceStatistics {
	mcs, err := statisticsdao.WorkspaceMessageCounts(workspaceId)

	var us makeupmodel.WorkspaceStatistics

	if err.Code != 0 {
		us.Error = err
		return us
	}

	us.MessageCounts = makeupmodel.FillHourBlank(mcs)
	us.Id = workspaceId

	return us
}
