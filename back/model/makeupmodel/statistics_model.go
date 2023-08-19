package makeupmodel

import "hackathon/model/mainmodel"

type UserStatistics struct {
	Id              string                    `json:"id"`
	MessageCounts   []mainmodel.MessageCount  `json:"messagecounts"`
	MessageLength   []mainmodel.MessageLength `json:"messagelengths"`
	mainmodel.Error `json:"error"`
}

type ChannelStatistics struct {
	Id              string                    `json:"id"`
	MessageCounts   []mainmodel.MessageCount  `json:"messagecounts"`
	MessageLength   []mainmodel.MessageLength `json:"messagelength"`
	mainmodel.Error `json:"error"`
}

type WorkspaceStatistics struct {
	Id              string                    `json:"id"`
	MessageCounts   []mainmodel.MessageCount  `json:"messagecounts"`
	MessageLength   []mainmodel.MessageLength `json:"messagelength"`
	mainmodel.Error `json:"error"`
}

func FillHourBlank(MessageCounts []mainmodel.MessageCount) []mainmodel.MessageCount {
	mcs := make([]mainmodel.MessageCount, 24)
	for i := 0; i < 24; i++ {
		mcs[i] = mainmodel.MessageCount{Hour: i, Count: 0}
	}

	for _, mc := range MessageCounts {
		mcs[mc.Hour].Count = mc.Count
	}

	return mcs
}

func CalcRate(MessageLengths []mainmodel.MessageLength) []mainmodel.MessageLength {
	var sum int = 0
	for _, cl := range MessageLengths {
		sum += cl.Rate
	}

	var c int = 0
	for i, cl := range MessageLengths {
		c += cl.Rate
		MessageLengths[i].Rate = c * 100 / sum
	}

	return MessageLengths
}
