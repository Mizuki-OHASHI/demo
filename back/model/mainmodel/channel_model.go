package mainmodel

type Channel struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"createdat"`
	Bio       string `json:"bio"`
	PublicPw  string `json:"publicpassword"`
	PrivatePw string `json:"privatepassword"`
	Deleted   bool   `json:"deleted"`
	WorkspaceId string `json:"workspaceid"`
	Flag      bool   `json:"flag"`
}
