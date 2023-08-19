package checkdao

import (
	"fmt"
	"hackathon/dao/maindao"
	"hackathon/model/mainmodel"
	"log"
)

func ChannelPassword(channelId string) (string, string, mainmodel.Error) {
	rows, err := maindao.Db.Query("select publicPw, privatePw from channel where id = ?", channelId)

	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return "", "", mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query, %v\n", err))
	}

	var (
		publicPw string
		privatePw string
	)

	for rows.Next() {
		if err := rows.Scan(&publicPw, &privatePw); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close, %v\n", err_)
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close, %v\n", err))
				return "", "", err
			}

			return "", "", err
		}
	}

	return publicPw, privatePw, mainmodel.NilError
}

func WorkspacePassword(workspaceId string) (string, string, mainmodel.Error) {
	rows, err := maindao.Db.Query("select publicPw, privatePw from workspace where id = ?", workspaceId)

	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return "", "", mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query, %v\n", err))
	}

	var (
		publicPw string
		privatePw string
	)

	for rows.Next() {
		if err := rows.Scan(&publicPw, &privatePw); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close, %v\n", err_)
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close, %v\n", err))
				return "", "", err
			}

			return "", "", err
		}
	}

	return publicPw, privatePw, mainmodel.NilError
}


func MessagePosterId(messageId string) (string, mainmodel.Error) {
	rows, err := maindao.Db.Query("select postedBy from message where id = ?", messageId)

	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return "", mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query, %v\n", err))
	}

	var posterId string

	for rows.Next() {
		if err := rows.Scan(&posterId); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close, %v\n", err_)
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close, %v\n", err))
				return "", err
			}

			return "", err
		}
	}

	return posterId, mainmodel.NilError
}


func ReplyPosterId(replyId string) (string, mainmodel.Error) {
	rows, err := maindao.Db.Query("select postedBy from reply where id = ?", replyId)

	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return "", mainmodel.MakeError(1, fmt.Sprintf("fail: db.Query, %v\n", err))
	}

	var posterId string

	for rows.Next() {
		if err := rows.Scan(&posterId); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)
			err := mainmodel.MakeError(1, fmt.Sprintf("fail: rows.Scan, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close, %v\n", err_)
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close, %v\n", err))
				return "", err
			}

			return "", err
		}
	}

	return posterId, mainmodel.NilError
}