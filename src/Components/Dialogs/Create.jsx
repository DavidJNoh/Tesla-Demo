import React, { Component } from "react";
import { Dialog, Fab, withStyles } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Form from "../Form";

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  }
});

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false
    };

    handleToggle = () => {
      this.setState({
        open: !this.state.open
      });
    };

    handleFormSubmit = exercise => {
      this.handleToggle();
      this.props.onCreate(exercise);
    };

    render() {
      const { open } = this.state,
        { muscles } = this.props;

      return (
        <React.Fragment>
          <Fab onClick={this.handleToggle} size="small" color="secondary">
            <AddIcon />
          </Fab>
<<<<<<< HEAD
          <Dialog maxWidth="xl" open={open} onClose={this.handleToggle}>
=======
          <Dialog
            maxWidth="xl"
            // fullWidth="true"
            open={open}
            onClose={this.handleToggle}
          >
>>>>>>> 8210131ff38a3641e33c0188a3b6111242fc17d1
            <DialogTitle>Create a New Exercise</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill out the form below.
              </DialogContentText>
              <Form muscles={muscles} onSubmit={this.handleFormSubmit} />
            </DialogContent>
            <DialogActions />
          </Dialog>
        </React.Fragment>
      );
    }
  }
);
