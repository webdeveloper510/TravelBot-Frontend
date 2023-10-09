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
import { Switch } from "@mui/material";
export default function data() {
  const adminAccessToken = localStorage.getItem("Admin-Token");
  const [UserList, SetUserList] = useState([]);
  const [StatusCheck, setStatusCheck] = useState(true);

  const handleChangeCheck = (event, id, status) => {
    console.log("click", event.target.checked, id , status);
    // setStatusCheck(status)
    axios.post(API.BASE_URL+"userstatus/"+id+"/",{is_active:status}).then(response => {console.log("success", response)}).catch((error => {console.log("errro");}))
  };
  const [menu, setMenu] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const openMenu = (userId) => {
    setMenu(() => userId);
    // setMenu(currentTarget);
    setSelectedUserId(userId);
  };
  const closeMenu = () => setMenu(null);
  const handleDeleteUser = (userid) => {
    console.log("delete user", userid);
    axios.delete(API.BASE_URL+"userdelete/"+userid+"/").then((response=>{window.location.reload()}))
    .catch((err => {console.log(err)}))
  }


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


  // userdelete
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
          {/* <ReactSwitch checked={user.is_active} onChange={handleChangeCheck} /> */}
          {/* <MDBox mt={0.5}> */}
          {/* {setStatusCheck(user.is_active)} */}
            <Switch checked={StatusCheck} onChange={(event) => handleChangeCheck(event ,user.id , !StatusCheck)} />
          {/* </MDBox> */}
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
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          key={user.id}
        >
          <MDBox color="text" px={2}>
            <Icon
              onClick={() => openMenu(user.id)}
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              fontSize="small"
              // onClick={openMenu}
            >
              more_vert
            </Icon>
          </MDBox>
          <Menu
          
            id={user.id}
            anchorEl={menu === user.id ? document.getElementById(`menu-${user.id}`) : null}
            // open={menu === user.id}
            // onClose={closeMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            className="position-relative"
            open={Boolean(menu)}
            onClose={closeMenu}
          >
            <MenuItem onClick={() => {
                  handleDeleteUser(selectedUserId);
                }} style={{color:"danger"}}>Delete</MenuItem>
          </Menu>
        </MDTypography>
      ),
    })),
  };
}
