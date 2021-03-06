import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SettingsIcon from "@material-ui/icons/Settings";
import { navigate } from "@reach/router";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useSelector } from "react-redux";
export default function MainListItems() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      <ListItem button onClick={() => navigate("user-config")}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItem>
      <ListItem button onClick={() => navigate("data-info")}>
        <ListItemIcon>
          <EqualizerIcon />
        </ListItemIcon>
        <ListItemText primary="View Data" />
      </ListItem>
      {isAuthenticated ? (
        <ListItem button onClick={() => navigate("user-info")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      ) : (
        <ListItem button onClick={() => navigate("login")}>
          <ListItemIcon>
            <LockOpenIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      )}
      {isAuthenticated && (
        <ListItem button onClick={() => navigate("change-password")}>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
      )}
    </div>
  );
}
