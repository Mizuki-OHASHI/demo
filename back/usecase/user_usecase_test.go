package usecase

import (
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"reflect"
	"testing"
)

func TestUserCreate(t *testing.T) {
	tests := []struct {
		name string
		args makeupmodel.UserCUD
		want mainmodel.Error
	}{
		{
			name: "Invalid user ID",
			args: makeupmodel.UserCUD{User: mainmodel.User{Id: "12345678901234567890123456"}},
			want: mainmodel.Error{Code: 15, Detail: "Invalid user ID"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := UserCreate(tt.args); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("UserCreate() = %v, want %v", got, tt.want)
			}
		})
	}
}
