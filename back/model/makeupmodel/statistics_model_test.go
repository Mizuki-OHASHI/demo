package makeupmodel

import (
	"hackathon/model/mainmodel"
	"reflect"
	"testing"
)

func Test_FillHourBlank(t *testing.T) {
	tests := []struct {
		name string
		args []mainmodel.MessageCount
		want []mainmodel.MessageCount
	}{
		{
			name: "test1",
			args: []mainmodel.MessageCount{{Hour: 1, Count: 1}},
			want: []mainmodel.MessageCount{{Hour: 0, Count: 0}, {Hour: 1, Count: 1}, {Hour: 2, Count: 0}, {Hour: 3, Count: 0}, {Hour: 4, Count: 0}, {Hour: 5, Count: 0}, {Hour: 6, Count: 0}, {Hour: 7, Count: 0}, {Hour: 8, Count: 0}, {Hour: 9, Count: 0}, {Hour: 10, Count: 0}, {Hour: 11, Count: 0}, {Hour: 12, Count: 0}, {Hour: 13, Count: 0}, {Hour: 14, Count: 0}, {Hour: 15, Count: 0}, {Hour: 16, Count: 0}, {Hour: 17, Count: 0}, {Hour: 18, Count: 0}, {Hour: 19, Count: 0}, {Hour: 20, Count: 0}, {Hour: 21, Count: 0}, {Hour: 22, Count: 0}, {Hour: 23, Count: 0}},
		},
		{
			name: "test2",
			args: []mainmodel.MessageCount{{Hour: 1, Count: 1}, {Hour: 23, Count: 4}},
			want: []mainmodel.MessageCount{{Hour: 0, Count: 0}, {Hour: 1, Count: 1}, {Hour: 2, Count: 0}, {Hour: 3, Count: 0}, {Hour: 4, Count: 0}, {Hour: 5, Count: 0}, {Hour: 6, Count: 0}, {Hour: 7, Count: 0}, {Hour: 8, Count: 0}, {Hour: 9, Count: 0}, {Hour: 10, Count: 0}, {Hour: 11, Count: 0}, {Hour: 12, Count: 0}, {Hour: 13, Count: 0}, {Hour: 14, Count: 0}, {Hour: 15, Count: 0}, {Hour: 16, Count: 0}, {Hour: 17, Count: 0}, {Hour: 18, Count: 0}, {Hour: 19, Count: 0}, {Hour: 20, Count: 0}, {Hour: 21, Count: 0}, {Hour: 22, Count: 0}, {Hour: 23, Count: 4}},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := FillHourBlank(tt.args); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("fillHourBlank() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestCalcRate(t *testing.T) {
	tests := []struct {
		name string
		args []mainmodel.MessageLength
		want []mainmodel.MessageLength
	}{
		{name: "test1",
			args: []mainmodel.MessageLength{{Rate: 4, Length: 0}, {Rate: 2, Length: 0}, {Rate: 7, Length: 0}, {Rate: 4, Length: 0}, {Rate: 2, Length: 0}, {Rate: 9, Length: 0}, {Rate: 3, Length: 0}, {Rate: 5, Length: 0}, {Rate: 6, Length: 0}, {Rate: 9, Length: 0}, {Rate: 1, Length: 0}, {Rate: 9, Length: 0}, {Rate: 1, Length: 0}, {Rate: 1, Length: 0}, {Rate: 5, Length: 0}, {Rate: 2, Length: 0}, {Rate: 7, Length: 0}, {Rate: 9, Length: 0}, {Rate: 4, Length: 0}, {Rate: 5, Length: 0}},
			want: []mainmodel.MessageLength{{Rate: 4, Length: 0}, {Rate: 6, Length: 0}, {Rate: 13, Length: 0}, {Rate: 17, Length: 0}, {Rate: 20, Length: 0}, {Rate: 29, Length: 0}, {Rate: 32, Length: 0}, {Rate: 37, Length: 0}, {Rate: 44, Length: 0}, {Rate: 53, Length: 0}, {Rate: 54, Length: 0}, {Rate: 64, Length: 0}, {Rate: 65, Length: 0}, {Rate: 66, Length: 0}, {Rate: 71, Length: 0}, {Rate: 73, Length: 0}, {Rate: 81, Length: 0}, {Rate: 90, Length: 0}, {Rate: 94, Length: 0}, {Rate: 100, Length: 0}},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CalcRate(tt.args); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("CalcRate() = %v, want %v", got, tt.want)
			}
		})
	}
}
