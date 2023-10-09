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
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Popup from "reactjs-popup";

import MDTypography from "components/MDTypography";
import { useState } from "react";
import axios from "axios";
import { API } from "config/Api";
import sampleCSV from "../../assets/csv/sampleformat.csv"
function Dashboard() {
  // States Management
  const [CSVFileUpload, SetCSVFileUpload] = useState(null)
  const [loading, setLoading] = useState(false);
  const [UpLoading, setUpLoading] = useState(false);
  const [ShowFeedStep, SetShowFeedStep] = useState(false);
  const adminAccessToken = localStorage.getItem("Admin-Token");

  // Function Calling
  const downLoadSampleCSV = () => {
    const sampleCSV =`id,question,answer,label,,,,,,
    1,What is Python?,Python is a high-level general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected. It supports multiple programming paradigms including structured object-oriented and functional programming.,python,,,,,,
    ,,,,,,,,,
    ,,,,,,,,,
    ,,,,,,,,,
    ,,,,,,,,,
    ,,,,,,,,,
    ,,,,,,,,,
    ,,,,,,,,,
    ,,,,,,,,,`
    const blob = new Blob([sampleCSV], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "sample-csv.csv";
    link.click();
    window.URL.revokeObjectURL(link.href);
  };
  const handleShowFeed = () => {
    SetShowFeedStep(true);
  }
  const handleCloseFeed = () => {
    SetShowFeedStep(false);
  }
  const fileInputCSV=(event)=>{
    SetCSVFileUpload(event.target.files[0])
  }
  const uploadForTrain = localStorage.getItem("uploaded-csv")
  const FileUploadCSV=()=>{
    SetShowFeedStep(false);
    setUpLoading(true);
    const formdata = new FormData();
    formdata.append("csv_file", CSVFileUpload)
    axios.post(API.BASE_URL+"csvupload/", formdata)
    .then((res)=>{
          if (res.data.message==="File uploaded and data saved successfully"){
            console.log("File uploaded successfully")
            setTimeout(()=>{
              setUpLoading(false)
              window.location.reload();
            },2000)
            localStorage.setItem("uploaded-csv", "Upload Nedd to Train")
                // toast.success(res.data.message, {autoClose:1000})
          }
          else{
            // SetShowNextStep(true);
                // toast.warn(res.data.message, {autoClose:1000})
                console.log(res.data.message)
          }
    })
    .catch((err)=>{
          // toast.warn("Please Check the file again !", {autoClose:1000})      
          console.log("Please Check the file again !")      
    })
  }
  const trainModel=()=>{
    setLoading(true);
    axios.post(API.BASE_URL+"trainmodel/",{
          headers: {
                Authorization: `Bearer ${adminAccessToken}`,
          },
    }).then((response)=>{
          setLoading(false);
          localStorage.removeItem("uploaded-csv")
          close()
          toast.success("Model trained Successfully!", {autoClose:1000})
    }).catch((error)=>{
          setLoading(false);
          console.error(error)
    })
}
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
                <h3 className="heading-step">Step 1 <span className="successTag"> {uploadForTrain? "Completed" : ""}</span></h3>
                <MDBox mb={1.5} onClick={uploadForTrain ? null : handleShowFeed} style={uploadForTrain ? { cursor: "not-allowed" } : { cursor: "pointer" }} className={uploadForTrain ? "desabled":""}>
                  <ComplexStatisticsCard className="desable-uploaded" color="dark" icon={uploadForTrain ? "stop": "upload"} title={uploadForTrain ? "Train Modal First" : "Feed The Brain" } />
                </MDBox>
              {ShowFeedStep ? 
               ( <div className='modal'>
                  <div className='content-popup'>
                        <div className="close-div">
                              <button className="close-button" icon="close" onClick={handleCloseFeed}>
                                <Icon>close</Icon>
                              </button>
                        </div>
                        <div className="preview-sample">
                              <h3 className="heading">Feed The Brain</h3>
                              <p className="info-csv">Please Upload an Valid CSV. If you don't have sample CSV. <br/>
                              Click on <button type="button" className="sample-csv" onClick={downLoadSampleCSV}><u>Get Sample CSV</u></button>
                              </p>
                        </div>
                        <div className="input-file">
                              <input type="file" className="upload-csv-file" onChange={fileInputCSV}/>
                              <button type="button" className="save-file" onClick={FileUploadCSV}>Upload</button>
                        </div>

                  </div>

                </div>)
              : (<></>)}
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
          <div className="your-component">
            {/* Background overlay */}
            {loading && <div className="overlay"></div>}
            {/* Render a loader based on the loading state */}
            {loading ? (
            <div className="loader">Processing...</div>
            ) : (<></>)}
          </div>
            <h3 className="heading-step">Step 2</h3>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard icon="psychology" title="Train Model" />
              <MDButton variant="gradient" color="success" onClick={trainModel}>
                Click to Train
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
        <MDBox>
        {/* <Grid item xs={12} md={6} lg={3}> */}
          <div className="your-component">
              {/* Background overlay */}
              {UpLoading && <div className="overlay"></div>}
              {/* Render a loader based on the loading state */}
              {UpLoading ? (
              <div className="loader">Uploading CSV...</div>
              ) : (<></>)}
          </div>
        {/* </Grid> */}

          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
