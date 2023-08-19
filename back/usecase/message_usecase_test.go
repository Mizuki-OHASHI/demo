package usecase

import (
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"reflect"
	"testing"
)

func TestMessageCreate(t *testing.T) {
	tests := []struct {
		name string
		args makeupmodel.MessageCUD
		want mainmodel.Error
	}{
		{
			name: "Invalid channel ID",
			args: makeupmodel.MessageCUD{Message: mainmodel.Message{ChannelId: "1234567890123456789012345678"}},
			want: mainmodel.Error{Code: 43, Detail: "Invalid channel ID"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := MessageCreate(tt.args); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("MessageCreate() = %v, want %v", got, tt.want)
			}
		})
	}
}
