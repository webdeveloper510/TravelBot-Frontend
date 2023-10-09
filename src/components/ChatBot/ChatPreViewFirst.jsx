/*eslint-disable*/

import axios from "axios";
import React, { useState } from "react";
import { API } from "config/Api";

const PreViewPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  let AnswerGet
  const accessToken = localStorage.getItem("Token");
  const handleInputQuestion = (event) => {
    setCurrentQuestion(event.target.value);
  };
  const handleQuestionSubmit = () => {
    if (currentQuestion.trim() !== "") {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion("");
    }
    const formdata = new FormData();
    formdata.append("query", currentQuestion);

    axios
      .post(API.BASE_URL + "prediction/", formdata, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // console.log(response.data.data.Message);
        if (response.data.data.Message === "Data Not Found"){
          AnswerGet = response.data.data.Message

        }else {
            AnswerGet = response.data.data.Answer;
            setAnswers([...answers, AnswerGet]); // Update answers state here
            setCurrentAnswer(AnswerGet);
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleQuestionSubmit();
    }
  };
  return (
    <div className="chat-side px-5">
      <div className="chat-messages">
        <div className="loader-">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        {questions.length > 0 ? (
          <div className="chat-start">
            {questions.map((question, index) => (
              <div key={index}>
                <div className="display-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 64 64"
                  className="display-flex self-center mr-2"
                >
                  <circle cx="32" cy="32" r="30" fill="#ff5722"></circle>
                  <text
                    x="20"
                    y="42"
                    fill="#fff"
                    fontFamily="Arial, sans-serif"
                    fontSize="36"
                  >
                    T
                  </text>
                </svg>
                <div className="question-submit">
                  <h3 className="question">{question}</h3>
                </div>
                  </div>
                {answers.length > 0 && answers[index] !== "" ? (
                  <div key={index} className="display-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                      className="display-flex self-center mr-2"
                    >
                      <path d="M22 11a4 4 0 00-2-3.48A3 3 0 0020 7a3 3 0 00-3-3h-.18A3 3 0 0012 2.78 3 3 0 007.18 4H7a3 3 0 00-3 3 3 3 0 000 .52 4 4 0 00-.55 6.59A4 4 0 007 20h.18A3 3 0 0012 21.22 3 3 0 0016.82 20H17a4 4 0 003.5-5.89A4 4 0 0022 11zM11 8.55a4.72 4.72 0 00-.68-.32 1 1 0 00-.64 1.9A2 2 0 0111 12v1.55a4.72 4.72 0 00-.68-.32 1 1 0 00-.64 1.9A2 2 0 0111 17v2a1 1 0 01-1 1 1 1 0 01-.91-.6 4.07 4.07 0 00.48-.33 1 1 0 10-1.28-1.54A2 2 0 017 18a2 2 0 01-2-2 2 2 0 01.32-1.06A3.82 3.82 0 006 15a1 1 0 000-2 1.84 1.84 0 01-.69-.13A2 2 0 015 9.25a3.1 3.1 0 00.46.35 1 1 0 101-1.74.9.9 0 01-.34-.33A.92.92 0 016 7a1 1 0 011-1 .76.76 0 01.21 0 3.85 3.85 0 00.19.47 1 1 0 001.37.37 1 1 0 00.36-1.34A1.06 1.06 0 019 5a1 1 0 012 0zm7.69 4.32A1.84 1.84 0 0118 13a1 1 0 000 2 3.82 3.82 0 00.68-.06A2 2 0 0119 16a2 2 0 01-2 2 2 2 0 01-1.29-.47 1 1 0 00-1.28 1.54 4.07 4.07 0 00.48.33 1 1 0 01-.91.6 1 1 0 01-1-1v-2a2 2 0 011.32-1.87 1 1 0 00-.64-1.9 4.72 4.72 0 00-.68.32V12a2 2 0 011.32-1.87 1 1 0 00-.64-1.9 4.72 4.72 0 00-.68.32V5a1 1 0 012 0 1.06 1.06 0 01-.13.5 1 1 0 00.36 1.37 1 1 0 001.37-.37 3.85 3.85 0 00.19-.5.76.76 0 01.21 0 1 1 0 011 1 1 1 0 01-.17.55.9.9 0 01-.33.31 1 1 0 001 1.74 2.66 2.66 0 00.5-.35 2 2 0 01-.27 3.62z"></path>
                    </svg>
                  <div className="user-response">   
                    <h3 className="answer">{answers[index]}</h3>
                  </div>
                  </div>
                ) : (<></>
                  // <div className="user-response">
                  //   <h3 className="answer">No response</h3>
                  // </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="chat-list">
            <div className="chat-list-box">
              <h3 className="mb-3 d-flex m-auto text-lg font-normal">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                  viewBox="0 -5 30 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                Examples
              </h3>
              <ul className="d-flex flex-column w-full m-auto">
                <button className="w-full bg-gray mb-2">&quot;Tell me about India&quot; →</button>
                <button className="w-full bg-gray mb-2">
                  &quot;Where can I go in this summer ?&quot; →
                </button>
                <button className="w-full bg-gray mb-2">&quot;Suggest me best plan&quot; →</button>
              </ul>
            </div>
            <div className="chat-list-box">
              <h3 className="mb-3 d-flex items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  ></path>
                </svg>
                Capabilities
              </h3>
              <ul className="d-flex flex-column w-full m-auto">
                <li className="w-full bg-gray d-flex mb-2">
                  Remembers what user said earlier in the conversation
                </li>
                <li className="w-full bg-gray d-flex mb-2">
                  Allows user to provide follow-up corrections
                </li>
                <li className="w-full bg-gray d-flex mb-2">
                  Trained to decline inappropriate requests
                </li>
              </ul>
            </div>
            <div className="chat-list-box">
              <h3 className="mb-3 d-flex items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Limitations
              </h3>
              <ul className="d-flex flex-column w-full m-auto">
                <li className="w-full bg-gray d-flex mb-2">
                  May occasionally generate incorrect information
                </li>
                <li className="w-full bg-gray d-flex mb-2">
                  May occasionally produce harmful instructions or biased content
                </li>
                <li className="w-full bg-gray d-flex mb-2">
                  Limited knowledge of world and events after 2021
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="input-group-container">
        <div className="input-padd">
          <input
            type="text"
            className="form-control-chat"
            value={currentQuestion}
            onChange={handleInputQuestion}
            onKeyPress={handleKeyPress}
          />
          <button className="btn btn-primary" type="submit" onClick={handleQuestionSubmit}>
            <svg
              id="ic_send"
              fill="#FFFFFF"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </button>
        </div>
        <span className="text-center text-gray w-100 mt-2 copyright">
          © 2023 Chatbot, All rights reserved
        </span>
      </div>
    </div>
  );
};
export default PreViewPage;
