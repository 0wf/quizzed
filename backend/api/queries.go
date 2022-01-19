package main

import (
	"database/sql"
	"errors"
	"fmt"
	"log"

	"github.com/go-sql-driver/mysql"
)

func getLeaderboards() []User{


	fmt.Println("hiiii")

	db, err := sql.Open("mysql", "server:PASSWORD@tcp(127.0.0.1:3306)/quiz")
	
	if err != nil {
        panic(err.Error())
    }

	defer db.Close()
	var users []User

	q, err := db.Query("SELECT username, score FROM users ORDER by score DESC LIMIT 40")

	if err != nil {
		panic(err.Error())
	}

	defer q.Close()

	for q.Next() {

		var user User

		err = q.Scan(&user.Username, &user.Score)

		if err != nil {
        	panic(err.Error()) // proper error handling instead of panic in your app
    	}
		
		users = append(users, user)
	}
	fmt.Println(users)

	return users
} 

func checkAnswer(id, key string) string{

	db, err := sql.Open("mysql", "server:PASSWORD@tcp(127.0.0.1:3306)/quiz")
	
	if err != nil {
        panic(err.Error())
    }

	defer db.Close()

	q, err := db.Query("SELECT id, username, correctNum FROM users WHERE id = ?", id)

	if err != nil {
		panic(err.Error())
	}

	defer q.Close()

	for q.Next() {

		var user Result

		err = q.Scan(&user.ID, &user.Name, &user.CorrectNum)

		if err != nil {
        	panic(err.Error()) 
    	} 

		return user.CorrectNum
		
	}
	return ""
}

func updateScore(id string) {
	db, err := sql.Open("mysql", "server:PASSWORD@tcp(127.0.0.1:3306)/quiz")

	if err != nil {
        panic(err.Error())
    }

	defer db.Close()

	insert, err := db.Query(
	"UPDATE users SET score = score + ? WHERE id = ?", 1, id)

	if err != nil {
        panic(err.Error())
    }

	defer insert.Close()
}

func userExists(id string, name string , ans int) int {
	db, err := sql.Open("mysql", "server:PASSWORD@tcp(127.0.0.1:3306)/quiz")
	
	if err != nil {
        panic(err.Error())
    }

	defer db.Close()

	q, err := db.Query("SELECT id FROM users WHERE id = ? ", id)

	if err != nil {
		panic(err.Error())
	}

	if q.Next() {
		updateCorrectValue(id, ans)
	}	else {
		createUser(id, name, ans)
	}

	defer q.Close()

	return 1
	
}

func updateCorrectValue(id string, val int) {
	db, err := sql.Open("mysql", "server:PASSWORD@tcp(127.0.0.1:3306)/quiz")

	if err != nil {
        panic(err.Error())
    }

	defer db.Close()

	insert, err := db.Query(
	"UPDATE users SET correctNum = ? WHERE id = ?", val, id)

	if err != nil {
        panic(err.Error())
    }

	defer insert.Close()
}

func createUser(v string, name string, ans int) {

	db, err := sql.Open("mysql", "server:PASSWORD@tcp(127.0.0.1:3306)/quiz")

	if err != nil {
        panic(err.Error())
    }
	defer db.Close()

	insert, _ := db.Query(
	"INSERT INTO users (id, username, score, correctNum) VALUES (?, ?, ?, ?)",
	v, name, 0, ans)

	var mysqlErr *mysql.MySQLError
	if errors.As(err, &mysqlErr) && mysqlErr.Number == 1062 {
		log.Println("among us!!!")
	} else if err != nil {
		panic(err.Error())
	}

	
    defer insert.Close()
}