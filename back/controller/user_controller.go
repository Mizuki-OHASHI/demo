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

func userController(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("FRONT_END_DOMAIN"))
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	fmt.Printf("request: %s, URL: %s, Query: %s\n", r.Method, r.URL, r.URL.Query())

	switch r.Method {
	case http.MethodOptions:
		// w.WriteHeader(http.StatusOK)
		return

	case http.MethodGet:
		userGet(w, r)
		return

	case http.MethodPost:
		userCreate(w, r)
		return

	case http.MethodPut:
		userUpdate(w, r)
		return

	case http.MethodDelete:
		userDelete(w, r)
		return

	default:
		log.Printf("fail: HTTP Method is %s @user_controller\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func userGet(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	userId := query.Get("id")

	userInfo := usecase.UserGet(userId)

	if userInfo.Error.Code == 1 {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, err := json.Marshal(userInfo)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(res)
}

func userCreate(w http.ResponseWriter, r *http.Request) {
	var userC makeupmodel.UserCUD

	if err := json.NewDecoder(r.Body).Decode(&userC); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println(userC)

	err := usecase.UserCreate(userC)
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

func userDelete(w http.ResponseWriter, r *http.Request) {
	var userD makeupmodel.UserCUD

	if err := json.NewDecoder(r.Body).Decode(&userD); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println(userD)

	err := usecase.UserDelete(userD)
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

func userUpdate(w http.ResponseWriter, r *http.Request) {
	var userU makeupmodel.UserCUD

	if err := json.NewDecoder(r.Body).Decode(&userU); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println(userU)

	err := usecase.UserUpdate(userU)
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

/*------------------------------------------------------------/
func userDelete(w http.ResponseWriter, r *http.Request) {
	var user model.UserCert

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err := userusecase.UserDelete(user)
	if err.Original != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	byte, err_ := json.Marshal(err.Decrease())
	if err_ != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(byte)
}

func userUpdate(w http.ResponseWriter, r *http.Request) {
	var user model.UserCert

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Printf("fail: json.NewDecoder.Decode, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err := userusecase.UserUpdate(user)
	if err.Original != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	byte, err_ := json.Marshal(err.Decrease())
	if err_ != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(byte)
}

/*------------------------------------------------------------*/
