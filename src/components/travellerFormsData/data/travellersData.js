/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================

=========================================================

USER DETAILS SHOW

 =========================================================

*/
/*eslint-disable*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API } from "config/Api";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReactSwitch from "react-switch";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { Box, Card, CircularProgress, Switch } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CustomizedTimeline from "./TravelPesonsDetails";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ChatBot from "components/ChatBot/ChatBot";
import { useNavigate } from "react-router-dom";
import { Divider, Stack } from "rsuite";


export default function data() {

  //  States Management ========================================================================>
  const navigate = useNavigate()
  const adminAccessToken = localStorage.getItem("Token");
  const [UserList, SetUserList] = useState([]);
  const [checkState , SetCheckState] = useState(false);
  const [SuccessChangeStatus, SetSuccessChangeStatus] = useState(false);
  const [SuccessDelete, setSuccessDelete] = useState(false);
  const [menu, setMenu] = useState(null);
  const [travllerID, settravllerID] = useState(null);
  const [UserDetail, setUserDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [TravellerDetails, setTravellerDetails] = useState(null);
  const [ItineraryState, setItineraryState]=useState(false);

  const [loaderState, setLoaderState] = useState(false);

  //  UseEffects Management ========================================================================>

    useEffect(() => {
      axios.get(API.BASE_URL + "user-info-form/", {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }).then((res) => {
      console.log(res.data.data);
          SetUserList(res.data.data);
          setUserDetail(false)
        }).catch((err) => {
          console.log(err);
        });
    }, [UserDetail]);


  //  Function Calling ========================================================================>

  const handlePrepareItinerary=(travllerID)=>{
    setLoaderState(true);
    setItineraryState(true);
    axios.post(API.BASE_URL + "itinerary-frame/",{'form_id':travllerID,}, {
      headers: {
        Authorization: `Bearer ${adminAccessToken}`,
      },
    }).then((res)=>{
      localStorage.setItem("gettedResponse", res.data.data)
      setLoaderState(false);
      navigate("/chat",  { state: { ItineraryState: true } }) 
    }).catch((err)=>{
      setLoaderState(false)
      console.log(err)
    })
  }
  
  const openMenu = ({ currentTarget }, id) =>{
    setMenu(currentTarget)
    settravllerID(id)
  };

  const closeMenu = () => setMenu(null);
  const closeWarningSB = () => {
    SetSuccessChangeStatus(false)
    setSuccessDelete(false)
  };

  const getDetails = (id)=>{
    axios.post(API.BASE_URL+"getformdetails/", {"form_id":id}).then((res)=>{
      setTravellerDetails(res.data.data)
      console.log(res.data.data)
    }).catch((err)=>{
      console.log(err)
    });
  }

  const handleClickOpen =(scrollType , travllerID)=>{
    setOpen(true);
    setScroll(scrollType);
    settravllerID(travllerID)
    getDetails(travllerID)
  }
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  // Super Global Variables ----------============================================>


  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );





 
  // USer Management =================================================================>
  return {
    
    columns: [
      { Header: "Name", accessor: "user", width: "45%", align: "left" },
      { Header: "Nationality", accessor: "function", align: "left" },
      { Header: "Travel and Stay", accessor: "dates", align: "center" },
      { Header: "Budget", accessor: "budget", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    
    rows:  UserList.map((user) => ({
      user: (
        <Author
          image={team4}
          email={user.client_firstName + " " + user.client_lastName}
          key={user.id}
        />
        
      ),
      function: <MDTypography variant="caption" component="h1" color="text" fontWeight="medium" fontSize="0.90rem"  key={user.id} >{user.nationality}</MDTypography>,
      budget: (
            <MDTypography
            component="h1"
            variant="caption"
            color="text"
            fontSize="0.90rem"
            fontWeight="medium"
            key={user.id}
          >
            {user.select_budget}
          </MDTypography>
      ),
      dates: (
        <MDTypography
          component="h1"
          // href="#"
          variant="caption"
          color="text"
          fontSize="0.90rem"
          fontWeight="medium"
          key={user.id}
        >
          From  {user.datesOfTravel}
        </MDTypography>
      ),
      action: (
        <MDTypography
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          <MDBox color="text" px={2}>
            <Icon
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              fontSize="small"
              onClick={(event) => openMenu(event ,user.id)}
            >
              more_vert
            </Icon>
          </MDBox>
          <Menu
            id="simple-menu"
            anchorEl={menu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(menu)}
            onClose={closeMenu}
          >
            <MenuItem onClick={() => handleClickOpen('paper', travllerID)}>View Details</MenuItem>
            <MenuItem style={{color:"blue"}} onClick={() => handlePrepareItinerary(travllerID)}> Prepare Itinerary </MenuItem>
          </Menu>

          {/*  Snack BARS===========================================================================================> */}
          <MDSnackbar
            color="success"
            icon="star"
            title="Status Changed"
            content="Status Changed Successfully!"
            dateTime="Now"
            open={SuccessChangeStatus}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
          <MDSnackbar
            color="success"
            icon="delete"
            title="User Deleted"
            content="User Deleted Successfully!"
            dateTime="Now"
            open={SuccessDelete}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
        {/* SNACK BARS Closed =---------------------------------------------------------- */}


        {/* Dialog Box OPEN ------------------------------------------------------------- */}

        <Dialog
          fullWidth
          maxWidth={'md'}
          open={open}
          onClose={handleClose}
          sx={{background: 'white', opacity:1}}
        >
          <DialogTitle>Customer Detail</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Traveller's All Details
              </DialogContentText>
              <Divider />
              <Stack  spacing={"40%"} direction="row" useFlexGap flexWrap="wrap">
              <div >
                  <MDTypography label="employee_name"  > Emaployee Name</MDTypography> 
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values employee_name" >{TravellerDetails?.employee_name}</MDTypography>
                </div>

                <div>
                  <MDTypography label="numberOfTour" > Number Of Tour</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values numberOfTour" >
                    {TravellerDetails?.numberOfTour}
                  
                  </MDTypography>
                </div>
              </Stack>
               
                <hr />

                <Stack spacing={"40%"} direction="row" useFlexGap flexWrap="wrap">
                <div>
                  <MDTypography label="client_firstName" > Client First Name</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values client_firstName" >
                    {TravellerDetails?.client_firstName}
                  
                  </MDTypography>
                  </div>

                <div>
                  <MDTypography label="client_lastName" > Client Last Name</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values client_lastName" >
                    {TravellerDetails?.client_lastName}
                  
                  </MDTypography>
                  </div>
                </Stack>
                <hr />

                <Stack spacing={"40%"} direction="row" useFlexGap flexWrap="wrap">
                  <div>
                  <MDTypography label="nationality" > Nationality</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values nationality" >
                    {TravellerDetails?.nationality}
                  </MDTypography>
                  </div>

                  <div>
                  <MDTypography label="datesOfTravel" > Dates Of Travel</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values datesOfTravel" >
                    {TravellerDetails?.datesOfTravel}
                  </MDTypography>
                  </div>
                </Stack>
                <hr />



                <Stack spacing={"40%"} direction="row" useFlexGap flexWrap="wrap">
                  <div>
                  <MDTypography label="numberOfTravellers" > Number Of Travellers</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values numberOfTravellers" >
                    {TravellerDetails?.numberOfTravellers}
                  
                  </MDTypography>
                  </div>
                  <div>
                  <MDTypography label="agesOfTravellers" > Ages Of Travellers</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values agesOfTravellers" >
                    {TravellerDetails?.agesOfTravellers}
                  
                  </MDTypography>
                  </div>
                </Stack>
                <hr />

                <Stack spacing={"40%"} direction="row" useFlexGap flexWrap="wrap">
                <div>
                <MDTypography label="flightArrivalTime" > Flight Arrival Time</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values flightArrivalTime" >
                    {TravellerDetails?.flightArrivalTime}
                  
                  </MDTypography>
                  </div>
                  <div>
                  <MDTypography label="flightArrivalNumber" > Flight Arrival Number</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values flightArrivalNumber" >
                    {TravellerDetails?.flightArrivalNumber}
                  
                  </MDTypography>

                  </div>
                </Stack>
                <hr />

                <Stack spacing={"40%"} direction="row" useFlexGap flexWrap="wrap">
                <div>
                <MDTypography label="flightDepartureTime" > Flight Departure Time</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values flightDepartureTime" >
                    {TravellerDetails?.flightDepartureTime}
                  
                  </MDTypography>
                  </div>
                  <div>
                  <MDTypography label="flightDepartureNumber" > Flight Departure Number</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values flightDepartureNumber" >
                    {TravellerDetails?.flightDepartureNumber}
                  </MDTypography>

                  </div>
                </Stack>
                <hr />

                <Stack spacing={"40%"} direction="row" useFlexGap flexWrap="wrap">
                <div>
                <MDTypography label="select_budget" > Budget </MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values select_budget" >
                    {TravellerDetails?.select_budget}
                  
                  </MDTypography>
                  </div>
                  <div>
                  <MDTypography label="accommodation_specific" > Accommodation Specific</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values accommodation_specific" >
                    {TravellerDetails?.accommodation_specific}
                  
                  </MDTypography>
                  </div>

                </Stack>
                <hr />

                <Stack spacing={"40%"} direction="row" useFlexGap flexWrap="wrap">
                <div>
                  <MDTypography label="malta_experience" > Malta Experience</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values malta_experience" >
                    {TravellerDetails?.malta_experience}
                  
                  </MDTypography>
                </div>
                  <div>
                  <MDTypography label="start_time" > Start Time</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values start_time" >
                    {TravellerDetails?.start_time}
                  
                  </MDTypography>
                </div>
                </Stack>
                <Divider />

                <Stack spacing={"40%"} direction="row" useFlexGap flexWrap="wrap">
                <div>
                  <MDTypography label="lunch_time" > Lunch Time</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values lunch_time" >
                    {TravellerDetails?.lunch_time}
                  
                  </MDTypography>
                  </div>
                  <div>
                  <MDTypography label="dinner_time" > Dinner Time</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values dinner_time" >
                    {TravellerDetails?.dinner_time}
                  
                  </MDTypography>
                  </div>
                </Stack>
              <hr/>
                <Stack spacing={"40%"} direction="row" useFlexGap flexWrap="wrap">
                <div>
                  <MDTypography label="issues_n_phobias" > Issues and Phobias</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values issues_n_phobias" >
                    {TravellerDetails?.issues_n_phobias}
                  
                  </MDTypography>
                  </div>
                  <div>
                  <MDTypography label="other_details" > Other Details</MDTypography>
                  <MDTypography style={{fontWeight:100, fontSize:15}} label="values other_details" >
                  {TravellerDetails?.other_details}
                  
                  </MDTypography>
                  </div>
                </Stack>


              </DialogContent>
        </Dialog>


        </MDTypography>

      ),
      
    })),
    status : loaderState
  };
  
}
