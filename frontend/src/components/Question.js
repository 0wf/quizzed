import "../App.css";
import { Component, useEffect, useState } from "react";
import Axios from "axios";

const Question = (props) => {
  let i = 1;

  let id = props.id;

  let name = props.name;

  const [question, setQuestion] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [clicked, setClicked] = useState(0);

  const [correctNum, setCorrectNum] = useState(0);

  const getAnswer = (id, key) => {
    let uid = id;
    let cat = localStorage.getItem("category");
    Axios.get(`/server/getanswer/${uid}/${cat}/${key}`).then((response) => {
      const myData = response.data;
      let correct = myData.correct;
      setCorrectNum(myData.correctNum);
      setClicked(key);
    });
  };

  const getQuestion = (id) => {
    let uid = id;
    let cat = localStorage.getItem("category");
    Axios.get(`/server/getquestion/${uid}/${cat}/${name}`).then((response) => {
      const myData = response.data;
      setQuestion(myData);
      setIsLoading(false);
      setClicked(0);
    });
  };

  const style = (correctNum, clicked, index) => {
    if (!clicked) {
      return "default";
    }

    if (index == correctNum) {
      return "true";
    } else if (index == clicked) {
      return "wrong";
    } else {
      return "default";
    }
  };

  useEffect(() => getQuestion(id), []);

  if (isLoading == false) {
    return (
      <div>
        <div className="mt-8 flex flex-col justify-center">
          <div className="text-2xl w-screen flex flex-row justify-center gray-text">
            <h2 className="mw text-center">{question.question}</h2>
          </div>
          <div className="my-auto flex flex-col text-center mt-8 text-xl gap-3 xl:gap-5">
            {question.answers.map((a, index) => {
              return (
                <div
                  onClick={(event) => {
                    getAnswer(id, index + 1);
                  }}
                  key={index}
                  className={style(correctNum, clicked, index + 1)}
                >
                  <h2>{a}</h2>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-2xl flex flex-row justify-center">
            {clicked != 0 ? (
              <button
                className="grey-background py-1 px-4 rounded-2xl hover:opacity-80"
                onClick={() => getQuestion(id)}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Question;
