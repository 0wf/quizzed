package main

type Response struct {
	Results []Info `json:"results"`
}

type Info struct {
	Question         string   `json:"question"`
	CorrectAnswer    string   `json:"correct_answer"`
	IncorrectAnswers []string `json:"incorrect_answers"`
}

type Question struct {
	Question string `json:"question"`
	Answers []string `json:"answers"`
}

type Result struct {
	ID string `json:"id"`
	Name string `json:"username"`
	Score int `json:"score"`
	CorrectNum string `json:"correctNum"`
}

type User struct {
	Username string `json:"username"`
	Score int `json:"score"`
}

type Answer struct {
	Correct bool `json:"correct"`
	CorrectNum int `json:"correctNum"`
}