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
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "config/Api";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReactSwitch from "react-switch";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { Switch } from "@mui/material";
export default function data() {

  //  States Management ========================================================================>

  const adminAccessToken = localStorage.getItem("Admin-Token");
  const [UserList, SetUserList] = useState([]);
  const [checkState , SetCheckState] = useState(false);
  const [SuccessChangeStatus, SetSuccessChangeStatus] = useState(false);
  const [SuccessDelete, setSuccessDelete] = useState(false);
  const [menu, setMenu] = useState(null);
  const [userID, setUserID] = useState(null);

  //  UseEffects Management ========================================================================>

    useEffect(() => {
      axios.get(API.BASE_URL + "userlist/", {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }).then((res) => {
          SetUserList(res.data.data);
        }).catch((err) => {
          console.log(err);
        });
    }, []);


  //  Function Calling ========================================================================>

  const handleCheckboxChange = (user) => {
    const updatedUserList = UserList.map((u) => {
      if (u.id === user.id) {
        u.is_active = !u.is_active;
      }
      return u;
    });
    SetUserList(updatedUserList);
    axios
      .post(API.BASE_URL + `userstatus/${user.id}/`, { is_active: user.is_active })
      .then((res) => {
        SetSuccessChangeStatus(true);
      })
      .catch((err) => {
        console.error("Error updating user status:", err);
        SetUserList(UserList);
      });
  };
  
  const openMenu = ({ currentTarget }, id) =>{
    setMenu(currentTarget)
    setUserID(id)
  };
  const handleDeleteUser = (userid) => {
    axios.delete(API.BASE_URL+"userdelete/"+userid+"/")
    .then((res)=>{
      console.log("delete user", userid)
      setSuccessDelete(true);
      setTimeout(()=>{
        window.location.reload();
      },1000)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const closeMenu = () => setMenu(null);
  const closeWarningSB = () => {
    SetSuccessChangeStatus(false)
    setSuccessDelete(false)
  };

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

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );



 
  // USer Management =================================================================>
  return {
    columns: [
      { Header: "Users", accessor: "user", width: "45%", align: "left" },
      { Header: "Role", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Created", accessor: "created", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: UserList.map((user) => ({
      user: (
        <Author
          image={team4}
          name={user.firstname + " " + user.lastname}
          email={user.email}
          key={user.id}
        />
      ),
      function: <Job title={user.is_admin ? "admin" : "user"} key={user.id} />,
      status: (
        <MDBox ml={-1} key={user.id}>
         {user.is_active ? checkState : !checkState}
    <Switch
      checked={user.is_active ? !checkState : checkState}
      onChange={() => handleCheckboxChange(user)}
    />
        </MDBox>
      ),
      created: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          key={user.id}
        >
          {user.created_at}
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
            <MenuItem>Edit</MenuItem>
            <MenuItem style={{color:"red"}} onClick={() => {handleDeleteUser(userID)}}> Delete</MenuItem>
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

        </MDTypography>
      ),
    })),
  };
}
