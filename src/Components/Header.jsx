import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CreateDialog from "./Dialogs/Create";

class Header extends Component {
  render() {
    const { muscles, onExerciseCreate } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit" style={{ flex: 1 }}>
            Header with Typography
          </Typography>
          <CreateDialog muscles={muscles} onCreate={onExerciseCreate} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
