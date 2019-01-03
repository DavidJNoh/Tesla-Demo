import React, { Component } from "react";
import { Button, Dialog, Fab } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  FormControl: {
    width: 500
  }
});

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      exercise: {
        title: "",
        description: "",
        muscles: ""
      }
    };

    handleToggle = () => {
      this.setState({
        open: !this.state.open
      });
    };

    handleChange = name => event => {
      this.setState({
        exercise: {
          ...this.state.exercise,
          [name]: event.target.value
        }
      });
    };

    handleSubmit = () => {
      //TODO: validate

      const { exercise } = this.state;

      this.props.onCreate({
        ...exercise,
        id: exercise.title.toLocaleLowerCase().replace(/ {2}/g, "-")
      });

      this.setState({
        open: false,
        exercise: {
          title: "",
          description: "",
          muscles: ""
        }
      });
    };

    render() {
      const {
          open,
          exercise: { title, description, muscles }
        } = this.state,
        //get muscles from props and name it categories
        { classes, muscles: categories } = this.props;
      return (
        <React.Fragment>
          <Fab onClick={this.handleToggle} size="small" color="primary">
            <AddIcon />
          </Fab>
          <Dialog open={open} onClose={this.handleToggle}>
            <DialogTitle id="form-dialog-title">
              Create a New Exercise
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill out the form below.
              </DialogContentText>
              <form>
                <TextField
                  label="Title"
                  value={title}
                  onChange={this.handleChange("title")}
                  margin="normal"
                  className={classes.FormControl}
                />
                <br />
                <FormControl>
                  <InputLabel htmlFor="muscles">Muscles</InputLabel>
                  <Select
                    className={classes.FormControl}
                    value={muscles}
                    onChange={this.handleChange("muscles")}
                  >
                    {categories.map(x => (
                      <MenuItem key={x} value={x}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <TextField
                  className={classes.FormControl}
                  multiline
                  rows="4"
                  label="Description"
                  value={description}
                  onChange={this.handleChange("description")}
                  margin="normal"
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleSubmit}
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    }
  }
);
