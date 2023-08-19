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

func workspaceController(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("FRONT_END_DOMAIN"))
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	fmt.Printf("request: %s, URL: %s, Query: %s\n", r.Method, r.URL, r.URL.Query())

	switch r.Method {
	case http.MethodOptions:
		// w.WriteHeader(http.StatusOK)
		return

	case http.MethodGet:
		workspaceGet(w, r)
		return

	case http.MethodPost:
		workspaceCreate(w, r)
		return

	case http.MethodPut:
		workspaceUpdate(w, r)
		return

	case http.MethodDelete:
		workspaceDelete(w, r)
		return

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func workspaceGet(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	workspaceId := query.Get("id")

	workspaceInfo := usecase.WorkspaceGet(workspaceId)

	if workspaceInfo.Error.Code == 1 {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, err := json.Marshal(workspaceInfo)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(res)
}

func workspaceCreate(w http.ResponseWriter, r *http.Request) {
	var workspaceC makeupmodel.WorkspaceCUD

	if err := json.NewDecoder(r.Body).Decode(&workspaceC); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println(workspaceC)

	err := usecase.WorkspaceCreate(workspaceC)
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

func workspaceDelete(w http.ResponseWriter, r *http.Request) {
	var workspaceD makeupmodel.WorkspaceCUD

	if err := json.NewDecoder(r.Body).Decode(&workspaceD); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println(workspaceD)

	err := usecase.WorkspaceDelete(workspaceD)
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

func workspaceUpdate(w http.ResponseWriter, r *http.Request) {
	var workspaceU makeupmodel.WorkspaceCUD

	if err := json.NewDecoder(r.Body).Decode(&workspaceU); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println(workspaceU)

	err := usecase.WorkspaceUpdate(workspaceU)
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
