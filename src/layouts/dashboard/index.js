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
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "config/Api";
import sampleCSV from "../../assets/csv/sampleformat.csv"
import MDSnackbar from "components/MDSnackbar";
import data from "./components/Projects/data";
function Dashboard() {
  // States Management
  const [CSVFileUpload, SetCSVFileUpload] = useState(null)
  const [loading, setLoading] = useState(false);
  const [UpLoading, setUpLoading] = useState(false);
  const [ShowFeedStep, SetShowFeedStep] = useState(false);
  const [CSVUpload , SetCSVUpload] = useState(false);
  const [CSVWarn , SetCSVWarn] = useState(false);
  const [CSVError , SetCSVError] = useState(false);
  const [ModelTrain , SetModelTrain] = useState(false);
  const [Trigger , setTrigger] = useState(false);
  const adminAccessToken = localStorage.getItem("Admin-Token");

  // Function Calling
  const downLoadSampleCSV = () => {
    const sampleCSV =`ID,Vendor,NET Cost by Experience,NET Cost by Hour,NET Cost Per Person Adult,NET Cost Per Person Child/Senior,Is The Guide Included in the cost,Maximum Pax per cost,Location,Description of the Experience,Time of Visit (in hours),Contact First Name,Contact Last Name,Contact Number,Contact Email,Tag 1,Tag 2,Tag 3,Tag 4,Tag 5,Tag 6
    1,Falconry Experience,170,,,,Yes,,Ghar Lapsi,,1:30,Lawrence ,Formosa,35699906804,lawrence@ssfalconry.com,Family,Outdoors,Western Malta,Rural,People of Malta,Artisan
    2,Vedala Palace Private Visit,250,,,,Yes,,Siggiewi,,1:30,Charles,Marsh,35621221221,carmel.a.marsh@gov.mt ,Knights,Exclusive,Private,Western Malta,Noble,
    3,Guide Generic,,35.4,,,,,,,,,,,,,,,,,
    4,Percius Mercedes,,35.4,,,,,,,,,,,,,,,,,
    5,Percius Vito,,53.1,,,,,,,,,,,,,,,,,
    `
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

  useEffect(()=>{
    
  },[data])
  const FileUploadCSV=()=>{
    SetShowFeedStep(false);
    setUpLoading(true);
    if (!CSVFileUpload){
      SetCSVError(true)
    }
    const formdata = new FormData();
    formdata.append("csv_file", CSVFileUpload)
    axios.post(API.BASE_URL+"csvupload/", formdata)
    .then((res)=>{
      if (res.data.message==="File uploaded and data saved successfully"){
        localStorage.setItem("uploaded-csv", "Upload Nedd to Train")
        SetCSVUpload(true)
        setTrigger(true)
        // setTimeout(()=>{
          setUpLoading(false)
        //   // window.location.reload();
        // },2000)
      }
      else{
        setUpLoading(false)
        SetCSVWarn(true)
      }
    })
    .catch((err)=>{
      setUpLoading(false)

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
          SetModelTrain(true);
          localStorage.removeItem("uploaded-csv")
          close()
          toast.success("Model trained Successfully!", {autoClose:1000})
    }).catch((error)=>{
          setLoading(false);
          console.error(error)
    })
}

const closeWarningSB = () => {
  SetCSVUpload(false)
  SetCSVWarn(false)
  SetCSVError(false)
  SetModelTrain(false);
};
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
                {/* <h3 className="heading-step">Step 1 <span className="successTag"> {uploadForTrain? "Completed" : ""}</span></h3> */}
                {/* <MDBox mb={1.5} onClick={uploadForTrain ? null : handleShowFeed} style={uploadForTrain ? { cursor: "not-allowed" } : { cursor: "pointer" }} className={uploadForTrain ? "desabled":""}>
                  <ComplexStatisticsCard className="desable-uploaded" color="dark" icon={uploadForTrain ? "stop": "upload"} title={uploadForTrain ? "Train Modal First" : "Feed The Brain" } />
                </MDBox> */}
                <MDBox mb={1.5} onClick={handleShowFeed} style={{cursor: "pointer" }} >
                  <ComplexStatisticsCard className="desable-uploaded" color="dark" icon={"upload"} title={"Feed The Brain" } />
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
                  </div>
                ): (<></>)}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <div className="your-component">
              {loading && <div className="overlay"></div>}
              {loading ? 
                ( <div className="loader">Processing...</div>
                ) : (<></>)
              }
            </div>
            {/* <h3 className="heading-step">Step 2</h3>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard icon="psychology" title="Train Model" />
              <MDButton variant="gradient" color="success" onClick={trainModel}>
                Click to Train
              </MDButton>
            </MDBox> */}
          </Grid>
        </Grid>
        <MDBox>
          <div className="your-component">
              {UpLoading && <div className="overlay"></div>}
              {UpLoading ? 
                ( <div className="loader">Uploading CSV...</div>
                ) : (<></>)
              }
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Projects trigger={Trigger} setTrigger={setTrigger}/>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

          {/*  Snack BARS===========================================================================================> */}
          <MDSnackbar
            color="success"
            icon="star"
            title="Uploaded"
            content="File Uploaded Successfully!"
            dateTime="Now"
            open={CSVUpload}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
          <MDSnackbar
            color="warning"
            icon="error"
            title="Warning"
            content="File must be .CSV Format!"
            dateTime="Now"
            open={CSVWarn}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
          <MDSnackbar
            color="error"
            icon="error"
            title="Not Uploaded"
            content="Please Select and Upload CSV!"
            dateTime="Now"
            open={CSVError}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
           <MDSnackbar
            color="success"
            icon="check"
            title="Model Trained"
            content="Model Trained Successfully!"
            dateTime="Now"
            open={ModelTrain}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
        {/* SNACK BARS Closed =---------------------------------------------------------- */}
    </DashboardLayout>
  );
}

export default Dashboard;
