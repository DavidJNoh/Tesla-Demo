import React, { Component } from "react";
import { TextField, Button, withStyles } from "@material-ui/core";

const styles = {
  formControl: {
    width: 500
  },
  form: {
    padding: 10
  }
};

const style = {
  form: {
    padding: 20
  }
};

export class ThreeForm extends Component {
  state = this.props.threeJS;

  // componentDidUpdate({ threeJS }) {
  //   this.setState({
  //     ...threeJS
  //   });
  // }

  handleChange = name => event => {
    console.log(event.target.value);
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    this.props.handleThreeEdit(this.state);
  };

  render() {
    const {
      // classes,
      cameraAngle,
      cameraPositionZ,
      cubeX,
      cubeY,
      cubeZ,
      cubeColor,
      cubeRotationX,
      cubeRotationY
    } = this.state;
    return (
      <form style={style.form}>
        <TextField
          label="CameraAngle"
          value={cameraAngle}
          onChange={this.handleChange("cameraAngle")}
          margin="normal"
        />
        <br />
        <TextField
          label="CameraPositionZ"
          value={cameraPositionZ}
          onChange={this.handleChange("cameraPositionZ")}
          margin="normal"
        />
        <br />
        <TextField
          label="Cube X Axis"
          value={cubeX}
          onChange={this.handleChange("cubeX")}
          margin="normal"
        />
        <br />
        <TextField
          label="Cube Y Axis"
          value={cubeY}
          onChange={this.handleChange("cubeY")}
          margin="normal"
        />
        <br />
        <TextField
          label="Cube Z Axis"
          value={cubeZ}
          onChange={this.handleChange("cubeZ")}
          margin="normal"
        />
        <br />
        <TextField
          label="Cube Color"
          value={cubeColor}
          onChange={this.handleChange("cubeColor")}
          margin="normal"
        />
        <br />
        <TextField
          label="CubeRotationX"
          value={cubeRotationX}
          onChange={this.handleChange("cubeRotationX")}
          margin="normal"
        />
        <br />
        <TextField
          label="CubeRotationY"
          value={cubeRotationY}
          onChange={this.handleChange("cubeRotationY")}
          margin="normal"
        />
        <br />

        <Button onClick={this.handleSubmit} variant="contained" color="primary">
          Edit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(ThreeForm);
