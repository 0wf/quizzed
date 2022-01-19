package main

import (
	"html"
)

func Clean(s *string) {
	*s = html.UnescapeString(*s)
}
