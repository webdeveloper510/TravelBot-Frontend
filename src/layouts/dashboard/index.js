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
import { useState } from "react";
import axios from "axios";
import { API } from "config/Api";

function Dashboard() {
  // States Management
  const { sales, tasks } = reportsLineChartData;
  const [CSVFileUpload, SetCSVFileUpload] = useState(null)
  const [loading, setLoading] = useState(false);
  const adminAccessToken = localStorage.getItem("Admin-Token");
  // Function Calling
  const downLoadSampleCSV=()=>{
    const blob = new Blob([sampleCSV], {type:"text/csv"});
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "sample-csv.csv";
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
  const fileInputCSV=(event)=>{
    SetCSVFileUpload(event.target.files[0])
  }
  const FileUploadCSV=()=>{
    const formdata = new FormData();
    formdata.append("csv_file", CSVFileUpload)
    axios.post(API.BASE_URL+"csvupload/", formdata)
    .then((res)=>{
          if (res.data.message==="File uploaded and data saved successfully"){
            console.log("File uploaded successfully")
                // toast.success(res.data.message, {autoClose:1000})
          }
          else{
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
            <Popup
              trigger={
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard color="dark" icon="upload" title="Feed The Brain" />
                </MDBox>
              }
              modal
              nested
            >
              {(close) => (
                  <div className='modal'>
                  <div className='content-popup'>
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
                  <div className="close-div">
                        <button className="close-button" onClick=
                              {() => close()}>
                              Close
                        </button>
                  </div>
            </div>
                )
              }
            </Popup>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
          <div className="your-component">
            {/* Background overlay */}
            {loading && <div className="overlay"></div>}
            {/* Render a loader based on the loading state */}
            {loading ? (
            <div className="loader">Processing...</div>
            ) : (
              <MDBox mb={1.5} onClick={trainModel}>
              <ComplexStatisticsCard icon="psychology" title="Train Model" />
            </MDBox>
            )}
          </div>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}    Delete
        </MDTypography
              />
            </MDBox>
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>*/}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Projects />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
