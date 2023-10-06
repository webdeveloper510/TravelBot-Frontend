/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================

=========================================================

USER DETAILS SHOW

 =========================================================

*/

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

export default function data() {
  const adminAccessToken = localStorage.getItem("Admin-Token");
  const [UserList, SetUserList] = useState([]);
  useEffect(() => {
    axios
      .get(API.BASE_URL + "userlist/", {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      })
      .then((res) => {
        SetUserList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(UserList);
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

  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
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
      <MenuItem onClick={closeMenu}>In-Active</MenuItem>
      <MenuItem onClick={closeMenu}>Delete</MenuItem>
    </Menu>
  );

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
          <MDBadge badgeContent={user.is_active} color="success" variant="gradient" size="sm" />
          Active
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
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              fontSize="small"
              onClick={openMenu}
            >
              more_vert
            </Icon>
          </MDBox>
          {renderMenu}
        </MDTypography>
      ),
    })),
  };
}
