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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import { API } from "config/Api";
import MDSnackbar from "components/MDSnackbar";
function ProfileInfoCard({ title, description, info, action , shadow , setUpdateUser}) {
  const [showEditForm, setShowEditForm] = useState(false)
  const [userFirstName , setUserFirstName] = useState("")
  const [userLastName , setUserLastName] = useState("")
  const [userEmail , setUserEmail] = useState("")
  const [userID , setUserID] = useState(null)
  const [SuccessUpdateUser, setSuccessUpdateUser] = useState(false);
  const [ErrorUpdateUser, setErrorUpdateUser] = useState(false);
  // const [UpdateUser, setUpdateUser] = useState(false);

  const adminAccessToken = localStorage.getItem("Admin-Token");
  console.log(setUpdateUser)
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;
  useEffect(()=>{
    setUserID(action.val)
    setUserEmail(info.email)
    const fullNameArray = info.fullName.split(" ");

  // Extract the first name and last name
  setUserFirstName(fullNameArray[0])
  setUserLastName(fullNameArray.slice(1).join(" "))
  },[info, action.val])
  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  const handleShowPOP=()=>{
    setShowEditForm(true);
  }
  const handleCloseFeed=()=>{
    setShowEditForm(false);
  }

  const handleUpdateProfile=()=>{
    const formData=new FormData();
    formData.append("firstname", userFirstName)
    formData.append("lastname", userLastName)
    formData.append("email", userEmail)
    axios.put(API.BASE_URL+"profileupdate/"+userID+"/", formData,{
      headers: {
        Authorization: `Bearer ${adminAccessToken}`,
      },
    }).then((res)=>{
      setShowEditForm(false);
      // setSuccessUpdateUser(true);
        setUpdateUser(true);
    }).catch((err)=>{
      setErrorUpdateUser(true);
    })
  }
  const closeWarningSB = () => {
    setSuccessUpdateUser(false);
    setErrorUpdateUser(false)
};
  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component={Link} to={action.route} variant="body2" color="secondary" onClick={handleShowPOP}>
        <Tooltip placement="top">
          <Icon>edit</Icon>
        </Tooltip>
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          {renderItems}
          {/* <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </MDTypography>
            {renderSocial}
          </MDBox> */}
        </MDBox>
      </MDBox>
      {showEditForm?(
          <div className='modal'>
            <div className='modal-content'>
            <div className="close-div">
            <button className="close-button" icon="close" onClick={handleCloseFeed}>
              <Icon>close</Icon>
            </button>
            </div>
             <Grid item>
              <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize" textAlign="center" >
                Edit Profile
              </MDTypography>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput type="text" label="First Name" value={userFirstName} fullWidth onChange={(e)=>setUserFirstName(e.target.value)} />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput type="text" label="Last Name" value={userLastName} fullWidth onChange={(e)=>setUserLastName(e.target.value)} />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput type="email" label="Email" value={userEmail} fullWidth onChange={(e)=>setUserEmail(e.target.value)} />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth onClick={handleUpdateProfile} >
                      Update
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Grid>
            </div> 
              {/*  Snack BARS===========================================================================================> */}

                <MDSnackbar
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
                 />
               {/* SNACK BARS Closed =---------------------------------------------------------- */}
         </div>

      ):<></>}

    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  // social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
  // setUpdateUser: true,
};

export default ProfileInfoCard;
