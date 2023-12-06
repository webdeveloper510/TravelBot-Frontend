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
import Divider from "@mui/material/Divider";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";
import { ArrowBack, ListAlt } from "@mui/icons-material";
import { LoginOutlined } from "@mui/icons-material";
import { Group } from "@mui/icons-material";
import { Icon } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Configurator() {
  // --------------------------------------------------------------------------------->
  const navigate = useNavigate();
  const location= useLocation();
  const PathName = location.pathname
  const handleSendTravelerForm = () => {
    navigate("/travel-form2");
  };
  const handleSendTravelerData = () => {
    navigate("/traveller-data");
  };
  const handleGoBack=()=>{
    navigate("/chat");
  }
  return (
    <ConfiguratorRoot variant="permanent">
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Customer Information</MDTypography>
          <MDTypography variant="body2" color="text">
            See Dashboard options.
          </MDTypography>
        </MDBox>
      </MDBox>
      <Divider />


      <MDButton 
        target="_blank"
        rel="noreferrer"
        color="dark"
        onClick={handleSendTravelerForm}
      >
        <ListAlt />
        &nbsp; Customer Travel Form
      </MDButton>

      <Divider />

      <MDButton
        target="_blank"
        rel="noreferrer"
        color="dark"
        onClick={handleSendTravelerData}

      >
        <Group />
        &nbsp; Customer List
      </MDButton>
      <Divider />

      {PathName=="/travel-form2" || PathName=="/traveller-data"?(
        <MDButton
          target="_blank"
          rel="noreferrer"
          color="dark"
          onClick={handleGoBack}

        >
          <ArrowBack />
          &nbsp; Go Back
        </MDButton>

      ):(<></>)}


      <Divider />
    </ConfiguratorRoot>
  );
}

export default Configurator;
