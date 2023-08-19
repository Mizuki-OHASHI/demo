package statisticsdao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"log"
)

func ChannelMessageCounts(ChannelId string) ([]mainmodel.MessageCount, mainmodel.Error) {
	var mcs []mainmodel.MessageCount

	rows, err := maindao.Db.Query(
		`SELECT HOUR(postedAt), COUNT(*) FROM message
		WHERE ChannelId = ? GROUP BY HOUR(postedAt) ORDER BY HOUR(postedAt) ASC`,
		ChannelId,
	)

	if err != nil {
		log.Printf("fail: db.Query @ChannelMessageCounts, %v\n", err)
		return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @ChannelMessageCounts, %v\n", err))
	}

	for rows.Next() {
		var m mainmodel.MessageCount
		if err := rows.Scan(
			&m.Hour, &m.Count,
		); err != nil {
			log.Printf("fail: rows.Scan @ChannelMessageCounts, %v\n", err)
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @ChannelMessageCounts, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @ChannelMessageCounts, %v\n", err_)
				return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Close @ChannelMessageCounts, %v\n", err_))
			}

			return nil, err
		}

		mcs = append(mcs, m)
	}

	return mcs, mainmodel.NilError
}

func ChannelMessageLength(userId string) ([]mainmodel.MessageLength, mainmodel.Error) {
	var mls []mainmodel.MessageLength

	rows, err := maindao.Db.Query(
		`SELECT COUNT(*), LENGTH(body) FROM message WHERE channelId = ? GROUP BY LENGTH(body) ORDER BY LENGTH(body) ASC`,
		userId,
	)

	if err != nil {
		log.Printf("fail: db.Query @ChannelMessageLengths, %v\n", err)
		return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @ChannelMessageLengths, %v\n", err))
	}

	for rows.Next() {
		var m mainmodel.MessageLength
		if err := rows.Scan(
			&m.Rate, &m.Length,
		); err != nil {
			log.Printf("fail: rows.Scan @ChannelMessageLengths, %v\n", err)
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @ChannelMessageLengths, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @ChannelMessageLengths, %v\n", err_)
				return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Close @ChannelMessageLengths, %v\n", err_))
			}

			return nil, err
		}

		mls = append(mls, m)
	}

	return mls, mainmodel.NilError
}
