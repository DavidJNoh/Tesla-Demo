import React, { Component } from "react";
import { AppBar, Toolbar, Typography, withStyles } from "@material-ui/core";
import CreateDialog from "./Dialogs/Create";

const styles = {
  flex: {
    flex: 1
  }
};

class Header extends Component {
  render() {
    const { classes, muscles, onExerciseCreate } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.flex}>
            Header with Typography
          </Typography>
          <CreateDialog muscles={muscles} onCreate={onExerciseCreate} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
