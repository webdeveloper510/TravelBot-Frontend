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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
/*eslint-disable*/
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ChatBot from "components/ChatBot/ChatBot";


// @mui icons
import Icon from "@mui/material/Icon";

const token = localStorage.getItem("Admin-Token");
const token1 = localStorage.getItem("Token");
// const routes = [
//      {
//        path: '/',
//        children: [
//          { index: true, element: <Login /> },
//          { path: 'register', element: <Register /> },
//         //  { path: 'Landing', element: <Landing /> },
//          { path: '*', element: <Page404 /> },
//        ]
//      },
//      {
//        path: '/',
//        element: <Layout />,
//        children: [
//          { index: true, path:'/dashboard', element: <Dashboard /> },
//          { path: '/extensions', element: <Extensions /> },
//        ]
//      }
//    ]

const routes = [
  token
    ? ({
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    })
    : ({
        name: "Sign In",
        icon: <Icon fontSize="small">login</Icon>,
        route: "/",
        kry: "sign-in",
        component: <SignIn />,
      }),
  {
    type: "collapse",
    name: "User List",
    key: "users",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/users",
    component: <Tables />,
  },
  // {
  //   type: "collapse",
  //   name: "User List",
  //   key: "userjs",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notice",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Add User",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/sign-up",
    component: <SignUp />,
  },
  token1 ? (
     {
      name: "User Chat Page",
      icon: <Icon fontSize="small">assignment</Icon>,
      kry: "chat",
      route: "/chat",
      component: <ChatBot />,
    }
   
  ) : ( <></>)
  
];

export default routes;
