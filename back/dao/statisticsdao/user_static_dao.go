package statisticsdao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"log"
)

func UserMessageCounts(userId string) ([]mainmodel.MessageCount, mainmodel.Error) {
	var mcs []mainmodel.MessageCount

	rows, err := maindao.Db.Query(
		`SELECT HOUR(postedAt), COUNT(*) FROM message
		WHERE PostedBy = ? GROUP BY HOUR(postedAt) ORDER BY HOUR(postedAt) ASC`,
		userId,
	)

	if err != nil {
		log.Printf("fail: db.Query @UserMessageCounts, %v\n", err)
		return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @UserMessageCounts, %v\n", err))
	}

	for rows.Next() {
		var m mainmodel.MessageCount
		if err := rows.Scan(
			&m.Hour, &m.Count,
		); err != nil {
			log.Printf("fail: rows.Scan @UserMessageCounts, %v\n", err)
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @UserMessageCounts, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @UserMessageCounts, %v\n", err_)
				return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Close @UserMessageCounts, %v\n", err_))
			}

			return nil, err
		}

		mcs = append(mcs, m)
	}

	return mcs, mainmodel.NilError
}

func UserMessageLength(userId string) ([]mainmodel.MessageLength, mainmodel.Error) {
	var mls []mainmodel.MessageLength

	rows, err := maindao.Db.Query(
		`SELECT COUNT(*), LENGTH(body) FROM message WHERE PostedBy = ? GROUP BY LENGTH(body) ORDER BY LENGTH(body) ASC`,
		userId,
	)

	if err != nil {
		log.Printf("fail: db.Query @UserMessageLengths, %v\n", err)
		return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @UserMessageLengths, %v\n", err))
	}

	for rows.Next() {
		var m mainmodel.MessageLength
		if err := rows.Scan(
			&m.Rate, &m.Length,
		); err != nil {
			log.Printf("fail: rows.Scan @UserMessageLengths, %v\n", err)
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @UserMessageLengths, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @UserMessageLengths, %v\n", err_)
				return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Close @UserMessageLengths, %v\n", err_))
			}

			return nil, err
		}

		mls = append(mls, m)
	}

	return mls, mainmodel.NilError
}
