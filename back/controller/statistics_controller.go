package controller

import (
	"encoding/json"
	"fmt"
	"hackathon/usecase"
	"log"
	"net/http"
	"os"
)

func statisticsController(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("FRONT_END_DOMAIN"))
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

	fmt.Printf("request: %s, URL: %s, Query: %s\n", r.Method, r.URL, r.URL.Query())

	switch r.Method {
	case http.MethodOptions:
		// w.WriteHeader(http.StatusOK)
		return

	case http.MethodGet:
		MessageCounts(w, r)
		return

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func MessageCounts(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	typ := query.Get("type")
	id := query.Get("id")

	switch typ {
	case "user":
		us := usecase.UserMessageCounts(id)

		if us.Error.Code == 1 {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		fmt.Println(us.MessageLength)

		res, err := json.Marshal(us)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.Write(res)

	case "channel":
		us := usecase.ChannelMessageCounts(id)

		if us.Error.Code == 1 {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		fmt.Printf("request: %s, URL: %s, Query: %s\n", r.Method, r.URL, r.URL.Query())

		res, err := json.Marshal(us)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.Write(res)

	case "workspace":
		us := usecase.WorkspaceMessageCounts(id)

		if us.Error.Code == 1 {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		res, err := json.Marshal(us)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.Write(res)

	default:
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}
