/*eslint-disable*/
import React, {useEffect , useState , useRef} from "react";
import { API } from "config/Api";
import axios from "axios";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ReactTyped from "react-typed";
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
import Configurator from "examples/Configurator";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";



const ChatBot = () => {

  let vendorName = localStorage.getItem("vendorName");

  const {state} = useLocation()
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
  const [firstnameLetter , setfirstnameLetter] = useState(null);
  const ItineraryState = state ? state.ItineraryState : false;

  const gettedResponse = localStorage.getItem('gettedResponse');


// ******************************** USEEFFECTS ********************************


  useEffect(()=>{
    axios.get(API.BASE_URL+"userprofile/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res)=>{
      setfirstnameLetter(res.data.firstname[0])
    }).catch((err)=>{
      console.log(err)
    })
  },[])

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
    

// // Functions Management ------------------------------------------------------------------------------------->


  const GetChatDetails=(id)=>{
    axios.get(API.BASE_URL + "getchat/"+id+"/",{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },                                              
    }).then((res)=>{      
      if (res.data.data){
        for (let i = 0; i < res.data.data.length; i++) {
          const inputString = res.data.data[i].answer;
          const answerstring = inputString.replace(/['",']/g, '');
          const formattedString = answerstring.replace(/(\d+: .+?:)(\n- -[^:\n]+)/g, '$1\n  $2');
          const withoutBrackets = formattedString.replace(/^\[|\]$/g, '');  // Remove square brackets at the beginning and end
          const withoutDoubleHyphen = withoutBrackets.replace(/[--]/g, '   ');  // Replace "--" with two spaces
          let lines = withoutDoubleHyphen.split("\\n");
          console.log(lines)
          res.data.data[i].answer = lines;
        }
    }
      
      setValueChatGet(res.data.data);
      const chatHistory = res.data.data;
      const questionArray = chatHistory.map((item) => item.questions);
      const answerArray = chatHistory.map((item) => item.answer);
      const answerTIme = chatHistory.map((item) => item.time);
      const answerID = chatHistory.map((item) => item.id);
      const TopicName = chatHistory.map((item) => item.topic);
      axios.get(API.BASE_URL+"topics/",{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res)=>{
        res.data.data.map((data, i)=>{
          if (data.id === id){
            if (data.vendor_name=="Undefined"){
              var vendorNameGet = []
            }else {
              vendorNameGet = data.vendor_name
            }
            localStorage.setItem("vendorName",  vendorNameGet)
          }
        })
      })
      for (let i=0; i<TopicName.length; i++){
        if(TopicName[i]===""){
          continue
        }else{
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





  const handleNewChatClick = () => {
    axios.post(API.BASE_URL+"topics/",{name:"Chat"},{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response)=>{
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
    console.log()
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
  console.log('hit')
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
    formdata.append("vendor_name" , vendorName)
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
        {!ItineraryState ? (
        <div className="side-contetnt">
            <div className="sidebar">
                  <div className="new-chat-bttn">
                    <div className="bttn-chat">
                      <a className="flex px-3 " href="#chat" onClick={handleNewChatClick}>
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon-sm shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="icon-sm" viewBox="0 0 24 24">
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
      ):<></>}
        {/* ----------------------------------------------------------------CHAT SECTION----------------------------------------------------------------- */}


        <div className="content">
        {!ItineraryState ? (

          <div className="chat-side px-5">
            <div className="chat-messages" ref={chatContainerRef}>

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 64 64" className="display-flex self-center mr-2"><circle cx="32" cy="32" r="30" fill="#365788"></circle><text x="20" y="42" fill="#fff" fontFamily="Arial, sans-serif" fontSize="36">{firstnameLetter}</text></svg>
                    <div className="question-submit">
                        <h3 className="question">{question}</h3>
                          <div className="text-right">
                        </div>
                    </div>
                  </div>
                  {answers.length > 0 && answers[index] !== "" ? (
                    <div key={index} >
                      <div className="display-flex">
                        <svg className="display-flex self-center mr-2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 41 41" style={{padding: "4px 4px",background: "#365788",borderRadius: "15px"}}><text x="-9999" y="-9999">  ChatGPT</text><path fill="#fff" d="M37.532 16.87a9.963 9.963 0 00-.856-8.184 10.078 10.078 0 00-10.855-4.835A9.964 9.964 0 0018.306.5a10.079 10.079 0 00-9.614 6.977 9.967 9.967 0 00-6.664 4.834 10.08 10.08 0 001.24 11.817 9.965 9.965 0 00.856 8.185 10.079 10.079 0 0010.855 4.835 9.965 9.965 0 007.516 3.35 10.078 10.078 0 009.617-6.981 9.967 9.967 0 006.663-4.834 10.079 10.079 0 00-1.243-11.813zM22.498 37.886a7.474 7.474 0 01-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 00.655-1.134V19.054l3.366 1.944a.12.12 0 01.066.092v9.299a7.505 7.505 0 01-7.49 7.496zM6.392 31.006a7.471 7.471 0 01-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 001.308 0l9.724-5.614v3.888a.12.12 0 01-.048.103l-8.051 4.649a7.504 7.504 0 01-10.24-2.744zM4.297 13.62A7.469 7.469 0 018.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 00.654 1.132l9.723 5.614-3.366 1.944a.12.12 0 01-.114.01L7.04 23.856a7.504 7.504 0 01-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 01.113-.01l8.052 4.648a7.498 7.498 0 01-1.158 13.528v-9.476a1.293 1.293 0 00-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 00-1.308 0l-9.723 5.614v-3.888a.12.12 0 01.048-.103l8.05-4.645a7.497 7.497 0 0111.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 01-.065-.092v-9.299a7.497 7.497 0 0112.293-5.756 6.94 6.94 0 00-.236.134l-7.965 4.6a1.294 1.294 0 00-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"></path></svg>
                          <div className="user-response">   
                          <h3 className="answer">
                            {answers[index] ? (
                              typeof answers[index] === "string" ? (
                                answers[index]
                              ) : (answers[index].map((answer, i) => (
                                  <li key={i} style={{listStyle:'none', whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{ __html: answer }}></li>))
                                )
                            ) : (
                              <ReactTyped strings={["Typing....."]} typeSpeed={100} loop />
                            )}
                          </h3>
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
                            ) : ("")}
                    </div> ) : (<></>)}
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
          <textarea
          id="another-textarea"
            type="text"
            className="form-control-chat"
            value={currentQuestion}
            onChange={handleInputQuestion}
            onKeyDown={handleKeyPress}
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
        ):
        (
        gettedResponse?(
        <Box component="section" sx={{ px: 10, py:5, border: '1px dashed grey' }} >
          <div dangerouslySetInnerHTML={{ __html: gettedResponse }} />
        </Box>

        ):(
        <div className="logo-ct">
        <img src={logo} alt="chat image"/>
        </div>
        )
        )
        }
        </div>
        {/* ----------------------------------------------------------------Configurator SECTION----------------------------------------------------------------- */}

        <Configurator />
      </div>
    </div>
  );
};
export default ChatBot;
