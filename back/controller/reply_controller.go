package controller

import (
	"encoding/json"
	"fmt"
	"hackathon/model/makeupmodel"
	"hackathon/usecase"
	"log"
	"net/http"
	"os"
)

func replyController(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("FRONT_END_DOMAIN"))
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	fmt.Printf("request: %s, URL: %s, Query: %s\n", r.Method, r.URL, r.URL.Query())
	
	switch r.Method {
	case http.MethodOptions:
		// w.WriteHeader(http.StatusOK)
		return

	case http.MethodGet:
		// replyGet(w, r)
		return

	case http.MethodPost:
		replyCreate(w, r)
		return

	case http.MethodPut:
		replyUpdate(w, r)
		return

	case http.MethodDelete:
		replyDelete(w, r)
		return

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}


func replyCreate(w http.ResponseWriter, r *http.Request) {
	var replyC makeupmodel.ReplyCUD

	if err := json.NewDecoder(r.Body).Decode(&replyC); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err := usecase.ReplyCreate(replyC)
	if err.Code == 1 {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, err_ := json.Marshal(err)
	if err_ != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(res)
}

func replyDelete(w http.ResponseWriter, r *http.Request) {
	var replyD makeupmodel.ReplyCUD

	if err := json.NewDecoder(r.Body).Decode(&replyD); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err := usecase.ReplyDelete(replyD)
	if err.Code == 1 {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, err_ := json.Marshal(err)
	if err_ != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(res)
}

func replyUpdate(w http.ResponseWriter, r *http.Request) {
	var replyU makeupmodel.ReplyCUD

	if err := json.NewDecoder(r.Body).Decode(&replyU); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err := usecase.ReplyUpdate(replyU)
	if err.Code == 1 {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, err_ := json.Marshal(err)
	if err_ != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(res)
}