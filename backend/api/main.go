package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/cors"

	"github.com/go-chi/chi"

	_ "github.com/go-sql-driver/mysql"
)

func homePage(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "Welcome to the HomePage!")
    fmt.Println("Endpoint Hit: homePage")
}

func handleRequests() {

	r := chi.NewRouter()

	  r.Use(cors.Handler(cors.Options{
    AllowedOrigins:   []string{"https://*", "http://*"},
    AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
    ExposedHeaders:   []string{"Link"},
    AllowCredentials: false,
    MaxAge:           300,
  }))

    r.Get("/", homePage)

	r.Get("/getquestion/{id}/{cat}/{name}", GetQuestion)

	r.Get("/getanswer/{id}/{cat}/{key}", GetAnswer)

	r.Get("/leaderboards", Leaderboards)


    log.Fatal(http.ListenAndServe(":3001", r))
}


func main() {

	fmt.Println("running on 3001")

    handleRequests()
}