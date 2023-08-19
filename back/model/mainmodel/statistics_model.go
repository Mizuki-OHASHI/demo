package mainmodel

type MessageCount struct {
	Hour  int `json:"hour"`
	Count int `json:"count"`
}

type MessageLength struct {
	Rate   int `json:"rate"`
	Length int `json:"length"`
}
