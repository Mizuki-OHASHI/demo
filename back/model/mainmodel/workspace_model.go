package mainmodel

type Workspace struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"createdat"`
	Bio       string `json:"bio"`
	Img       string `json:"img"`
	PublicPw  string `json:"publicpassword"`
	PrivatePw string `json:"privatepassword"`
	Deleted   bool   `json:"deleted"`
	Flag      bool   `json:"flag"`
}