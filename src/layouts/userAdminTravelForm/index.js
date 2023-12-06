/*eslint-disable*/

import { Card, Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, {useState} from "react";
import MDButton from "components/MDButton";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import  ExpandMoreIcon  from "@mui/icons-material/ExpandMore";
import TextField from '@mui/material/TextField';
import axios from "axios";
import { API } from "config/Api";
import { DateRangePicker } from "rsuite";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import timepicker from 'react-time-picker';  
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import MDSnackbar from "components/MDSnackbar";
import { useNavigate } from "react-router-dom";
const TravelForm=()=>{

      const theme = createTheme({
            typography: {
              fontSize: 12,
              fontFamily: "Segoe UI, Helvetica, Arial, sans-serif",
            },
            palette: {
              primary: {
                main: blue[500],
              },
              secondary: {
                main: '#f44336',
              },
            },
          })
      // GLOBAL VARIABLES ========================================================================>
      
      const accessToken = localStorage.getItem("Admin-Token")
      const navigate = useNavigate()
      // USESTATES ========================================================================>

      const [EmaployeeName, setEmaployeeName]=useState(null);
      const [TourNumber, setTourNumber]=useState(null);
      const [ClienFirstName, setClienFirstName]=useState(null);
      const [ClienLastName, setClienLastName]=useState(null);
      const [Nationalities, setNationalities]=useState(null);
      const [DatesOfTravel, setDatesOfTravel]=useState(null);
      const [NumberOfTravellers, setNumberOfTravellers]=useState(null);
      const [AgesOfTravellers, setAgesOfTravellers]=useState(null);
      const [LengthToStay, setLengthToStay]=useState(null);
      const [BudgetSelect, setBudgetSelect]=useState(null);
      const [FlightArrivalTime, setFlightArrivalTime]=useState(null);
      const [FlightArrivalNumber, setFlightArrivalNumber]=useState(null);
      const [FlightDepartureTime, setFlightDepartureTime]=useState(null);
      const [FlightDepartureNumber, setFlightDepartureNumber]=useState(null);
      const [AccommodationSpecific, setAccommodationSpecific]=useState(null);
      const [MaltaExperience, setMaltaExperience]=useState(null);
      const [StartTime, setStartTime]=useState(null);
      const [LunchTime, setLunchTime]=useState(null);
      const [DinnerTime, setDinnerTime]=useState(null);
      const [IssuesNPhobias, setIssuesNPhobias]=useState(null);

      
      // ERROR USESTATES ========================================================================>
      
      const [EmaployeeNameError, setEmaployeeNameError] = useState(false);
      const [TourNumberError, setTourNumberError]=useState(false);
      const [ClienFirstNameError, setClienFirstNameError]=useState(false);
      const [ClienLastNameError, setClienLastNameError]=useState(false);
      const [NationalitiesError, setNationalitiesError]=useState(false);
      const [DatesOfTravelError, setDatesOfTravelError]=useState(false);
      const [NumberOfTravellersError, setNumberOfTravellersError]=useState(false);
      const [AgesOfTravellersError, setAgesOfTravellersError]=useState(false);
      const [LengthToStayError, setLengthToStayError]=useState(false);
      const [BudgetSelectError, setBudgetSelectError]=useState(false);
      const [AccommodationSpecificError, setAccommodationSpecificError]=useState(false);
      const [MaltaExperienceError, setMaltaExperienceError]=useState(false);
      const [StartTimeError, setStartTimeError]=useState(false);
      const [LunchTimeError, setLunchTimeError]=useState(false);
      const [DinnerTimeError, setDinnerTimeError]=useState(false);
      const [IssuesNPhobiasError, setIssuesNPhobiasError]=useState(false);
      const [inSuccessState,setInSuccessState]=useState(false);
      const [inErrorState, setInErrorState]=useState(false);


      const [ErrorValue,setErrorValue]=useState("");
      //  Start Handle States Functions   ================================================>

      // ----------------------------------Name of Employee------------------------------------------------------------------->

      const handleEmployeeName=(textValue)=>{
            if (textValue=="" || textValue==null){
                  setEmaployeeNameError(true);
            }
            else{
                  setEmaployeeNameError(false);
            }
            setEmaployeeName(textValue)
      }

      // ----------------------------------Tour Number------------------------------------------------------------------->

      const handleTourNumber=(textValue)=>{
            if (textValue=="" || textValue==null){
                  setTourNumberError(true);
            }
            else{
                  setTourNumberError(false);
            }
            setTourNumber(textValue)
      }

      // ----------------------------------Lead Client First Name------------------------------------------------------------------->

      const handleClientFirstName=(textValue)=>{
            if (textValue=="" || textValue==null){
                  setClienFirstNameError(true);
            }
            else{
                  setClienFirstNameError(false);
            }
            setClienFirstName(textValue)
      }
      // ----------------------------------Lead Client Last Name------------------------------------------------------------------->

      const handleClientLastName=(textValue)=>{
            if (textValue=="" || textValue==null){
                  setClienLastNameError(true);
            }
            else{
                  setClienLastNameError(false);
            }
            setClienLastName(textValue)
      }
      // ----------------------------------------Nationalities------------------------------------------------------------->

      const handleTravelNationalities=(textValue)=>{
            if (textValue=="" || textValue==null){
                  setNationalitiesError(true);
            }
            else{
                  setNationalitiesError(false);
            }
            setNationalities(textValue)
      }

      // ----------------------------------------Dates of Travel------------------------------------------------------------->


      const handleDatesOfStay=(dates)=>{
            if (dates=="" || dates==null){
                  setDatesOfTravelError(true);
                  setDatesOfTravel(null)
            }
            else{
            const abc = [
                  new Date(dates[0]),
                  new Date(dates[1]),
                  ];
                  const formattedDates = abc.map(date => date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
                  const FormatedDates = formattedDates[0]+ " " + "To" + " " +formattedDates[1];
                  setDatesOfTravel(FormatedDates);
                  setDatesOfTravelError(false);
            }
      }
      // -------------------------------------------How many persons are travelling?---------------------------------------------------------->

      const handleTravellerNumbers=(textValue)=>{
            if (textValue=="" || textValue==null){
                  setNumberOfTravellersError(true);
            }
            else{
                  setNumberOfTravellersError(false);
            }
            setNumberOfTravellers(textValue)
      }

      // -----------------------------------------All ages of travellers------------------------------------------------------------>

      const handleTravellerAges=(textValue)=>{
            if (textValue=="" || textValue==null){
                  setAgesOfTravellersError(true);
            }
            else{
                  setAgesOfTravellersError(false);
            }
            setAgesOfTravellers(textValue)
      }

      // -----------------------------------------Travel Dates / Length of Stay (in Malta)------------------------------------------------------------>

      const handleLengthToStay=(textValue)=>{
            if (textValue=="" || textValue==null){
                  setLengthToStayError(true);
            }
            else{
                  setLengthToStayError(false);
            }
            setLengthToStay(textValue)
      }

      // --------------------------------------Select Approximate, Total Budget for your Malta Accommodation--------------------------------------------------------------->

      const handleBudgetSelectAndChange=(event)=>{
            if (event.target.value=="" || event.target.value==null){
                  setBudgetSelectError(true);
            }
            else{
                  setBudgetSelectError(false);
            }
            setBudgetSelect(event.target.value)
      }

      // -----------------------------------------What is the flight arrival Time------------------------------------------------------------>

      const handleFlightArrivalTime=(e)=>{
            const dateObject = new Date(e.$d);
            const hours = dateObject.getHours();
            const minutes = dateObject.getMinutes();
            const seconds = dateObject.getSeconds();

            const ArrivalTime=`${hours}:${minutes}:${seconds}`
            setFlightArrivalTime(ArrivalTime)
      }      
      // -----------------------------------------What is the flight arrival number------------------------------------------------------------>

      const handleFlightArrivalNumber=(textValue)=>{
            setFlightArrivalNumber(textValue)
      }
      
      // -----------------------------------------What is the flight Departure Time------------------------------------------------------------>

      const handleFlightDepartureTime=(e)=>{
            const dateObject = new Date(e);
            const hours = dateObject.getHours();
            const minutes = dateObject.getMinutes();
            const seconds = dateObject.getSeconds();

            const DepartureTime=`${hours}:${minutes}:${seconds}`
            setFlightDepartureTime(DepartureTime)
      }

      // -----------------------------------------What is the flight arrival number------------------------------------------------------------>

      const handleFlightDepartureNumber=(textValue)=>{
            setFlightDepartureNumber(textValue)
      }
      // ------------------------------------Would you be willing to experience more than one hotel while in Malta?----------------------------------------------------------------->

      const handleMaltaExperience=(event)=>{
            if (event.target.value=="" || event.target.value==null){
                  setMaltaExperienceError(true);      
            }
            else{
                  setMaltaExperienceError(false);
            }
            setMaltaExperience(event.target.value)
      }


      // ---------------------------------------How would you describe the party's activity level?-------------------------------------------------------------->

      const handleIssuesNPhobias=(event)=>{
            if (event.target.value=="" || event.target.value==null){
                  setIssuesNPhobiasError(true);
            }
            else{
                  setIssuesNPhobiasError(false);
            }
            setIssuesNPhobias(event.target.value)
      }

      // -------------------------------------------Preferred Accommodation Specifics---------------------------------------------------------->

      const handleAccommodationSpecifics=(event)=>{
            if (event.target.value=="" || event.target.value==null){
                  setAccommodationSpecificError(true);
            }
            else {
                  setAccommodationSpecificError(false);
            }
            setAccommodationSpecific(event.target.value)
      }



      // --------------------------------------------Preferred Tour Start Time--------------------------------------------------------->

      const handleTimeStart=(event)=>{
            if (event.target.value=="" || event.target.value==null){
                  setStartTimeError(true);
            }
            else {
                  setStartTimeError(false);
            }
            setStartTime(event.target.value)
      }   

      // -------------------------------------------Preferred Lunch Time---------------------------------------------------------->

      const handleLunchTime=(event)=>{
            if (event.target.value=="" || event.target.value==null){
                  setLunchTimeError(true);
            }
            else {
                  setLunchTimeError(false);
            }
            setLunchTime(event.target.value)
      }   


      // ----------------------------------------Preferred Dinner Time------------------------------------------------------------->

      const handleDinnerTime=(event)=>{
            if (event.target.value=="" || event.target.value==null){
                  setDinnerTimeError(true);
            }
            else {
                  setDinnerTimeError(false);
            }
            setDinnerTime(event.target.value)
      }   


      // ----------------------------------------------------------------------------------------------------->

      // STOP Handle States Functions ================================================>



      // START FUNCTION CALLS ================================================>

      const handleSubmitUSerDetails=()=>{
            const fieldsArray = [EmaployeeName, TourNumber, ClienFirstName, ClienLastName, Nationalities, DatesOfTravel,  NumberOfTravellers, AgesOfTravellers, LengthToStay, BudgetSelect,  AccommodationSpecific, MaltaExperience, StartTime, LunchTime, DinnerTime, IssuesNPhobias,]
            const ErrorArray = [setEmaployeeNameError,setTourNumberError,setClienFirstNameError,setClienLastNameError,setNationalitiesError,setDatesOfTravelError,setNumberOfTravellersError,setAgesOfTravellersError,setLengthToStayError,setBudgetSelectError,setAccommodationSpecificError,setMaltaExperienceError,setStartTimeError,setLunchTimeError,setDinnerTimeError,setIssuesNPhobiasError,]
            for(let i=0;i<fieldsArray.length;i++) {
                  if(fieldsArray[i]=="" || fieldsArray[i]==null){
                        ErrorArray[i](true)
                  }
            }
            const formData = new FormData();
                  formData.append("EmaployeeName", EmaployeeName)
                  formData.append("TourNumber", TourNumber)
                  formData.append("ClienFirstName", ClienFirstName)
                  formData.append("ClienLastName", ClienLastName)
                  formData.append("Nationalities", Nationalities)
                  formData.append("DatesOfTravel", DatesOfTravel)
                  formData.append("NumberOfTravellers", NumberOfTravellers)
                  formData.append("AgesOfTravellers", AgesOfTravellers)
                  formData.append("LengthToStay", LengthToStay)
                  formData.append("BudgetSelect", BudgetSelect)
                  formData.append("FlightArrivalTime", FlightArrivalTime)
                  formData.append("FlightArrivalNumber", FlightArrivalNumber)
                  formData.append("FlightDepartureTime", FlightDepartureTime)
                  formData.append("FlightDepartureNumber", FlightDepartureNumber)
                  formData.append("AccommodationSpecific", AccommodationSpecific)
                  formData.append("MaltaExperience", MaltaExperience)
                  formData.append("StartTime", StartTime)
                  formData.append("LunchTime", LunchTime)
                  formData.append("DinnerTime", DinnerTime)
                  formData.append("IssuesNPhobias", IssuesNPhobias)
                  axios.post(API.BASE_URL+"user-info-form/",formData,{
                        headers: {
                              Authorization: `Bearer ${accessToken}`,
                        },

                  }).then((response)=>{
                        setInSuccessState(true)
                  }).catch((error)=>{
                        if (error.response.data.error.message=="This Tour Number is already exist"){
                              setErrorValue(error.response.data.error.message)
                        }
                        else{
                              setErrorValue("Please Fill All Mandatory Fields !")
                        }
                        setInErrorState(true)

                  })
      }

      // Handle POPUPs ================================================>


      const closeWarningSB = () => {
            setInSuccessState(false)
            setInErrorState(false)
          };

      // STOP FUNCTION CALLS ================================================>
      return(
            <DashboardLayout>
                  <DashboardNavbar/>
                  <Card>
                        <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info" mx={2} mt={-3} p={2} mb={1} textAlign="center" >
                              <MDTypography  variant="h4" fontWeight="medium" color="white" mt={2}>Malta Experience Info Gathering</MDTypography>
                        </MDBox>
                        <MDBox pt={4} pb={3} px={3}>
                              <MDBox component="form" role="form">

                                    {/* Name of Employee* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3} >
                                          <TextField id="standard-basic" type="text" variant="standard" label="Name of Employee*" value={EmaployeeName} onChange={(e)=>{handleEmployeeName(e.target.value)}} fullWidth  error={EmaployeeNameError} />
                                    </MDBox>

                                    {/* Tour Number* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3} >
                                          <TextField id="standard-basic" variant="standard" label="Tour Number*" value={TourNumber} onChange={(e)=>{handleTourNumber(e.target.value)}} fullWidth error={TourNumberError} />
                                    </MDBox>

                                    {/* Lead Client First Name* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <TextField id="standard-basic" variant="standard" label="Lead Client First Name*" value={ClienFirstName} onChange={(e)=>{handleClientFirstName(e.target.value)}} fullWidth error={ClienFirstNameError} />
                                    </MDBox>

                                    {/* Lead Client Last Name* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <TextField id="standard-basic" variant="standard" label="Lead Client Last Name*" value={ClienLastName} onChange={(e)=>{handleClientLastName(e.target.value)}} fullWidth error={ClienLastNameError} />
                                    </MDBox>

                                    {/* Nationalities* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <TextField id="standard-basic" variant="standard" label="Nationalities*" value={Nationalities} onChange={(e)=>{handleTravelNationalities(e.target.value)}} fullWidth error={NationalitiesError} />
                                    </MDBox>

                                    {/* Dates of Travel* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <MDTypography id="standard-basic" style={DatesOfTravelError?{color:"red"}:{}}  > Dates of Travel*  </MDTypography>
                                           <Divider />
                                          <DateRangePicker
                                          format="yyyy-MM-dd"
                                          style={DatesOfTravelError ?{color: "red"}:{}}
                                          onChange={(defaultCalendarValue)=>{handleDatesOfStay(defaultCalendarValue)}}
                                          defaultCalendarValue={[
                                                new Date(new Date().toISOString().substring(0, 10)),
                                                new Date(new Date().toISOString().substring(0, 10))
                                              ]}                                            
                                          >
                                          </DateRangePicker>
                                    </MDBox>

                                    {/* How many persons are travelling?* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <TextField id="standard-basic" variant="standard" label="How many persons are travelling?*" value={NumberOfTravellers} type="number" onChange={(e)=>{handleTravellerNumbers(e.target.value)}} fullWidth error={NumberOfTravellersError} />
                                    </MDBox>

                                    {/* All ages of travellers* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <TextField id="standard-basic" variant="standard" label="All ages of travellers*" value={AgesOfTravellers} onChange={(e)=>{handleTravellerAges(e.target.value)}} fullWidth error={AgesOfTravellersError} />
                                    </MDBox>

                                    {/* Travel Dates / Length of Stay (in Malta))* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <TextField id="standard-basic" variant="standard" label="Travel Dates / Length of Stay (in Malta)*" value={LengthToStay} onChange={(e)=>{handleLengthToStay(e.target.value)}} fullWidth error={LengthToStayError} />
                                    </MDBox>

                                    {/* Approximate, Total Budget for your Malta Accommodation* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <FormLabel component="legend" style={{color:BudgetSelectError?"red":""}}>Budget*</FormLabel>
                                                <RadioGroup aria-label="Total Budget" name="Total Budget" value={BudgetSelect} onChange={handleBudgetSelectAndChange} >
                                                <FormControlLabel value="Up to €5000" control={<Radio />} label="Up to €5000" />
                                                <FormControlLabel value="Between €5000 - €10,000" control={<Radio />} label="Between €5000 - €10,000" />
                                                <FormControlLabel value="Between €10,000 - €15,000" control={<Radio />} label="Between €10,000 - €15,000" />
                                                <FormControlLabel value="Between €15,000 - €20,000" control={<Radio />} label="Between €15,000 - €20,000" />
                                                <FormControlLabel value="€20,000 and over" control={<Radio />} label="€20,000 and over" />
                                                <FormControlLabel value={BudgetSelect} label="Other" control={<TextField id="standard-basic" variant="standard" label="Other..." onChange={(e)=>{setBudgetSelect(e.target.value)}} />} />
                                          </RadioGroup>
                                    </MDBox>

                                    {/* What is the flight arrival time of the clients* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <MDTypography id="standard-basic" >What is the flight arrival time of the clients*  </MDTypography>
                                          <Divider />
                                          <ThemeProvider theme={theme}>
                                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['TimePicker']}>
                                                <TimePicker label="Time"
                                                clearable
                                                ampm={false}
                                                defaultvalue={FlightArrivalTime}
                                                onChange={handleFlightArrivalTime}
                                                ></TimePicker>
                                                </DemoContainer>
                                          </LocalizationProvider>
                                          </ThemeProvider>
                                    </MDBox>
                                    {/* What is the flight arrival number* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <TextField id="standard-basic" variant="standard" label="What is the flight arrival number*" value={FlightArrivalNumber} onChange={(e)=>{handleFlightArrivalNumber(e.target.value)}} fullWidth  />
                                    </MDBox>
                                    {/* What is the flight departure time of the clients* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <MDTypography id="standard-basic"    >What is the flight departure time of the clients*  </MDTypography>
                                          <Divider />
                                          <ThemeProvider theme={theme}>
                                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DemoContainer components={['TimePicker']}>
                                                <TimePicker label="Time"
                                                clearable
                                                ampm={false}
                                                defaultvalue={FlightDepartureTime}
                                                onChange={handleFlightDepartureTime}
                                                >
                                                </TimePicker>
                                                </DemoContainer>
                                          </LocalizationProvider>
                                          </ThemeProvider>
                                    </MDBox>
                                    {/* What is the flight departure number* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <TextField id="standard-basic" variant="standard" label="What is the flight departure number*" value={FlightDepartureNumber} onChange={(e)=>{handleFlightDepartureNumber(e.target.value)}} fullWidth  />
                                    </MDBox>

                                    {/* OR do we set it up whereby we ask the user to check off by tag?* =================================================================================================>*/}

                                    <MDBox  mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3} >
                                          <Accordion>
                                                <AccordionSummary
                                                      expandIcon={<ExpandMoreIcon/>}
                                                      aria-controls="panel1a-header"
                                                      id="panel2a-header"
                                                >
                                                      <Typography style={{ color:AccommodationSpecificError?"red" :""}}>
                                                      OR do we set it up whereby we ask the user to check off by tag?*
                                                      </Typography>
                                                </AccordionSummary>
                                          <AccordionDetails>
                                                <RadioGroup aria-label="Accommodation Specifics" name="Accommodation Specifics" value={AccommodationSpecific} onChange={handleAccommodationSpecifics}>
                                                <FormControlLabel value="Knights" control={<Radio />} label="Knights" />
                                                <FormControlLabel value="Artisans" control={<Radio />} label="Artisans" />
                                                <FormControlLabel value="Food & Wine" control={<Radio />} label="Food & Wine" />
                                                <FormControlLabel value="Nobile Malta" control={<Radio />} label="Nobile Malta" />
                                                <FormControlLabel value="Exclusive/Private/After hours" control={<Radio />} label="Exclusive/Private/After hours" />
                                                <FormControlLabel value="Shopping" control={<Radio />} label="Shopping" />
                                                <FormControlLabel value="Catholic" control={<Radio />} label="Catholic" />
                                                <FormControlLabel value="Heritage or Culture/UNESCO" control={<Radio />} label="Heritage or Culture/UNESCO" />
                                                <FormControlLabel value="Art" control={<Radio />} label="Art" />
                                                <FormControlLabel value="Soft Adventure" control={<Radio />} label="Soft Adventure" />
                                                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                                <FormControlLabel value="Water Activity" control={<Radio />} label="Water Activity" />
                                                <FormControlLabel value="WWII" control={<Radio />} label="WWII" />
                                                <FormControlLabel value="Family" control={<Radio />} label="Family" />
                                                <FormControlLabel value="Music" control={<Radio />} label="Music" />
                                                <FormControlLabel value="Gozo" control={<Radio />} label="Gozo" />
                                                <FormControlLabel value="Nature/Outdoors" control={<Radio />} label="Nature/Outdoors" />
                                                <FormControlLabel value="Nightlife" control={<Radio />} label="Nightlife" />
                                          </RadioGroup>
                                          </AccordionDetails>
                                          </Accordion>                                   
                                    </MDBox>
                                    {/* Preferred Length of Time on Touring Days* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <FormLabel component="legend" style={{color:MaltaExperienceError?"red":""}}>Preferred Length of Time on Touring Days*</FormLabel>

                                                <RadioGroup aria-label="experience" name="experience" value={MaltaExperience} onChange={handleMaltaExperience}>
                                                <FormControlLabel value="Not more than 4 hours" control={<Radio />} label="Not more than 4 hours" />
                                                <FormControlLabel value="Not more than 6 hours" control={<Radio />} label="Not more than 6 hours" />
                                                <FormControlLabel value="Not more than 8 hours" control={<Radio />} label="Not more than 8 hours" />
                                          </RadioGroup>
                                    </MDBox> 

                                    {/* Preferred Tour Start Time* =================================================================================================>*/}

                                    <MDBox  mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <FormLabel component="legend" style={{color:StartTimeError?"red":""}}>Preferred Tour Start Time*</FormLabel>
                                                <RadioGroup aria-label="Preferred Tour Start Time" name="Preferred Tour Start Time" value={StartTime} onChange={handleTimeStart}>
                                                <FormControlLabel value="08:30" control={<Radio />} label="08:30" />
                                                <FormControlLabel value="09:00" control={<Radio />} label="09:00" />
                                                <FormControlLabel value="09:30" control={<Radio />} label="09:30" />
                                                <FormControlLabel value="10:00" control={<Radio />} label="10:00" />
                                                <FormControlLabel value={StartTime} label="Other" control={<TextField id="standard-basic" variant="standard" label="Other..." onChange={(e)=>{setStartTime(e.target.value)}} />} />
                                          </RadioGroup>
                                    </MDBox>

                                    {/* Preferred Lunch Time* =================================================================================================>*/}

                                    <MDBox  mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <FormLabel component="legend" style={{color:LunchTimeError?"red":""}}>Preferred Lunch Time*</FormLabel>
                                                <RadioGroup aria-label="Preferred Lunch Time" name="Preferred Lunch Time" value={LunchTime} onChange={handleLunchTime}>
                                                <FormControlLabel value="12:00" control={<Radio />} label="12:00" />
                                                <FormControlLabel value="12:30" control={<Radio />} label="12:30" />
                                                <FormControlLabel value="13:00" control={<Radio />} label="13:00" />
                                                <FormControlLabel value="13:30" control={<Radio />} label="13:30" />
                                                <FormControlLabel value={LunchTime} label="Other" control={<TextField id="standard-basic" variant="standard" label="Other..." onChange={(e)=>setLunchTime(e.target.value)} />} />
                                          </RadioGroup>
                                    </MDBox>

                                    {/* Preferred Dinner Time* =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <FormLabel component="legend" style={{color:DinnerTimeError?"red":""}}>Preferred Dinner Time*</FormLabel>

                                                <RadioGroup aria-label="Preferred Dinner Time" name="Preferred Dinner Time" value={DinnerTime} onChange={handleDinnerTime}>
                                                <FormControlLabel value="19:00" control={<Radio />} label="19:00" />
                                                <FormControlLabel value="19:30" control={<Radio />} label="19:30" />
                                                <FormControlLabel value="20:00" control={<Radio />} label="20:00" />
                                                <FormControlLabel value="20:30" control={<Radio />} label="20:30" />
                                                <FormControlLabel value={DinnerTime} label="Other" control={<TextField id="standard-basic" variant="standard" label="Other..." onChange={(e)=>{setDinnerTime(e.target.value)}} />} />
                                          </RadioGroup>
                                    </MDBox>


                                    {/* Dietary issues or phobias*. =================================================================================================>*/}

                                    <MDBox mb={2} mt={2} sx={{border:"1px solid #007cf8", borderRadius:3}} p={3}>
                                          <Accordion>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1a-header"
                                                id="panel2a-header"
                                                >
                                                <Typography style={{color:IssuesNPhobiasError?"red":""}}>
                                                Dietary issues or phobias*
                                                </Typography>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                          <FormLabel component="legend" >*This helps us maintain your expectations</FormLabel>
                                                <RadioGroup aria-label="Total Budget for your Malta Experiences" name="Total Budget for your Malta Experiences" value={IssuesNPhobias} onChange={handleIssuesNPhobias}>
                                                <FormControlLabel value="Claustrophobic" control={<Radio />} label="Claustrophobic" />
                                                <FormControlLabel value="Vegan" control={<Radio />} label="Vegan" />
                                                <FormControlLabel value="Does not drink" control={<Radio />} label="Does not drink" />
                                                <FormControlLabel value="Does not swim/like being on the water" control={<Radio />} label="Does not swim/like being on the water" />
                                                <FormControlLabel value="No alcohol" control={<Radio />} label="No alcohol" />
                                                <FormControlLabel value="Jewish" control={<Radio />} label="Jewish" />
                                                <FormControlLabel value="Vegetarian" control={<Radio />} label="Vegetarian" />
                                                <FormControlLabel value="Muslim" control={<Radio />} label="Muslim" />
                                          </RadioGroup>
                                          </AccordionDetails>
                                    </Accordion>                  
                                    </MDBox>

                                    {/* Submit Button* =================================================================================================>*/}

                                    <MDBox mt={4} mb={1}>
                                          <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmitUSerDetails}>
                                                Submit
                                          </MDButton>
                                    </MDBox>
                              </MDBox>
                        </MDBox>
                  </Card>

{/* POPUPS */}
            <MDSnackbar
                  color="success"
                  icon="star"
                  title="Form Submission"
                  content="Form Submitted Successfully !"
                  dateTime="Now"
                  open={inSuccessState}
                  onClose={closeWarningSB}
                  close={closeWarningSB}
                  bgWhite
          />
            <MDSnackbar
                  color="error"
                  icon="error"
                  title="Check Fields"
                  content={ErrorValue}
                  dateTime="Now"
                  open={inErrorState}
                  onClose={closeWarningSB}
                  close={closeWarningSB}
                  bgWhite
          />
            </DashboardLayout>
      )
}
export default TravelForm;