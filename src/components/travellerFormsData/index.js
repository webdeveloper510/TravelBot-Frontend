/*eslint-disable*/

import { Card, Container, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import DataTable from "examples/Tables/DataTable";
import travellersData from "components/travellerFormsData/data/travellersData"
const TravellerFormData=()=>{
  const { columns, rows } = travellersData();

      return (
            // <DashboardLayout>

            <div className="main">
                  <DashboardNavbar absolute isMini/>
                  <Container>
                        <Grid item xs={6} mt={8}>
                              <Grid item xs={12}>
                                    <Card>
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
                              </Grid>
                        </Grid>
                  </Container>
                  </div>

            // </DashboardLayout>
 )
}
export default TravellerFormData;