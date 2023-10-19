/*eslint-disable*/

import React, { useState , useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import data from "./components/data";
import Projects from "./components/Projects";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
const FeedMachine = () => {
      useEffect(()=>{
        
      },[data])

      const [feedAdded , setFeedAdded] = useState(null)
      const [feedQuestionAdd , setFeedQuestionAdd] = useState(null)
      const [showFeedInput, setShowFeedInput] = useState(false);


      const handleFeedAdd = (event) => {
        setFeedAdded(event.target.value);
      };
      const handleAddQuestion = (event) => {
        setFeedQuestionAdd(event.target.value);
      };
      
      const handleFeedClick = () => {
        setShowFeedInput(false);
      };

      const handleFeedMachine=() => {
            setShowFeedInput(true);
      };
      const handleCloseFeed=() => {
            setShowFeedInput(false);
      };
      const navigate = useNavigate();
      const hndleNavigate = () => {
        navigate("/add-users");
      };
      return (
            <DashboardLayout>
              <DashboardNavbar />
                <MDBox py={3}>
                  <Grid item xs={12} md={6} lg={12}>
                      <Card>
                        <MDBox
                          mx={2}
                          mt={-3}
                          py={3}
                          px={2}
                          variant="gradient"
                          bgColor="info"
                          borderRadius="lg"
                          coloredShadow="info"
                        >
                          <MDTypography variant="h6" color="white">
                            Suggestions
                          </MDTypography>
                          {/* <butotn className="btn btn-primary add-user-btn">Add User</butotn> */}
                          <MDBox>
                            <MDButton variant="gradient" color="white" onClick={handleFeedMachine}>
                              Add Suggestion
                            </MDButton>
                          </MDBox>
                        </MDBox>
                        <Grid item xs={12} md={6} lg={12}>
                                <Projects />
                              </Grid>
                      </Card>
                    </Grid>

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
                              Enter Suggestion
                            </MDTypography>
                            <MDBox pt={4} pb={3} px={3}>
                              <MDBox component="form" role="form">
                                <MDBox mb={2}>
                                  <MDInput type="text" label="Question" onChange={handleAddQuestion} value={feedQuestionAdd} fullWidth  />
                                </MDBox>
                                <MDBox mb={2}>
                                <TextField id="outlined-multiline-static" label="Answer" multiline rows={4} fullWidth variant="outlined" value={feedAdded} onChange={handleFeedAdd}/>                                
                                </MDBox>
                                <MDBox mt={4} mb={1}>
                                  <MDButton variant="gradient" color="info" fullWidth onClick={handleFeedClick}>
                                    Feed
                                  </MDButton>
                                </MDBox>
                              </MDBox>
                            </MDBox>
                          </Grid>
                          </div> 
                      </div>
                    ):<></>}
                </MDBox>
            {/*  Snack BARS===========================================================================================> */}

                {/* <MDSnackbar
                   color="success"
                   icon="check"
                   title="Updated"
                   content="Profile Updated Successfully!"
                   dateTime="Now"
                   open={SuccessUpdateUser}
                   onClose={closeWarningSB}
                   close={closeWarningSB}
                   bgWhite
                 />
                  <MDSnackbar
                   color="error"
                   icon="error"
                   title="Error"
                   content="Something Went worng!"
                   dateTime="Now"
                   open={ErrorUpdateUser}
                   onClose={closeWarningSB}
                   close={closeWarningSB}
                   bgWhite
                 /> */}
               {/* SNACK BARS Closed =---------------------------------------------------------- */}
            </DashboardLayout>
      )
}
export default FeedMachine;