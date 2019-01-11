import React, { Component } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  FormControl: {
    width: 500
  }
});

export default withStyles(styles)(
  class form extends Component {
    state = this.getInitState();

    getInitState() {
      const { exercise } = this.props;

      return exercise
        ? exercise
        : {
            title: "",
            descriptoin: "",
            muscles: ""
          };
    }

    componentWillReceiveProps({ exercise }) {
      this.setState({
        ...exercise
      });
    }

    handleChange = name => event =>
      this.setState({
        [name]: event.target.value
      });

    handleSubmit = () => {
      //TODO: validate

      this.props.onSubmit({
        id: this.state.title.toLocaleLowerCase().replace(/ {2}/g, "-"),
        ...this.state
      });

      this.setState(this.getInitState());
    };
    render() {
      const { title, description, muscles } = this.state;
      const { classes, exercise, muscles: categories } = this.props;
      //get muscles from props and name it categories

      return (
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
          <br />
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
          >
            {exercise ? "Edit" : "Create"}
          </Button>
        </form>
      );
    }
  }
);
