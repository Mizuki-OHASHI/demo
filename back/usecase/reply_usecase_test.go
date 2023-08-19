package usecase

import (
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"reflect"
	"testing"
)

func TestReplyCreate(t *testing.T) {
	tests := []struct {
		name string
		args makeupmodel.ReplyCUD
		want mainmodel.Error
	}{
		{
			name: "Invalid message ID",
			args: makeupmodel.ReplyCUD{Reply: mainmodel.Reply{ReplyTo: "1234567890123456789012345678"}},
			want: mainmodel.Error{Code: 63, Detail: "Invalid message ID"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := ReplyCreate(tt.args); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ReplyCreate() = %v, want %v", got, tt.want)
			}
		})
	}
}
