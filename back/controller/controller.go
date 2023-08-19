package controller

import (
	"fmt"
	"net/http"
	"os"
)

func Handler() {
	version := os.Getenv("VERSION")

	http.HandleFunc(fmt.Sprintf("/v%s/user", version), userController)
	http.HandleFunc(fmt.Sprintf("/v%s/join", version), joinController)
	http.HandleFunc(fmt.Sprintf("/v%s/channel", version), channelController)
	http.HandleFunc(fmt.Sprintf("/v%s/message", version), messageController)
	http.HandleFunc(fmt.Sprintf("/v%s/reply", version), replyController)
	http.HandleFunc(fmt.Sprintf("/v%s/workspace", version), workspaceController)
	http.HandleFunc(fmt.Sprintf("/v%s/statistics", version), statisticsController)
}
