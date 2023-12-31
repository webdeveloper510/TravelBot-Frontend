/**
=========================================================

=========================================================

======================SIGN UP FORM=======================

=========================================================


*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
/*eslint-disable*/
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useState } from "react";
import axios from "axios";
import { API } from "config/Api";
import { Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MDSnackbar from "components/MDSnackbar";

function Cover() {
  // States Management
  const [AddFirstname, SetAddFirstname] = useState("");
  const [AddLastname, SetAddLastname] = useState("");
  const [AddEmail, SetAddEmail] = useState("");
  const [AddPassword, SetAddPassword] = useState("");
  const [FirstNameNull, SetFirstNameNull] = useState(false);
  const [LastNameNull, SetLastNameNull] = useState(false);
  const [EmailNull, SetEmailNull] = useState(false);
  const [PasseordNull, SetPasseordNull] = useState(false);
  const [SuccessAddUser, setSuccessAddUser] = useState(false);
  const [ErrorAddUser, setErrorAddUser] = useState(false);

  const navigate = useNavigate()
  // Function Calling
  const handleAddFirstname = (event) => {
    SetAddFirstname(event.target.value);
  };
  const handleAddLastname = (event) => {
    SetAddLastname(event.target.value);
  };
  const handleAddEmail = (event) => {
    SetAddEmail(event.target.value);
  };
  const handleAddPassword = (event) => {
    SetAddPassword(event.target.value);
  };
  const handleAddUser = () => {
    const formData = new FormData();
    console.log(AddFirstname, AddLastname, AddEmail, AddPassword)
    if (AddFirstname === ""){
      SetFirstNameNull(true)
    }
    else {
      SetFirstNameNull(false)
    }
    if (AddLastname === ""){
      SetLastNameNull(true)
    }
    else {
      SetLastNameNull(false)
    }
    if (AddEmail === ""){
      SetEmailNull(true)
    }
    else {
      SetEmailNull(false)
    }
    if (AddPassword === ""){
      SetPasseordNull(true)
    }
    else {
      SetPasseordNull(false)
    }
    formData.append("firstname", AddFirstname);
    formData.append("lastname", AddLastname);
    formData.append("email", AddEmail);
    formData.append("password", AddPassword);
    axios.post(API.BASE_URL + "register/", formData)
      .then((response) => {
        setSuccessAddUser(true);
        setTimeout(()=>{
          navigate("/users")
        },1000)
      }).catch((error) => {
        if (error.response.data.email[0] === "Enter a valid email address."){
          SetEmailNull(true)
          setErrorAddUser(true);

        }
      });
  };
  const closeWarningSB = () => {
      setErrorAddUser(false);
      setSuccessAddUser(false)
  };
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6} mt={8}>
        <MDBox mt={8}>
              <MDBox mb={3}>
                <Card>
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={-3}
                    p={3}
                    mb={1}
                    textAlign="center"
                  >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                      Add User
                    </MDTypography>
                    {/* <MDTypography display="block" variant="button" color="white" my={1}>
                      Enter email and password to register
                    </MDTypography> */}
                  </MDBox>
                  <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Firstname"
                          variant="standard"
                          onChange={handleAddFirstname}
                          fullWidth
                          error={FirstNameNull}
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Lastname"
                          variant="standard"
                          onChange={handleAddLastname}
                          fullWidth
                          error={LastNameNull}
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          type="email"
                          label="Email"
                          variant="standard"
                          onChange={handleAddEmail}
                          fullWidth
                          error={EmailNull}
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          type="password"
                          label="Password"
                          variant="standard"
                          onChange={handleAddPassword}
                          fullWidth
                          error={PasseordNull}
                        />
                      </MDBox>
                      {/* <MDBox display="flex" alignItems="center" ml={-1}>
                        <Checkbox />
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          color="text"
                          sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                        >
                          &nbsp;&nbsp;I agree the&nbsp;
                        </MDTypography>
                        <MDTypography
                          component="a"
                          href="#"
                          variant="button"
                          fontWeight="bold"
                          color="info"
                          textGradient
                        >
                          Terms and Conditions
                        </MDTypography>
                      </MDBox> */}
                      <MDBox mt={4} mb={1}>
                        <MDButton variant="gradient" color="info" onClick={handleAddUser} fullWidth>
                          Submit
                        </MDButton>
                      </MDBox>
                      {/* <MDBox mt={3} mb={1} textAlign="center">
                        <MDTypography variant="button" color="text">
                          Already have an account?{" "}
                          <MDTypography
                            component={Link}
                            to="/authentication/sign-in"
                            variant="button"
                            color="info"
                            fontWeight="medium"
                            textGradient
                          >
                            Sign In
                          </MDTypography>
                        </MDTypography>
                      </MDBox> */}
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </MDBox>
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
      </Container>


        {/*  Snack BARS===========================================================================================> */}

          <MDSnackbar
            color="success"
            icon="star"
            title="User Added"
            content="User Added Successfully!"
            dateTime="Now"
            open={SuccessAddUser}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
           <MDSnackbar
            color="error"
            icon="error"
            title="User Not Added"
            content="User Not Added!"
            dateTime="Now"
            open={ErrorAddUser}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
        {/* SNACK BARS Closed =---------------------------------------------------------- */}
    </DashboardLayout>
  );
}

export default Cover;
