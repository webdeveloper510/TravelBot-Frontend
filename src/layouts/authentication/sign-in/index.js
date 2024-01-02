/**
=========================================================

=========================================================

======================SIGN IN FORM=======================

 =========================================================

*/
/*eslint-disable*/

import { useState } from "react";
import logo from "../../../assets/images/logo.png"
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axios";
import { API } from "config/Api";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import MDSnackbar from "components/MDSnackbar";

function Basic() {

  // States Management

  const [LoginEmail, setLoginEmail] = useState(null);
  const [LoginPassword, setLoginPassword] = useState(null);
  const [EmailNull, SetEmailNull] = useState(false);
  const [PasseordNull, SetPasseordNull] = useState(false);
  const [SuccessLogIn, setSuccessLogIn] = useState(false);
  const [ErrorLogIn, setErrorLogIn] = useState(false);
  const navigate = useNavigate();

  // Function Calling

  const handleEmailInput = (event) => {
    setLoginEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setLoginPassword(event.target.value);
  };
  const handleLogin = () => {
    const formdata = new FormData();
    if (LoginEmail === null) {
      SetEmailNull(true)
    }
    if (LoginEmail === null) {
      SetPasseordNull(true)
    }
    if (LoginEmail !== null && LoginPassword === null){
      SetPasseordNull(true)
    }
    if (LoginEmail === null && LoginPassword !== null){
      SetPasseordNull(true)
    }
    formdata.append("email", LoginEmail);
    formdata.append("password", LoginPassword);
    axios.post(API.BASE_URL + "login/", formdata)
      .then((response) => {
        setSuccessLogIn(true);
        setTimeout(()=> {
            if (response.data.is_admin){
              localStorage.setItem("Admin-Token", response.data.token.access);
              navigate("/dashboard");
              window.location.reload();
            } else {
              localStorage.setItem("Token", response.data.token.access);
              navigate("/chat");
              window.location.reload();
            }
        },1000)
        }).catch((error) => {
          setErrorLogIn(true);
      });
  };
  const handleEnterKey = (e) => {
    console.log(e.code)
    if (e.code === "Enter" || e.code==="NumpadEnter"){
      handleLogin()
    }
  }
  const closeWarningSB = () => {
    setSuccessLogIn(false);
    setErrorLogIn(false)
};

  return (
    <BasicLayout image={bgImage}>
  {/* <MDAlert color="success" dismissible>This is an alert!</MDAlert> */}

      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <div className="logo-img">
            <img src={logo} alt="logo" />
          </div>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign In
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}> */}
            {/* <Grid item xs={2}> */}
              {/* <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography> */}
            {/* </Grid> */}
            {/* <Grid item xs={2}> */}
              {/* <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography> */}
            {/* </Grid> */}
            {/* <Grid item xs={2}> */}
              {/* <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography> */}
            {/* </Grid> */}
          {/* </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" onChange={handleEmailInput} fullWidth error={EmailNull} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" onChange={handlePassword} fullWidth error={PasseordNull} onKeyPress={(e)=> {handleEnterKey(e)}} />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                sign in
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>

        {/*  Snack BARS =================================================================================================> */}
        <MDSnackbar
            color="success"
            icon="check"
            title="Log In"
            content="User Loged In Successfully!"
            dateTime="Now"
            open={SuccessLogIn}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
           <MDSnackbar
            color="error"
            icon="error"
            title="Error Loging In"
            content="Please Check Your Provided credintials!"
            dateTime="Now"
            open={ErrorLogIn}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
        {/*  Snack BARS CLOSED ===========================================================================================> */}

    </BasicLayout>
  );
}

export default Basic;
