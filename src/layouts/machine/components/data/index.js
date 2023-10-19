/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Admin Dashboard,Dashboard Files get page.
=========================================================
*/
/*eslint-disable*/

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import MDButton from "components/MDButton";
// Images
import logo from "assets/csv/paragraph-svgrepo-com.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
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
  // States Management
  console.log(props, "-----------")
  const adminAccessToken = localStorage.getItem("Admin-Token");
  // const [FilesList, SetFilesList] = useState([]);
  const [FilesUrl, SetFilesUrl] = useState('');
  const [FilesId, SetFilesId] = useState('');
  const [SuccessDeleteFile, setSuccessDeleteFile] = useState(false);
  const [menu, setMenu] = useState(null);
  const [showFeedInput, setShowFeedInput] = useState(false);
  const [feedQuestionAdd , setFeedQuestionAdd] = useState(null)
  const [UpdateFeedValue , setUpdateFeedValue] = useState(false);
  const handleAddQuestion = (event) => {
    setFeedQuestionAdd(event.target.value);
  };
  const openMenu = ({ currentTarget }, file , id) => {
    setMenu(currentTarget)
    SetFilesUrl(file)
    SetFilesId(id)
  };
  const closeMenu = () => setMenu(null);
  const handleEditFile=(FilesId)=>{
      console.log(FilesId)
      setShowFeedInput(true);
  }
  const handleSubmitUpdateFeed=()=>{
    setShowFeedInput(false);
    setUpdateFeedValue(true);
  }
  const handleCloseFeed=() => {
        setShowFeedInput(false);
  };
  // Function Calling
  // useEffect(() => {
  //   axios
  //     .get(API.BASE_URL + "csvfilehistory/", {
  //       headers: {
  //         Authorization: `Bearer ${adminAccessToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       SetFilesList(res.data.data);
  //       props.setTrigger(false)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [props.trigger]);
  // const handleDeleteFile = (id) => {
  //   axios.delete(API.BASE_URL+"deletefile/"+id+"/",{
  //     headers: {
  //       Authorization: `Bearer ${adminAccessToken}`,
  //     },
  //   }).then((res)=>{
  //     setSuccessDeleteFile(true);
  //     props.setTrigger(true)
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // }
  const FilesList = [{"id":1,"data":"Traveling to Russia in winter can be a unique and exciting experience, but it's important to be prepared and plan accordingly because Russian winters are quite cold."}]
  const closeWarningSB = () => {
    setSuccessDeleteFile(false)
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
      { Header: "S.No", accessor: "srno", width: "45%", align: "left" },
      { Header: "Question", accessor: "question", width: "45%", align: "left" },
      { Header: "Answers", accessor: "answers", width: "45%", align: "left" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: FilesList.map((files) => ({
      question: (
      <MDBox>
        Is this fine to go Russia in Winters ?
      </MDBox>
      ),
      srno: (
        <MDBox display="flex" py={1}>
          {files.id}
        </MDBox>
      ),
      answers:(
        <MDBox>
        {files.data}
        </MDBox>
      ),
      action: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          <MDBox color="text" px={2}>
            <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={(event) => openMenu(event , files.id)}>
              more_vert
            </Icon>
          </MDBox>
          <Menu
            id="simple-menu"
            anchorEl={menu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(menu)}
            onClose={closeMenu}
          >
            <MenuItem style={{color:"blue"}} onClick={()=>{handleEditFile()}}>Edit</MenuItem>
            <MenuItem style={{color:"red"}} >Delete</MenuItem> 
            {/* onClick={()=>{handleDeleteFile(FilesId)}} */}
          </Menu>
          {/*  Snack BARS===========================================================================================> */}

          <MDSnackbar
            color="success"
            icon="delete"
            title="File Deleted"
            content="File Deleted Successfully!"
            dateTime="Now"
            open={SuccessDeleteFile}
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
                    <MDInput type="text" label="Question" onChange={handleAddQuestion} value={feedQuestionAdd} fullWidth  />
                </MDBox>
                <MDBox mb={2}>
                <TextField id="outlined-multiline-static" label="Add Feed" multiline rows={4} fullWidth variant="outlined" />                                
                </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmitUpdateFeed} >
                      Feed
                </MDButton>
              </MDBox>
              </MDBox>
            </MDBox>
            </Grid>
            </div> 
      </div>
      ):<></>}
        </MDTypography>
        
      ),
    })),
  };
}
