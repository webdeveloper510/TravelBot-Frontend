/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Admin Dashboard,Dashboard Files get page.
=========================================================
*/
/*eslint-disable*/

// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
// Images

import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "config/Api";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDSnackbar from "components/MDSnackbar";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import MDInput from "components/MDInput";


export default function data(props) {

  // States Management -------------------------------------------------------------------------------------------->

  const adminAccessToken = localStorage.getItem("Admin-Token");
  const [FilesList, SetFilesList] = useState([]);
  const [FilesId, SetFilesId] = useState('');
  const [SuccessDeleteFile, setSuccessDeleteFile] = useState(false);
  const [menu, setMenu] = useState(null);
  const [showFeedInput, setShowFeedInput] = useState(false);
  const [feedQuestionAdd , setFeedQuestionAdd] = useState("")
  const [feedAdded , setFeedAdded] = useState("")
  const [UpdateFeedValue , setUpdateFeedValue] = useState(false);
  const [UpdateErrFeedValue , setUpdateErrFeedValue] = useState(false);
  const [UpdateState , setUpdateState] = useState(false);

  
  
  // FUMCTIONS Management -------------------------------------------------------------------------------------------->
  const handlefeedQuestion = (event) => {
    setFeedQuestionAdd(event.target.value);
  };
  const handlefeedAns = (event) => {
    setFeedAdded(event.target.value);
  };

  useEffect(() => {
    axios
      .get(API.BASE_URL + "userhistory/", {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      })
      .then((res) => {
        SetFilesList(res.data.data);
        setUpdateState(false)
        props.setTrigger(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [UpdateState, props.trigger]);


  const openMenu = ({ currentTarget } , id , question , answer) => {
    setFeedQuestionAdd(question)
    setFeedAdded(answer)
    setMenu(currentTarget)
    SetFilesId(id)
  };

  
  const closeMenu = () => setMenu(null);
  
  const handleEditFile=()=>{
      setShowFeedInput(true);
  }

    const handleSubmitUpdateFeed=()=>{
    const formData = new FormData();
    formData.append("suggestion", feedAdded);
    axios.put(API.BASE_URL+"suggestion/"+FilesId+"/", formData, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
    }).then((response) => {
      console.log(response)
      setShowFeedInput(false);
      setUpdateFeedValue(true);
      setUpdateState(true)
    }).catch((error)=>{
      setShowFeedInput(false);
      setUpdateErrFeedValue(true);
    })
  }


  const handleCloseFeed=() => {
        setShowFeedInput(false);
  };

  const handleDeleteQuestion = (id) => {
    console.log(id);
    // axios.delete(API.BASE_URL+"deletefile/"+id+"/",{
    //   headers: {
    //     Authorization: `Bearer ${adminAccessToken}`,
    //   },
    // }).then((res)=>{
    //   setSuccessDeleteFile(true);
    //   props.setTrigger(true)
    // }).catch((err)=>{
    //   console.log(err)
    // })
  }
 
  const closeWarningSB = () => {
    setSuccessDeleteFile(false)
    setUpdateFeedValue(false);
    setUpdateErrFeedValue(false);
};

  const Filename = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Question", accessor: "question", width: "45%", align: "left" },
      { Header: "Answers", accessor: "answers", width: "45%", align: "left" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: FilesList.map((files) => ({
      question: (
      <MDBox>
        {files.questions}
      </MDBox>
      ),
      answers:(
        <MDBox>
        {files.answer}
        </MDBox>
      ),
      action: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          <MDBox color="text" px={2}>
            <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={(event) => openMenu(event , files.id , files.questions , files.answer)}>
              more_vert
            </Icon>
          </MDBox>
          <Menu id="simple-menu" anchorEl={menu} anchorOrigin={{vertical: "top",horizontal: "left",}} transformOrigin={{vertical: "top",horizontal: "right",}} open={Boolean(menu)} onClose={closeMenu} >
            <MenuItem style={{color:"blue"}} onClick={()=>{handleEditFile()}}>Edit</MenuItem>
            <MenuItem style={{color:"red"}} onClick={()=>{handleDeleteQuestion(FilesId)}} >Delete</MenuItem> 
          </Menu>


        {/* POPUP EDIT QUESTION ANSWERS  --------------------------------------------------------------------> */}


        {showFeedInput?(
            <div className='modal'>
              <div className='modal-content'>
                <div className="close-div">
                  <button className="close-button" icon="close" onClick={handleCloseFeed}>
                    <Icon>close</Icon>
                  </button>
                </div>
                <Grid item>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize" textAlign="center" >
                          Enter Feed
                    </MDTypography>
                    <MDBox pt={4} pb={3} px={3}>
                          <MDBox component="form" role="form">
                            <MDBox mb={2}>
                      
                              <MDInput type="text"   onChange={handlefeedQuestion} name="feedQuestionAdd" label="Question" defaultValue={feedQuestionAdd} fullWidth  />
                            </MDBox>
                            <MDBox mb={2}>
                              <TextField id="outlined-multiline-static" label="Add Feed"      onChange={handlefeedAns} name="answer" multiline rows={4}  defaultValue={feedAdded} fullWidth variant="outlined" />                                
                            </MDBox>
                            <MDBox mt={4} mb={1}>
                              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmitUpdateFeed} >Feed</MDButton>
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </Grid>
                </div> 
            </div>
      ):<></>}

        {/*  Snack BARS===========================================================================================> */}

        <MDSnackbar
            color="error"
            icon="error"
            title="File Deleted"
            content="Error Occured"
            dateTime="Now"
            open={UpdateErrFeedValue}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
          <MDSnackbar
            color="success"
            icon="check"
            title="Feed Updated"
            content="Feed Updated Successfully!"
            dateTime="Now"
            open={UpdateFeedValue}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
        {/* SNACK BARS Closed =---------------------------------------------------------- */}
        </MDTypography>
        
      ),
    })),
  };
}
