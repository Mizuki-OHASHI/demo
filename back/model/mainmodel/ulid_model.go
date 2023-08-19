package mainmodel

import (
	"math/rand"
	"time"

	"github.com/oklog/ulid"
)

func makeId() string {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)
	return id.String()
}

func (m *Message) MakeId() Error {
	if m.Id == "" {
		m.Id = makeId()
		return NilError
	} else {
		return MakeError(44, "fail : ID already exists")
	}
}

func (m *Reply) MakeId() Error {
	if m.Id == "" {
		m.Id = makeId()
		return NilError
	} else {
		return MakeError(44, "fail : ID already exists")
	}
}

func (c *Channel) MakeId() Error {
	if c.Id == "" {
		c.Id = makeId()
		return NilError
	} else {
		return MakeError(34, "fail : ID already exists")
	}
}

func (w *Workspace) MakeId() Error {
	if w.Id == "" {
		w.Id = makeId()
		return NilError
	} else {
		return MakeError(24, "fail : ID already exists")
	}
}
