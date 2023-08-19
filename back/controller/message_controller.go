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

func messageController(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("FRONT_END_DOMAIN"))
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	fmt.Printf("request: %s, URL: %s, Query: %s\n", r.Method, r.URL, r.URL.Query())
	
	switch r.Method {
	case http.MethodOptions:
		// w.WriteHeader(http.StatusOK)
		return

	case http.MethodGet:
		messageGet(w, r)
		return

	case http.MethodPost:
		messageCreate(w, r)
		return

	case http.MethodPut:
		messageUpdate(w, r)
		return

	case http.MethodDelete:
		messageDelete(w, r)
		return

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}


func messageGet(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	messageId := query.Get("id")

	messageInfo := usecase.MessageGet(messageId)

	if messageInfo.Error.Code == 1 {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, err := json.Marshal(messageInfo)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(res)
}

func messageCreate(w http.ResponseWriter, r *http.Request) {
	var messageC makeupmodel.MessageCUD

	if err := json.NewDecoder(r.Body).Decode(&messageC); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err := usecase.MessageCreate(messageC)
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

func messageDelete(w http.ResponseWriter, r *http.Request) {
	var messageD makeupmodel.MessageCUD

	if err := json.NewDecoder(r.Body).Decode(&messageD); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err := usecase.MessageDelete(messageD)
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

func messageUpdate(w http.ResponseWriter, r *http.Request) {
	var messageU makeupmodel.MessageCUD

	if err := json.NewDecoder(r.Body).Decode(&messageU); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err := usecase.MessageUpdate(messageU)
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