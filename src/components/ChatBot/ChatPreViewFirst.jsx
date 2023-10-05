import axios from "axios";
import React, { useState } from "react";
import { API } from "config/Api";

const PreViewPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

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
        const AnswerGet = response.data.data.Answer;
        if (AnswerGet.trim() !== "") {
          setAnswers([...answers, AnswerGet]);
          setCurrentAnswer(AnswerGet);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                <div className="question-submit">
                  <h3 className="question">{question}</h3>
                </div>
                {answers.length > 0 && (
                  <div className="user-response">
                    <h3 className="answer">{answers[index]}</h3>
                  </div>
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
