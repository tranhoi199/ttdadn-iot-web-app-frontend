import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Router } from "@reach/router";
import MainListItems from "./listItems";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserConfig from "../Module/UserConfig/UserConfig";
import DataInfo from "../Module/DataInfo/DataInfo";
import UserInfo from "../Module/UserInfo/UserInfo";
import ChangePassword from "../Module/ChangePassword/ChangePassword";
import ResetPassword from "../Module/ResetPassword/ResetPassword";
import LogIn from "../Module/Authentication/LogIn";

import Register from "../Module/Authentication/Register1";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Module/Authentication/action/auth";
import { navigate } from "@reach/router";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LockOpenIcon from "@material-ui/icons/LockOpen";
// import PeopleIcon from "@material-ui/icons/People";
import SwitchComponent from "../Module/Authentication/components/switchComponent";
import { config } from "../../config";
import axios from "axios";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userchange = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  //get avatar
  useEffect(() => {
    const userInfoUrl = config.dbURl + config.api.userInfo;
    let mounted = true;
    axios
      .get(userInfoUrl)
      .then((response) => {
        if (mounted) {
          const avatarUrl = response.data.data[0].avatar;
          setAvatarUrl(avatarUrl);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      mounted = false;
    };
  }, [userchange]);
  useEffect(() => {
    if (userchange) {
      setUsername(userchange.username);
    }
  }, [userchange]);
  // eslint-disable-next-line no-unused-vars
  const onLogout = async (e) => {
    dispatch(logout());
    navigate("login");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("login")}>
            {/* <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge> */}
            {!isAuthenticated && (
              <ListItem button>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </IconButton>
          {/* display username */}
          <IconButton color="inherit" onClick={() => navigate("user-info")}>
            {isAuthenticated && (
              <ListItem button>
                <img
                  src={avatarUrl ? avatarUrl : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"}
                  alt="A"
                  style={{
                    borderRadius: "50%",
                    width: 35,
                    height: 35,
                    marginRight: 10,
                  }}
                />
                <ListItemText primary={username} />
              </ListItem>
            )}
          </IconButton>
          {isAuthenticated && <SwitchComponent />}
          {/* display logout icon  */}
          <IconButton color="inherit" onClick={(e) => onLogout(e)}>
            {/* <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge> */}
            {isAuthenticated && <ExitToAppIcon primary="Log Out" />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid
            container
            spacing={10}
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            {/* Chart */}
            {/* <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <div>hello</div>
              </Paper>
            </Grid> */}
            <Router>
              {/* <LoginT path="testlogin" /> */}
              <Register path="register" />
              <LogIn path="login" />
              <UserConfig path="user-config" />
              <DataInfo path="data-info" />
              <UserInfo path="user-info" />
              <ChangePassword path="change-password"/>
              <ResetPassword path="reset-password"/>
            </Router>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
