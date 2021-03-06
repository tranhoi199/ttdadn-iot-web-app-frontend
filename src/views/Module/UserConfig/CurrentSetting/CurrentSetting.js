import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import OpacityIcon from "@material-ui/icons/Opacity";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ButtonNotification from "../ButtonArea/ButtonNotification";
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  list: {
    color: "#fff",
    backgroundColor: "#000",
  },
}));

export default function CurrentSetting(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className="flex-center">
        <Grid item md={10} xs={12}>
          {props.isOn ? (
            <h4 style={{ color: "green" }}>Clothes are being dried!</h4>
          ) : (
            <h4 style={{ color: "red" }}>Clothes are not being dried! </h4>
          )}
          <ButtonNotification />
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <h4>Current Config</h4>
            <IconButton
              onClick={props.changeDisplaySetting}
              aria-label="add config"
              style={{
                marginLeft: 10,
                backgroundColor: "#2ecc71",
                color: "#fff",
              }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
          {/* <h3>Current Config</h3> */}
        </Grid>
        <Grid item md={10} xs={12} className={classes.list}>
          <List component="nav" aria-label="main mailbox folders">
            <Grid container spacing={3}>
              <Grid item sm={4} xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <WhatshotIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      Object.keys(props.currentConfig).length > 0
                        ? props.currentConfig.tempeThreshold + "°C"
                        : "..."
                    }
                  />
                </ListItem>
              </Grid>
              <Grid item sm={4} xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <OpacityIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      Object.keys(props.currentConfig).length > 0
                        ? props.currentConfig.humidThreshold + "%"
                        : "..."
                    }
                  />
                </ListItem>
              </Grid>
              <Grid item sm={4} xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <Brightness5Icon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      Object.keys(props.currentConfig).length > 0
                        ? props.currentConfig.lightThreshold
                        : "..."
                    }
                  />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
