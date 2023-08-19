func WorkspacePassword(workspaceId string) (string, string, submodel.Error) {
	rows, err := maindao.Db.Query("select publicPw, privatePw from workspace where id = ?", workspaceId)

	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return "", "", submodel.MakeError(1, fmt.Sprintf("fail: db.Query, %v\n", err))
	}

	var (
		publicPw string
		privatePw string
	)

	for rows.Next() {
		if err := rows.Scan(&publicPw, &privatePw); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)
			err := submodel.MakeError(1, fmt.Sprintf("fail: rows.Scan, %v\n", err))

			if err_ := rows.Close(); err_ != nil {
				log.Printf("fail: rows.Close, %v\n", err_)
				err.UpdateError(1, fmt.Sprintf("fail: rows.Close, %v\n", err))
				return "", "", err
			}

			return "", "", err
		}
	}

	return publicPw, privatePw, submodel.NilError
}