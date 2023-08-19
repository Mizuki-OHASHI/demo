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

func joinController(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("FRONT_END_DOMAIN"))
	w.Header().Set("Access-Control-Allow-Methods", "POST, DELETE, OPTIONS")

	fmt.Printf("request: %s, URL: %s, Query: %s\n", r.Method, r.URL, r.URL.Query())
	
	switch r.Method {
	case http.MethodOptions:
		// w.WriteHeader(http.StatusOK)
		return

	case http.MethodGet:
		getAllWorkspace(w, r)
		return

	case http.MethodPost:
		userJoin(w, r)
		return

	// case http.MethodDelete:
	// 	leave(w, r)
	// 	return

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func userJoin(w http.ResponseWriter, r *http.Request) {
	var joinInfo makeupmodel.JoinInfo

	if err := json.NewDecoder(r.Body).Decode(&joinInfo); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err := usecase.UserJoin(joinInfo)
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

func getAllWorkspace(w http.ResponseWriter, r *http.Request) {
	workspaces := usecase.GetAllWorkspace()

	if workspaces.Error.Code == 1 {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, err := json.Marshal(workspaces)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(res)
}

/*
func userLeave(w http.ResponseWriter, r *http.Request) {
	var leaveInfo makeupmodel.JoinInfo

	if err := json.NewDecoder(r.Body).Decode(&joinInfo); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err := usecase.UserJoin(joinInfo)
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
*/