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
import { Card, CircularProgress, Switch } from "@mui/material";
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
    axios.get(API.BASE_URL+"get-traveller-details/"+id+"/").then((res)=>{
      setTravellerDetails(res.data.data)
      console.log(res.data.data)
    })
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

        </MDTypography>
      ),
    })),
    status : loaderState
  };
}
