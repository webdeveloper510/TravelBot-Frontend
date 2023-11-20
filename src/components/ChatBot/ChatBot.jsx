/*eslint-disable*/
import React, {useEffect , useState , useRef} from "react";
import PreViewPage from "./ChatPreViewFirst";
import { API } from "config/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PsychologyIcon from '@mui/icons-material/Psychology';



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
import svgIcon from "../../assets/images/base64.online.png"
const ChatBot = () => {
  const accessToken = localStorage.getItem("Token");
  const [TopicsState, setTopicsState] = useState([])
  const [newAddState , setnewAddState] = useState(false);
  const [ChatID , setChatID] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
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
  const [ChatDate, setChatDate] = useState(null)
  const [first_load , setFirstLoad] = useState(true)
  const [StateForIndexCheck , setStateForIndexCheck] = useState(null);
  const navigate = useNavigate();
  let vendorName = localStorage.getItem("vendorName");
  const [firstnameLetter , setfirstnameLetter] = useState(null);
// Function Callings ---------------------------------------------------------------------------------------------->
// ******************************** USEEFFECTS ********************************


  useEffect(()=>{
    axios.get(API.BASE_URL+"userprofile/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res)=>{
      console.log(res)
      setfirstnameLetter(res.data.firstname[0])
    }).catch((err)=>{
      console.log(err)
    })
  })




  useEffect(()=>{
    axios.get(API.BASE_URL+"topics/",{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((resp)=>{
      const index=resp.data.data.length
      setStateForIndexCheck(index);
      setTopicsState(resp.data.data)
      if(first_load){
        setChatID(resp.data.data[index-1].id)
        setFirstLoad(false)
      }
      setChatDateForItem(resp.data.data[index-1].created_at__date)
      setnewAddState(false)
      setEffectReloadState(false)
    }).catch((error)=>{
      console.log(error)
    })
  },[newAddState , EffectReloadState])




  useEffect(()=>{
    if (ChatID===null || ChatID===""){
    }else {
      GetChatDetails(ChatID)
    }
    },[EffectReloadState , ChatID])
    
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
        const TopicName = chatHistory.map((item) => item.topic);
        console.log(TopicName, "=======================")
        for (let i=0; i<TopicName.length; i++){
          if(TopicName[i]===""){
            continue
          }else{
            console.log(TopicName[i], "=================")
            
            UpdateTopicName(TopicName[i], ChatID)
            break
          }
        }
        setEffectReloadState(false);
        setQuestions(questionArray);
        setAnswers(answerArray);
        setAnswerTime(answerTIme);
        setAnswerID(answerID);
      }).catch((error)=>{
        console.log(error)
      })
    }




// // Functions Management ------------------------------------------------------------------------------------->


  const handleNewChatClick = () => {
    axios.post(API.BASE_URL+"topics/",{name:"Chat"},{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response)=>{
      console.log(response)
      setChatID(response.data.data.id);
      setnewAddState(true);
    }).catch((error)=>{
      console.log(error)
    })
  };



const UpdateTopicName=(topic_name , id)=>{
  axios.put(API.BASE_URL+"update-topics/"+id+"/",{name:topic_name},{
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response)=>{
    console.log(response)

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
  formdata.append("query", currentQuestion); 

  if (ChatID===null || ChatID===""){
  formdata.append("topic_id", ''); 

  }else {
    formdata.append("topic_id", ChatID); 

  }
  if (vendorName){
    vendorName = JSON.stringify(vendorName)
    console.log(vendorName);
    formdata.append("vendor_name" , JSON.parse(vendorName))
    console.log(JSON.parse(vendorName))
  }else{
    formdata.append("vendor_name" , '')
  }
  axios.post(API.BASE_URL + "prediction/", formdata, {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
        "Content-Type":"application/json"

      },
    }).then((response) => {
      const AnswerGet = response.data.Answer; 

      const AnswerIDGet = response.data.id; 

      setAnswerID([...AnswerID, AnswerIDGet]);
      setCurrentAnswerID(AnswerIDGet);
      setAnswers([...answers, AnswerGet]); 

      setCurrentAnswer(AnswerGet);
      setLatestAnswerIndex(answers.length); 


      const newVendorName = response.data.vendor_name;
      localStorage.setItem("vendorName", JSON.stringify(newVendorName))
      setEffectReloadState(true); 


      scrollToBottom(); 

    }).catch((error) => {
      const AnswerGet = error.response.data.Answer; 

      const AnswerIDGet = error.response.data.id; 

      setAnswerID([...AnswerID, AnswerIDGet]);
      setCurrentAnswerID(AnswerIDGet);
      setAnswers([...answers, AnswerGet]); 

      setCurrentAnswer(AnswerGet);
      setLatestAnswerIndex(answers.length); 

      scrollToBottom(); 

    });
}
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





// Functions Management ------------------------------------------------------------------------------------->
const setChatDateForItem = (date) => {
  setChatDate(date);
};


  const handleLogOut = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("vendorName");
    navigate("/");
    window.location.reload();
  };


  // ####----------------------------------------------------------------RETURN VALUE Statements ---------------------------------------------------------------->

  return (
    <div className="main">
      <div className="chat">
        <div className="side-contetnt">
            <div className="sidebar">
      <div className="new-chat-bttn">
        <div className="bttn-chat">
          <a className="flex px-3 " href="#chat" onClick={handleNewChatClick}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon-sm shrink-0"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className="truncate">New Chat</span>
          </a>
        </div>
      </div>
       {TopicsState.map((index) => (  
        
       <div className='new-chat-bttn'onClick={() => {setChatID(index.id) 
       setChatDateForItem(index.created_at__date)}} style={{ background: index.id === ChatID ? "#fff" : "" }}>
          <div className="bttn-chat">
          <a className="flex px-3 active" href="#chat" style={{ color: index.id === ChatID ? "#000" : "" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="icon-sm"
            viewBox="0 0 24 24"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
          </svg>
          <span className="truncate">{index.name} </span>

          </a>
          </div>
        </div>
      
       ))}
      <button className="logout" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
        </div>


        {/* ----------------------------------------------------------------CHAT SECTION----------------------------------------------------------------- */}


        <div className="content">
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
            <p>{ChatDate}</p>
          </div>
            <div className="chat-start">
              {/* Applying Map Function */}
              {questions.map((question, index) => (
                <div key={index}>
                  <div className="display-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 64 64" className="display-flex self-center mr-2">
                      <circle cx="32" cy="32" r="30" fill="#365788"></circle>
                      <text x="20" y="42" fill="#fff" fontFamily="Arial, sans-serif" fontSize="36">
                      {firstnameLetter}
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
                        {/* <svg xmlns="http://www.w3.org/2000/svg"   width="30"   height="30"   data-name="Layer 1"   viewBox="0 0 24 24"   className="display-flex self-center mr-2" >
                          <path d="M22 11a4 4 0 00-2-3.48A3 3 0 0020 7a3 3 0 00-3-3h-.18A3 3 0 0012 2.78 3 3 0 007.18 4H7a3 3 0 00-3 3 3 3 0 000 .52 4 4 0 00-.55 6.59A4 4 0 007 20h.18A3 3 0 0012 21.22 3 3 0 0016.82 20H17a4 4 0 003.5-5.89A4 4 0 0022 11zM11 8.55a4.72 4.72 0 00-.68-.32 1 1 0 00-.64 1.9A2 2 0 0111 12v1.55a4.72 4.72 0 00-.68-.32 1 1 0 00-.64 1.9A2 2 0 0111 17v2a1 1 0 01-1 1 1 1 0 01-.91-.6 4.07 4.07 0 00.48-.33 1 1 0 10-1.28-1.54A2 2 0 017 18a2 2 0 01-2-2 2 2 0 01.32-1.06A3.82 3.82 0 006 15a1 1 0 000-2 1.84 1.84 0 01-.69-.13A2 2 0 015 9.25a3.1 3.1 0 00.46.35 1 1 0 101-1.74.9.9 0 01-.34-.33A.92.92 0 016 7a1 1 0 011-1 .76.76 0 01.21 0 3.85 3.85 0 00.19.47 1 1 0 001.37.37 1 1 0 00.36-1.34A1.06 1.06 0 019 5a1 1 0 012 0zm7.69 4.32A1.84 1.84 0 0118 13a1 1 0 000 2 3.82 3.82 0 00.68-.06A2 2 0 0119 16a2 2 0 01-2 2 2 2 0 01-1.29-.47 1 1 0 00-1.28 1.54 4.07 4.07 0 00.48.33 1 1 0 01-.91.6 1 1 0 01-1-1v-2a2 2 0 011.32-1.87 1 1 0 00-.64-1.9 4.72 4.72 0 00-.68.32V12a2 2 0 011.32-1.87 1 1 0 00-.64-1.9 4.72 4.72 0 00-.68.32V5a1 1 0 012 0 1.06 1.06 0 01-.13.5 1 1 0 00.36 1.37 1 1 0 001.37-.37 3.85 3.85 0 00.19-.5.76.76 0 01.21 0 1 1 0 011 1 1 1 0 01-.17.55.9.9 0 01-.33.31 1 1 0 001 1.74 2.66 2.66 0 00.5-.35 2 2 0 01-.27 3.62z"></path>
                        </svg> */}
                        {/* <svg xmlns="http://www.w3.org/2000/svg"  data-name="Layer 1" width="45" height="45" viewBox="0 0 168 168" id="artificial-intelligence"><circle cx="2" cy="149.5" r="2" fill="#2d4356"></circle><path fill="#2d4356" d="M11 147.5H8a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4Z"></path><path fill="#0bceb2" d="M118.154 155.5h-8.308a2.006 2.006 0 0 0 0 4h8.308a2.006 2.006 0 0 0 0-4zm-60 0h-8.308a2.006 2.006 0 0 0 0 4h8.308a2.006 2.006 0 0 0 0-4zm45.846 0H64a2 2 0 0 0 0 4h15.94v2H72a2 2 0 0 0 0 4h25a2 2 0 0 0 0-4h-8.94v-2H104a2 2 0 0 0 0-4z"></path><path fill="#2d4356" d="M59 51.79V46.5a1.996 1.996 0 0 0-1.01-1.74l-14-8A2.004 2.004 0 0 0 41 38.5v21.47l-8-6.43V37.21a7 7 0 1 0-4 0V54.5a2.007 2.007 0 0 0 .75 1.56l11 8.83a1.377 1.377 0 0 0 .25.17V86.5a1.988 1.988 0 0 0 .48 1.3L47 94.24v16.55a7 7 0 1 0 4 0V93.5a1.988 1.988 0 0 0-.48-1.3L45 85.76V41.95l10 5.71v4.13a7 7 0 1 0 4 0ZM28 30.5a3 3 0 1 1 3 3 2.996 2.996 0 0 1-3-3Zm24 87a3 3 0 1 1-3-3 2.996 2.996 0 0 1 3 3Zm5-56a3 3 0 1 1 3-3 2.996 2.996 0 0 1-3 3Z"></path><path fill="#0bceb2" d="M77.41 53.09 70 45.67V30.5a2 2 0 0 0-4 0v16a1.966 1.966 0 0 0 .59 1.41L74 55.33v29.34l-15 15V85.21a7 7 0 1 0-4 0v19.29a2.01 2.01 0 0 0 1.23 1.85 2.068 2.068 0 0 0 .77.15 1.959 1.959 0 0 0 1.41-.59l19-19A1.966 1.966 0 0 0 78 85.5v-31a1.966 1.966 0 0 0-.59-1.41zM57 81.5a3 3 0 1 1 3-3 2.996 2.996 0 0 1-3 3zM32 96.79V83.21a7 7 0 1 0-4 0v13.58a7 7 0 1 0 4 0zM27 76.5a3 3 0 1 1 3 3 2.996 2.996 0 0 1-3-3zm3 30a3 3 0 1 1 3-3 2.996 2.996 0 0 1-3 3z"></path><path fill="#2d4356" d="M160 147.5h-3a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4Z"></path><circle cx="166" cy="149.5" r="2" fill="#2d4356"></circle><path fill="#2d4356" d="M150.72 147.5h-22.26a10.611 10.611 0 0 0 2.22-6.49v-4.17l3.31-2.62a1.995 1.995 0 0 0 .39-2.73l-2.51-3.51 3.99-1.39a2 2 0 0 0 1.24-2.53l-2.12-6.29h5.81a4.205 4.205 0 0 0 3.45-1.82 4.336 4.336 0 0 0 .48-3.98l-8.52-22.66 2.43-5.31a1.968 1.968 0 0 0 .18-.83V72.09c-.63-15.12-6.8-27.84-17.85-36.79A54.87 54.87 0 0 0 84.4 23.54a1.754 1.754 0 0 0-.4-.04h-8a2.006 2.006 0 0 0-2 2v16a1.966 1.966 0 0 0 .59 1.41l8 8a1.966 1.966 0 0 0 1.41.59h12a1.966 1.966 0 0 0 1.41-.59l3.26-3.25a6.993 6.993 0 1 0-2.83-2.83l-2.67 2.67H84.83L78 40.67V27.5h5.81a1.872 1.872 0 0 0 .58.04c17.8-.67 36.14 7.39 45 23.96h-6.68a7.001 7.001 0 1 0-8.71 8.71V78.5H99a2.006 2.006 0 0 0-2 2v11H81a1.966 1.966 0 0 0-1.41.59l-16 16a1.966 1.966 0 0 0-.59 1.41v16.29a7 7 0 1 0 4 0v-15.46L81.83 95.5H118a2 2 0 0 0 1.79-1.11l6-12a1.944 1.944 0 0 0 .21-.89v-7h8.81v8.24l-2.59 5.66a2.054 2.054 0 0 0-.06 1.54l8.82 23.45a.305.305 0 0 1-.03.29.194.194 0 0 1-.16.09h-8.59a1.996 1.996 0 0 0-1.63.84 2.022 2.022 0 0 0-.27 1.8l2.38 7.05-4.65 1.62a1.97 1.97 0 0 0-1.25 1.28 1.994 1.994 0 0 0 .28 1.77l2.96 4.14-2.58 2.03a2.005 2.005 0 0 0-.76 1.57v5.14a6.538 6.538 0 0 1-3.16 5.63 6.123 6.123 0 0 1-3.11.86c-8.36 0-40.41-10.52-40.41-28v-4.17a2 2 0 0 0-4 0v4.17c0 13.8 15.03 23.13 27.94 28H17.28a2.017 2.017 0 1 0 0 4h133.44a2.017 2.017 0 1 0 0-4ZM104 38.5a3 3 0 1 1-3 3 2.996 2.996 0 0 1 3-3Zm-36 94a3 3 0 1 1-3-3 2.996 2.996 0 0 1 3 3Zm45-79a3 3 0 1 1 3 3 2.996 2.996 0 0 1-3-3Zm11 17a2.006 2.006 0 0 0-2 2v8.53l-5.24 10.47H101v-9h15a2 2 0 0 0 2-2V60.21a7.077 7.077 0 0 0 4.71-4.71h8.56a48.373 48.373 0 0 1 3.43 15Z"></path><path fill="#0bceb2" d="M103 58.5a7.059 7.059 0 0 0-3.33.84l-3.26-3.25A1.966 1.966 0 0 0 95 55.5H84a2.006 2.006 0 0 0-2 2v16a2.022 2.022 0 0 0 .7 1.52l6.3 5.4V91.5h4v-12a1.988 1.988 0 0 0-.7-1.52l-6.3-5.4V59.5h8.17l2.67 2.67A7.002 7.002 0 1 0 103 58.5Zm0 10a3 3 0 1 1 3-3 2.996 2.996 0 0 1-3 3Z"></path><path fill="#2d4356" d="M54 30.5a3 3 0 1 0-3-3 3.003 3.003 0 0 0 3 3zm0-4.5a1.5 1.5 0 1 1-1.5 1.5A1.501 1.501 0 0 1 54 26zm94.856 18.5a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm-16.156-24a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm17.156-24a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm-138.16 43a2 2 0 1 0-2 2 2.002 2.002 0 0 0 2-2zm-3 0a1 1 0 1 1 1 1 1.001 1.001 0 0 1-1-1z"></path><path fill="#0bceb2" d="M8.111 11.765 9.597 9.81l-.939-.532-.954 2.19h-.032l-.969-2.175-.956.548 1.472 1.909v.031l-2.301-.297v1.064l2.316-.297v.031L5.747 14.19l.892.564 1.018-2.206h.031l.939 2.19.986-.563-1.502-1.878v-.031l2.362.282v-1.064l-2.362.313v-.032zM38.334 6.23l-.856 1.099.513.325.586-1.271h.018l.541 1.261.568-.324-.865-1.081v-.018l1.36.162V5.77l-1.36.18v-.018l.856-1.126-.541-.306-.55 1.261h-.018l-.558-1.252-.55.315.847 1.1v.018L37 5.77v.613l1.334-.171v.018zM163.029 29.021v-1.043l-2.317.307v-.031l1.458-1.918-.921-.522-.936 2.148h-.031l-.951-2.133-.937.538 1.443 1.872v.031l-2.256-.292v1.043l2.271-.291v.031l-1.458 1.872.875.553.998-2.165h.03l.921 2.149.967-.552-1.473-1.842v-.031l2.317.276zM80.701 13.288l1.258-1.655-.794-.45-.808 1.853h-.027l-.82-1.84-.808.464 1.245 1.615v.026L78 13.05v.9l1.96-.251v.026l-1.258 1.615.754.477.861-1.867h.026l.795 1.853.834-.476-1.271-1.589v-.026l1.999.238v-.9l-1.999.264v-.026z"></path></svg> */}
                        <svg
                          className="display-flex self-center mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          // className="icon-md"
                          viewBox="0 0 41 41"
                          style={{padding: "4px 4px",background: "#365788",borderRadius: "15px"}}
                        >
                          <text x="-9999" y="-9999">
                            ChatGPT
                          </text>
                          <path
                            fill="#fff"
                            d="M37.532 16.87a9.963 9.963 0 00-.856-8.184 10.078 10.078 0 00-10.855-4.835A9.964 9.964 0 0018.306.5a10.079 10.079 0 00-9.614 6.977 9.967 9.967 0 00-6.664 4.834 10.08 10.08 0 001.24 11.817 9.965 9.965 0 00.856 8.185 10.079 10.079 0 0010.855 4.835 9.965 9.965 0 007.516 3.35 10.078 10.078 0 009.617-6.981 9.967 9.967 0 006.663-4.834 10.079 10.079 0 00-1.243-11.813zM22.498 37.886a7.474 7.474 0 01-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 00.655-1.134V19.054l3.366 1.944a.12.12 0 01.066.092v9.299a7.505 7.505 0 01-7.49 7.496zM6.392 31.006a7.471 7.471 0 01-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 001.308 0l9.724-5.614v3.888a.12.12 0 01-.048.103l-8.051 4.649a7.504 7.504 0 01-10.24-2.744zM4.297 13.62A7.469 7.469 0 018.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 00.654 1.132l9.723 5.614-3.366 1.944a.12.12 0 01-.114.01L7.04 23.856a7.504 7.504 0 01-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 01.113-.01l8.052 4.648a7.498 7.498 0 01-1.158 13.528v-9.476a1.293 1.293 0 00-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 00-1.308 0l-9.723 5.614v-3.888a.12.12 0 01.048-.103l8.05-4.645a7.497 7.497 0 0111.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 01-.065-.092v-9.299a7.497 7.497 0 0112.293-5.756 6.94 6.94 0 00-.236.134l-7.965 4.6a1.294 1.294 0 00-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
                          ></path>
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
        {/* <textarea id="another-textarea" tabindex="0" data-id="request-:r11:-10" rows="1" placeholder="Message ChatGPT…" class="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 gizmo:md:py-3.5 gizmo:placeholder-black/50 gizmo:dark:placeholder-white/50 pl-3 md:pl-4" style={{maxHeight: "200px", height: "52px", overflowY: "hidden"}} /> */}
          <textarea
          id="another-textarea"
            type="text"
            className="form-control-chat"
            value={currentQuestion}
            onChange={handleInputQuestion}
            onKeyPress={handleKeyPress}
          />
          <button className="btn btn-primary" type="submit" onClick={()=>{handleQuestionSubmit()}}>
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
        </div>
      </div>
    </div>
  );
};
export default ChatBot;
