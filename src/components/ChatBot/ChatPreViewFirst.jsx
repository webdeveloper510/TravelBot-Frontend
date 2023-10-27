/*eslint-disable*/

import axios from "axios";
import React, { useEffect, useState , useRef} from "react";
import { API } from "config/Api";
import  logo from "../../assets/images/logo.png";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import  Icon  from "@mui/material/Icon";
import  Grid  from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import  TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import svgIcon from "../../assets/images/logos/7024404.svg"
const PreViewPage = (ChatID) => {

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [chatHistory, getChatHistory] = useState([]);
  const [latestAnswerIndex, setLatestAnswerIndex] = useState(null);
  const [AnswerID, setAnswerID] = useState([]);
  const [CurrentAnswerID, setCurrentAnswerID] = useState(null);
  const [NewAnswer, setNewAnswer] = useState(null);
  const [showAnswerChange, setShowAnswerChange] = useState(false);
  const [AnswerUpdate, setAnswerUpdate] = useState(false);
  const [AnswerTime, setAnswerTime] = useState(false);
  const [EffectReloadState, setEffectReloadState] = useState(false);
  const chatContainerRef = useRef(null);
  const [UpdatedConstAnsId, setUpdatedConstAnsId] = useState(null)
  const [ValueChatGet, setValueChatGet] = useState(null)
  const [NewUserF, setNewUserF] = useState(false)
  const accessToken = localStorage.getItem("Token");


  // Functions Management ------------------------------------------------------------------------------------->
  useEffect(()=>{
  if (ChatID.ChatID===null || ChatID.ChatID===""){
  }else {
    GetChatDetails(ChatID.ChatID)
  }
  },[EffectReloadState , ChatID.ChatID])

  const GetChatDetails=(id)=>{


    axios.get(API.BASE_URL + "getchat/"+id+"/",{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res)=>{
      console.log(res.data.data);
      setValueChatGet(res.data.data);
      const chatHistory = res.data.data;
      const questionArray = chatHistory.map((item) => item.questions);
      const answerArray = chatHistory.map((item) => item.answer);
      const answerTIme = chatHistory.map((item) => item.time);
      const answerID = chatHistory.map((item) => item.id);

      setEffectReloadState(false);
      setQuestions(questionArray);
      setAnswers(answerArray);
      setAnswerTime(answerTIme);
      setAnswerID(answerID);
    }).catch((error)=>{
      console.log(error)
    })
  }


  const handleInputQuestion = (event) => {
    setCurrentQuestion(event.target.value);
  };


  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };



  const handleQuestionSubmit = () => {
    if (currentQuestion.trim() !== "") {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion("");
      scrollToBottom();
    }

    const formdata = new FormData();
    formdata.append("query", currentQuestion); // Assuming currentQuestion is defined
    if (ChatID.ChatID===null || ChatID.ChatID===""){
    formdata.append("topic_id", ''); // Assuming currentQuestion is defined
    }else {
      formdata.append("topic_id", ChatID.ChatID); // Assuming currentQuestion is defined
    }
    axios.post(API.BASE_URL + "prediction/", formdata, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Assuming accessToken is defined
        },
      }).then((response) => {
        const AnswerGet = response.data.Answer; // Declare AnswerGet
        const AnswerIDGet = response.data.id; // Declare AnswerIDGet
        setAnswerID([...AnswerID, AnswerIDGet]);
        setCurrentAnswerID(AnswerIDGet);
        setAnswers([...answers, AnswerGet]); // Assuming answers and setAnswers are defined
        setCurrentAnswer(AnswerGet);
        setLatestAnswerIndex(answers.length); // Assuming setLatestAnswerIndex is defined
        setEffectReloadState(true); // Assuming setEffectReloadState is defined
        scrollToBottom(); // Assuming scrollToBottom is defined
      }).catch((error) => {
        const AnswerGet = error.response.data.Answer; // Declare AnswerGet
        const AnswerIDGet = error.response.data.id; // Declare AnswerIDGet
        setAnswerID([...AnswerID, AnswerIDGet]);
        setCurrentAnswerID(AnswerIDGet);
        setAnswers([...answers, AnswerGet]); // Assuming answers and setAnswers are defined
        setCurrentAnswer(AnswerGet);
        setLatestAnswerIndex(answers.length); // Assuming setLatestAnswerIndex is defined
        scrollToBottom(); // Assuming scrollToBottom is defined
      });
  }
console.log(AnswerID , answers ,)
// Enter Function On Submit Question 

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleQuestionSubmit();
    }
  };

  
// Change Chat-bot Answer

  const handleChangeInputAnswer = (event) => {
    setNewAnswer(event.target.value);
  };

// Handle Answer edit (Suggestions) Open Pop-Up

  const handleEditAnswer=(id)=>{
    console.log(id);
    setUpdatedConstAnsId(id)
    setShowAnswerChange(true);
  };

// Handle Close (Suggestion Pop-Up)

  const handleCloseAnswerUpdate=() => {
    setShowAnswerChange(false);
  };

// Handle Update the Answer with the Question ID


  const handleAnswerUpdate = () => {
    const formData = new FormData();
    formData.append("suggestion" , NewAnswer)
    axios.put(API.BASE_URL+"suggestion/"+UpdatedConstAnsId+"/", formData,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res)=>{
      setAnswerUpdate(true);
      setShowAnswerChange(false);
      setEffectReloadState(true); // Assuming setEffectReloadState is defined

    }).catch((error)=>{
    setShowAnswerChange(false);
    })
  };


// Handle to set the latest Index of the Answer and Question using the Signs


  const handleSaveAnswer=()=>{
    setLatestAnswerIndex(null);
  }

// SnackBar Handle To close on the Button 

  const closeWarningSB = () => {
    setAnswerUpdate(false);
  };


  return (
    <div className="chat-side px-5">
      <div className="chat-messages" ref={chatContainerRef}>
        <div className="loader-">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>


        {/* Main Question Page Start */}
        {ValueChatGet?.length>0?(<>
        

        {questions.length > 0 ? (
          <>
          <div className="text-center date">
            <p>10-Oct-2023</p>
          </div>
            <div className="chat-start">
              {/* Applying Map Function */}
              {questions.map((question, index) => (
                <div key={index}>
                  <div className="display-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 64 64" className="display-flex self-center mr-2">
                      <circle cx="32" cy="32" r="30" fill="#ff5722"></circle>
                      <text x="20" y="42" fill="#fff" fontFamily="Arial, sans-serif" fontSize="36">
                        T
                      </text>
                    </svg>
                    <div className="question-submit">
                        <h3 className="question">{question}</h3>
                          <div className="text-right">
                        </div>
                    </div>
                  </div>
                  {answers.length > 0 && answers[index] !== "" ? (
                    <div key={index} >
                      <div className="display-flex">
                        <svg xmlns="http://www.w3.org/2000/svg"   width="30"   height="30"   data-name="Layer 1"   viewBox="0 0 24 24"   className="display-flex self-center mr-2" >
                          <path d="M22 11a4 4 0 00-2-3.48A3 3 0 0020 7a3 3 0 00-3-3h-.18A3 3 0 0012 2.78 3 3 0 007.18 4H7a3 3 0 00-3 3 3 3 0 000 .52 4 4 0 00-.55 6.59A4 4 0 007 20h.18A3 3 0 0012 21.22 3 3 0 0016.82 20H17a4 4 0 003.5-5.89A4 4 0 0022 11zM11 8.55a4.72 4.72 0 00-.68-.32 1 1 0 00-.64 1.9A2 2 0 0111 12v1.55a4.72 4.72 0 00-.68-.32 1 1 0 00-.64 1.9A2 2 0 0111 17v2a1 1 0 01-1 1 1 1 0 01-.91-.6 4.07 4.07 0 00.48-.33 1 1 0 10-1.28-1.54A2 2 0 017 18a2 2 0 01-2-2 2 2 0 01.32-1.06A3.82 3.82 0 006 15a1 1 0 000-2 1.84 1.84 0 01-.69-.13A2 2 0 015 9.25a3.1 3.1 0 00.46.35 1 1 0 101-1.74.9.9 0 01-.34-.33A.92.92 0 016 7a1 1 0 011-1 .76.76 0 01.21 0 3.85 3.85 0 00.19.47 1 1 0 001.37.37 1 1 0 00.36-1.34A1.06 1.06 0 019 5a1 1 0 012 0zm7.69 4.32A1.84 1.84 0 0118 13a1 1 0 000 2 3.82 3.82 0 00.68-.06A2 2 0 0119 16a2 2 0 01-2 2 2 2 0 01-1.29-.47 1 1 0 00-1.28 1.54 4.07 4.07 0 00.48.33 1 1 0 01-.91.6 1 1 0 01-1-1v-2a2 2 0 011.32-1.87 1 1 0 00-.64-1.9 4.72 4.72 0 00-.68.32V12a2 2 0 011.32-1.87 1 1 0 00-.64-1.9 4.72 4.72 0 00-.68.32V5a1 1 0 012 0 1.06 1.06 0 01-.13.5 1 1 0 00.36 1.37 1 1 0 001.37-.37 3.85 3.85 0 00.19-.5.76.76 0 01.21 0 1 1 0 011 1 1 1 0 01-.17.55.9.9 0 01-.33.31 1 1 0 001 1.74 2.66 2.66 0 00.5-.35 2 2 0 01-.27 3.62z"></path>
                        </svg>
                          
                          <div className="user-response">   
                              <h3 className="answer">{answers[index] ? answers[index]:"...."}</h3>
                            <div className="text-right">
                                <small>{AnswerTime[index] ? AnswerTime[index].split(':').slice(0, 2).join(':') : ""}</small>
                            </div>
                          </div>
                      </div>
                {latestAnswerIndex === index ? (
                <div className="thumbs-check">
                  <ThumbUpIcon color="info" style={{ cursor: "pointer" }} onClick={handleSaveAnswer}/>
                  <ThumbDownIcon color="warning" style={{ cursor: "pointer" }} onClick={(e)=> handleEditAnswer(AnswerID[index])}/>
                </div>
              ) : (
                ""
              )}</div>
                  ) : (<></>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (

          <><div className="logo-ct">
          <img src={logo} alt="chat image"/>
          </div></>
        )}
        </>):<>
        
        <div className="logo-ct">
          <img src={logo} alt="chat image"/>
          </div></>}
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
          <button className="btn btn-primary" type="submit" onClick={()=>{handleQuestionSubmit}}>
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
          © 2023 Exclusive Malta, All rights reserved
        </span>
      </div>
                  {showAnswerChange?(
                        <div className='modal'>
                          <div className='modal-content'>
                          <div className="close-div">
                          <button className="close-button" icon="close" onClick={handleCloseAnswerUpdate}>
                            <Icon>close</Icon>
                          </button>
                          </div>
                          <Grid item>
                            <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize" textAlign="center" >
                              Enter Suggestion
                            </MDTypography>
                            <MDBox pt={4} pb={3} px={3}>
                              <MDBox component="form" role="form">
                                <MDBox mb={2}>
                                <TextField id="outlined-multiline-static" multiline rows={4} fullWidth variant="outlined" value={NewAnswer} onChange={handleChangeInputAnswer}/>                                
                                </MDBox>
                                <MDBox mt={4} mb={1}>
                                  <MDButton variant="gradient" color="info" fullWidth onClick={handleAnswerUpdate}>
                                    Click To Enter
                                  </MDButton>
                                </MDBox>
                              </MDBox>
                            </MDBox>
                          </Grid>
                          </div> 
                      </div>
                    ):<></>}

          {/*  Snack BARS===========================================================================================> */}
          <MDSnackbar
            color="success"
            icon="check"
            title="Answer Updated"
            content="Answer Updated Successfully!"
            dateTime="Now"
            open={AnswerUpdate}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
    </div>
  );
};
export default PreViewPage;