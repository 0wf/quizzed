package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi"

	_ "github.com/go-sql-driver/mysql"
)

func GetQuestion(w http.ResponseWriter, r *http.Request) {



	fmt.Println("Get question")

	ID := chi.URLParam(r, "id")

	cat := chi.URLParam(r, "cat")

	name := chi.URLParam(r, "name")


	if ID == "5" {
		fmt.Println("yo")
	}
	search := fmt.Sprintf(`https://opentdb.com/api.php?amount=1&category=%s&difficulty=easy&type=multiple`,cat )

	response, err := http.Get(search)

	if err != nil {
		fmt.Println(err.Error())
	}

	if err != nil {
		log.Fatal(err)
	}

	responseData, err := ioutil.ReadAll(response.Body)


	fmt.Println(string(responseData))


	var responseObject Response 

	json.Unmarshal(responseData, &responseObject)

	question := responseObject.Results[0].Question
	correct_answer := responseObject.Results[0].CorrectAnswer
	incorrect_answers := responseObject.Results[0].IncorrectAnswers

	incorrect_answers = append(incorrect_answers, correct_answer)

	Clean(&question)

	Clean(&correct_answer)
	Clean(&incorrect_answers[0])
	Clean(&incorrect_answers[1])
	Clean(&incorrect_answers[2])
	Clean(&incorrect_answers[3])


	rand.Seed(time.Now().UnixNano())

	for i := range incorrect_answers {
    j := rand.Intn(i + 1)
    incorrect_answers[i], incorrect_answers[j] = incorrect_answers[j], incorrect_answers[i]
}


	res := Question {
		Question: question,
		Answers: incorrect_answers,
	}

	var ans int

	for i, v := range incorrect_answers {
		if v == correct_answer {
			ans = i + 1
		}
	}


	userExists(ID, name, ans)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)

}



func GetAnswer(w http.ResponseWriter, r *http.Request) {
	
	ID := chi.URLParam(r, "id")

	key := chi.URLParam(r, "key")

	correctNum := checkAnswer(ID, key)

	correctNumInt, err := strconv.Atoi(correctNum)

	if err != nil {
		fmt.Println(err.Error())
	}

	state := check(key, correctNum)

	if state {
		updateScore(ID)
	}

	res := Answer {
		Correct: state,
		CorrectNum: correctNumInt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)

}

func check(a, b string) bool {
	if a == b {
		return true
	} 
	return false
}


func Leaderboards(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Get Leaderboards")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(getLeaderboards())
	
}

