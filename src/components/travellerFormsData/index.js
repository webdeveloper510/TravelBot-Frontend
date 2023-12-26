/*eslint-disable*/

import { Card, CircularProgress, Container, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import DataTable from "examples/Tables/DataTable";
import travellersData from "components/travellerFormsData/data/travellersData"
import Configurator from "examples/Configurator";
import { Stack } from "rsuite";
const TravellerFormData=()=>{
  const { columns, rows , status} = travellersData();

      return (

            <div>
                  <Container>
                        <Grid item xs={6} mt={8}>
                              <Grid item xs={8}>
                                    <MDTypography mb={4}>Customer Data</MDTypography>
                                    <Card mt={8}>
                                          <MDBox
                                                mx={2}
                                                mt={-3}
                                                py={3}
                                                px={2}
                                                variant="gradient"
                                                bgColor="info"
                                                borderRadius="lg"
                                                coloredShadow="info">
                                          <MDTypography variant="h6" color="white">
                                                Travellers Data
                                          </MDTypography>
                                          </MDBox>
                                          <MDBox pt={3}>
                                                <DataTable
                                                table={{ columns, rows }}
                                                isSorted={false}
                                                entriesPerPage={false}
                                                showTotalEntries={false}
                                                noEndBorder
                                                />
                                          </MDBox>
                                    </Card>
                                            {/* ----------------------------------------------------------------Configurator SECTION----------------------------------------------------------------- */}
                              </Grid>
                                            <Grid item xs={4}>
                                  <Configurator relative />
                                  </Grid>
                        </Grid>
                  </Container>
                  {status &&
                        <div style={{ position: "fixed", top:"0px", height: "100vh", width: "100vw", background: "#eee", zIndex: '999999'}}>
                       <div style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)"
                       }}>
                         <CircularProgress />
                         <br/>
                              {/* {status ? <span style={{ justifyContent: "center",   }}>Loading...please wait</span> : ""} */}
                              </div>
                        </div> 
                  }
                  </div>

 )
}
export default TravellerFormData;