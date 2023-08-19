package statisticsdao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"log"
)

func WorkspaceMessageCounts(WorkspaceId string) ([]mainmodel.MessageCount, mainmodel.Error) {
	var mcs []mainmodel.MessageCount

	rows, err := maindao.Db.Query(
		`SELECT HOUR(postedAt), COUNT(*) FROM message
		INNER JOIN channel ON channelId = channel.id
		WHERE workspaceId = ? GROUP BY HOUR(postedAt) ORDER BY HOUR(postedAt) ASC`,
		WorkspaceId,
	)

	if err != nil {
		log.Printf("fail: db.Query @WorkspaceMessageCounts, %v\n", err)
		return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query @WorkspaceMessageCounts, %v\n", err))
	}

	for rows.Next() {
		var m mainmodel.MessageCount
		if err := rows.Scan(
			&m.Hour, &m.Count,
		); err != nil {
			log.Printf("fail: rows.Scan @WorkspaceMessageCounts, %v\n", err)
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan @WorkspaceMessageCounts, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close @WorkspaceMessageCounts, %v\n", err_)
				return nil, mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Close @WorkspaceMessageCounts, %v\n", err_))
			}

			return nil, err
		}

		mcs = append(mcs, m)
	}

	return mcs, mainmodel.NilError
}
