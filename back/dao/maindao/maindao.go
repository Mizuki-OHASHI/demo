package maindao

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	_ "github.com/go-sql-driver/mysql"
)

var Db *sql.DB

func OpenSql() {
	var (
		mysqlUser     = os.Getenv("MYSQL_USER")
		mysqlUserPwd  = os.Getenv("MYSQL_USER_PW")
		mysqlHost     = os.Getenv("MYSQL_HOST")
		mysqlDatabase = os.Getenv("MYSQL_DATABASE")
	)

	// log.Printf("%s:%s@(%s)/%s", mysqlUser, mysqlUserPwd, mysqlHost, mysqlDatabase)

	connStr := fmt.Sprintf("%s:%s@%s/%s?parseTime=true", mysqlUser, mysqlUserPwd, mysqlHost, mysqlDatabase)
	Db_, err := sql.Open("mysql", connStr)
	if err != nil {
		log.Fatalf("fail: sql.Open, %v\n", err)
	}

	if err := Db_.Ping(); err != nil {
		log.Fatalf("fail: Db_.Ping, %v\n", err)
	}

	Db = Db_
}

func CloseDBWithSysCall() {
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGTERM, syscall.SIGINT)

	go func() {
		s := <-sig
		log.Printf("received syscall, %v\n", s)

		if err := Db.Close(); err != nil {
			log.Fatal(err)
		}

		log.Printf("success: Db.Close")
		os.Exit(0)
	}()
}
