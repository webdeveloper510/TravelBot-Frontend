/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Admin Dashboard,Dashboard Files get page.
=========================================================
*/
/*eslint-disable*/

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/csv-file.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "config/Api";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDSnackbar
from "components/MDSnackbar";

export default function data(props) {
  // States Management
  console.log(props, "-----------")
  const adminAccessToken = localStorage.getItem("Admin-Token");
  const [FilesList, SetFilesList] = useState([]);
  const [FilesUrl, SetFilesUrl] = useState('');
  const [FilesId, SetFilesId] = useState('');
  const [SuccessDeleteFile, setSuccessDeleteFile] = useState(false);
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }, file , id) => {
    setMenu(currentTarget)
    SetFilesUrl(file)
    SetFilesId(id)
  };
  const closeMenu = () => setMenu(null);

  // Function Calling
  useEffect(() => {
    axios
      .get(API.BASE_URL + "csvfilehistory/", {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      })
      .then((res) => {
        SetFilesList(res.data.data);
        props.setTrigger(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.trigger]);
  const handleDeleteFile = (id) => {
    axios.delete(API.BASE_URL+"deletefile/"+id+"/",{
      headers: {
        Authorization: `Bearer ${adminAccessToken}`,
      },
    }).then((res)=>{
      setSuccessDeleteFile(true);
      props.setTrigger(true)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const closeWarningSB = () => {
    setSuccessDeleteFile(false)
};
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Filename = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "File Name", accessor: "filetrain", width: "45%", align: "left" },
      { Header: "Trained", accessor: "trained", width: "10%", align: "left" },
      { Header: "Working", accessor: "working", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: FilesList.map((files) => ({
      filetrain: <Filename image={logoXD} name={files.csvname} />,
      trained: (
        <MDBox display="flex" py={1}>
          Yes
        </MDBox>
      ),
      working: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          Yes
        </MDTypography>
      ),
      action: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          <MDBox color="text" px={2}>
            <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={(event) => openMenu(event , files.csvfile , files.id)} >
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
            <MenuItem><a href={FilesUrl}>Download</a></MenuItem>
            <MenuItem style={{color:"red"}} onClick={()=>{handleDeleteFile(FilesId)}}>Delete</MenuItem>
          </Menu>
          {/*  Snack BARS===========================================================================================> */}

          <MDSnackbar
            color="success"
            icon="delete"
            title="File Deleted"
            content="File Deleted Successfully!"
            dateTime="Now"
            open={SuccessDeleteFile}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          />
           {/* <MDSnackbar
            color="error"
            icon="error"
            title="User Not Added"
            content="User Not Added!"
            dateTime="Now"
            open={ErrorAddUser}
            onClose={closeWarningSB}
            close={closeWarningSB}
            bgWhite
          /> */}
        {/* SNACK BARS Closed =---------------------------------------------------------- */}
        </MDTypography>
      ),
    })),
  };
}
