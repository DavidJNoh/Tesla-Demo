import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Header, Footer } from "./Components";
import Exercises from "./Components/Exercises";
import { muscles, exercises } from "./Components/store";
// import { THREE } from "three/build/three.js";

class App extends Component {
  state = {
    exercises,
    category: "",
    exercise: {},
    editMode: false,
    threeJS: {
      cameraAngle: 75,
      cameraPositionZ: 3,
      cubeX: 1,
      cubeY: 1,
      cubeZ: 1,
      cubeColor: "433F81",
      cubeRotationX: 0.01,
      cubeRotationY: 0.01,
      stop: false
    }
  };

  // componentDidMount() {
  //   console.log(this.state.exercises);
  // }

  getExercisesByMuscles() {
    const initExercises = muscles.reduce(
      (exercises, category) => ({
        ...exercises,
        [category]: []
      }),
      {}
    );

    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;

        exercises[muscles] = [...exercises[muscles], exercise];
        return exercises;
      }, initExercises)
    );
  }

  handleCategorySelect = category =>
    this.setState({
      category
    });

  handleExerciseSelect = id =>
    // this.setState((prevState) => ({
    //   exercise: prevState.exercises
    // }))
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: false
    }));

  handleExerciseCreate = exercise =>
    this.setState(({ exercises }) => ({ exercises: [...exercises, exercise] }));

  handleExerciseDelete = id =>
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
      editMode: false,
      exercise: {}
    }));

  handleExerciseSelectEdit = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    }));

  handleExerciseEdit = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [...exercises.filter(ex => ex.id !== exercise.id), exercise],
      exercise
    }));

  handleThreeEdit = x => {
    console.log(x);
    this.setState({
      threeJS: x
    });
  };
  render() {
    const exercises = this.getExercisesByMuscles(),
      { threeJS, category, exercise, editMode } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />

        <Exercises
          muscles={muscles}
          exercise={exercise}
          category={category}
          editMode={editMode}
          exercises={exercises}
          onSelect={this.handleExerciseSelect}
          onDelete={this.handleExerciseDelete}
          onSelectEdit={this.handleExerciseSelectEdit}
          onEdit={this.handleExerciseEdit}
          threeJS={threeJS}
          threeEdit={this.handleThreeEdit}
        />

        <Footer
          category={category}
          muscles={muscles}
          onSelect={this.handleCategorySelect}
        />
      </React.Fragment>
    );
  }
}

export default App;
