package mainmodel

type User struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Bio     string `json:"bio"`
	Img     string `json:"img"`
	Deleted bool   `json:"deleted"`
	Flag    bool   `json:"flag"`
}

