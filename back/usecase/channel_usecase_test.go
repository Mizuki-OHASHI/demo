package usecase

import (
	"hackathon/model/mainmodel"
	"hackathon/model/makeupmodel"
	"reflect"
	"testing"
)

func TestChannelCreate(t *testing.T) {
	tests := []struct {
		name string
		args makeupmodel.ChannelCUD
		want mainmodel.Error
	}{
		{name: "Invalid workspace ID",
			args: makeupmodel.ChannelCUD{Channel: mainmodel.Channel{Id: "1234567890123456789012345678"}},
			want: mainmodel.Error{Code: 33, Detail: "Invalid workspace ID"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := ChannelCreate(tt.args); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ChannelCreate() = %v, want %v", got, tt.want)
			}
		})
	}
}
