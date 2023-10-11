/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/*eslint-disable*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MDInput from "components/MDInput";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "config/Api";
import { toast } from "react-toastify";
import MDSnackbar from "components/MDSnackbar";
function Overview(props) {

  // States MAnagement -------------------------------------------------------->
  const [ProfileDetails, SetProfileDetails] = useState([]);
  const [newPassword , setNewPassword] = useState(null);
  const [confirmPassword , setConfirmPassword] = useState(null);
  const [ErrnewPassword , ErrsetNewPassword] = useState(false);
  const [ErrconfirmPassword , ErrsetConfirmPassword] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [SuccessSB, setSuccessSB] = useState(false);
  const adminAccessToken = localStorage.getItem("Admin-Token");
  const [UpdateUser, setUpdateUser] = useState(false);

  // USeEffects Working -------------------------------------------------------->

  // Create a function to update the state
  const handleUpdateUser = (updated) => {
    setUpdateUser(updated);
  };
  useEffect(() => {
    axios
      .get(API.BASE_URL + "userprofile/", {
      headers: {
        Authorization: `Bearer ${adminAccessToken}`,
      },
    }).then((response) => {
      SetProfileDetails(response.data);
      setUpdateUser(false);
    }).catch((error) =>{
      console.log("error")
    })
  }, [UpdateUser]);

  // Function Calling -------------------------------------------------------->

  const handleNewPassword = (e) => {
      setNewPassword(e.target.value);
  }
  const handleConfirmPassword = (e) => {
      setConfirmPassword(e.target.value)
  }

  const handleChangePassword = () =>{
    if (newPassword === null){
      ErrsetNewPassword(true);
    }
    if (confirmPassword === null){
      ErrsetConfirmPassword(true)
    }
    const formdata = new FormData();
    formdata.append("password", newPassword)
    formdata.append("password2", confirmPassword)
    axios.post(API.BASE_URL + "changepassword/",formdata,{
      headers: {
        Authorization: `Bearer ${adminAccessToken}`,
      },
    }).then((res)=>{
      setSuccessSB(true);
    }).catch((err)=>{
      setWarningSB(true);
    })
  }
  const closeWarningSB = () => {
    setWarningSB(false)
    setSuccessSB(false)
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header UpdateUser={UpdateUser}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            {/* <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid> */}
            <Grid item xs={12} md={6} xl={8} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              {ProfileDetails && (

                <ProfileInfoCard
                title="profile information"
                description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: ProfileDetails.firstname + " " + ProfileDetails.lastname,
                  email: ProfileDetails.email,
                }}
                action={{ route: "" , tooltip: "Edit Profile", val: ProfileDetails.id}}
                shadow={false}               
                setUpdateUser={handleUpdateUser}
              />
              )}
              
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Change Password
              </MDTypography>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput type="password" label="New Password" onChange={handleNewPassword} fullWidth error={ErrnewPassword} />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput type="password" label="Confirm Password" onChange={handleConfirmPassword} fullWidth error={ErrconfirmPassword} />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth onClick={handleChangePassword} >
                      Change Password
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* SNACK BARS =---------------------------------------------------------- */}
      <MDSnackbar
        color="warning"
        icon="star"
        title="Error Occured"
        content="New Pasword and Confirm Password not Matched"
        dateTime="Now"
        open={warningSB}
        onClose={closeWarningSB}
        close={closeWarningSB}
        bgWhite
      />
       <MDSnackbar
        color="success"
        icon="star"
        title="Password Changed"
        content="Password Changed Successfully!"
        dateTime="Now"
        open={SuccessSB}
        onClose={closeWarningSB}
        close={closeWarningSB}
        bgWhite
      />
        {/* SNACK BARS Closed =---------------------------------------------------------- */}

      </Header>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
