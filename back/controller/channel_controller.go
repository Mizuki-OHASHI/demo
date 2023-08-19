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

func channelController(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("FRONT_END_DOMAIN"))
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	fmt.Printf("request: %s, URL: %s, Query: %s\n", r.Method, r.URL, r.URL.Query())

	switch r.Method {
	case http.MethodOptions:
		// w.WriteHeader(http.StatusOK)
		return

	case http.MethodGet:
		channelGet(w, r)
		return

	case http.MethodPost:
		channelCreate(w, r)
		return

	case http.MethodPut:
		channelUpdate(w, r)
		return

	case http.MethodDelete:
		channelDelete(w, r)
		return

	default:
		log.Printf("fail: HTTP Method is %s @channel_controller\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func channelGet(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	channelId := query.Get("id")

	channelInfo := usecase.ChannelGet(channelId)
	fmt.Println("channelInfo", channelInfo)

	if channelInfo.Error.Code == 1 {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, err := json.Marshal(channelInfo)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(res)
}

func channelCreate(w http.ResponseWriter, r *http.Request) {
	var channelC makeupmodel.ChannelCUD

	if err := json.NewDecoder(r.Body).Decode(&channelC); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println(channelC)

	err := usecase.ChannelCreate(channelC)
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

func channelDelete(w http.ResponseWriter, r *http.Request) {
	var channelD makeupmodel.ChannelCUD

	if err := json.NewDecoder(r.Body).Decode(&channelD); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println(channelD)

	err := usecase.ChannelDelete(channelD)
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

func channelUpdate(w http.ResponseWriter, r *http.Request) {
	var channelU makeupmodel.ChannelCUD

	if err := json.NewDecoder(r.Body).Decode(&channelU); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println(channelU)

	err := usecase.ChannelUpdate(channelU)
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
