package main

import (
	"fmt"
	"hackathon/controller"
	"hackathon/dao/maindao"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	controller.Handler()

	maindao.CloseDBWithSysCall()

	log.Printf("Listening...")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if err := http.ListenAndServe(fmt.Sprintf(":%s", port), nil); err != nil {
		log.Fatal(err)
	}
}

func init() {

	if err := godotenv.Load(".env"); err != nil {
		log.Printf("fail: godotenv.Load, %v\n", err)
	}

	maindao.OpenSql()
}
