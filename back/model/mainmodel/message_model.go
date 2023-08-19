package mainmodel
type Message struct {
	Id        string `json:"id"`
	Title     string `json:"title"`
	Body      string `json:"body"`
	PostedAt  string `json:"postedat"`
	PostedBy  string `json:"postedby"`
	Name      string `json:"name"`
	Icon			string `json:"icon"`
	ChannelId string `json:"channelid"`
	Edited    bool   `json:"edited"`
	Deleted   bool   `json:"deleted"`
}

type Reply struct {
	Id        string `json:"id"`
	Title     string `json:"title"`
	Body      string `json:"body"`
	PostedAt  string `json:"postedat"`
	PostedBy  string `json:"postedby"`
	Name      string `json:"name"`
	Icon			string `json:"icon"`
	ReplyTo   string `json:"replyto"`
	Edited    bool   `json:"edited"`
	Deleted   bool   `json:"deleted"`
}