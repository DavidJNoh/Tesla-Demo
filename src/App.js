import React, { Component } from "react";
import { Header, Footer } from "./Components";
import Exercises from "./Components/Exercises";
import { muscles, exercises } from "./Components/store";
import { THREE } from "three/build/three.js";

class App extends Component {
  state = {
    exercises,
    category: "",
    exercise: {}
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

    console.log(muscles, initExercises);

    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;

        exercises[muscles] = [...exercises[muscles], exercise];
        return exercises;
      }, initExercises)
    );
  }

  handleCategorySelect = category => {
    this.setState({
      category
    });
  };

  handleExerciseSelect = id => {
    // this.setState((prevState) => ({
    //   exercise: prevState.exercises
    // }))
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id)
    }));
  };

  handleExerciseCreate = exercise => {
    this.setState(({ exercises }) => ({ exercises: [...exercises, exercise] }));
  };
  handleExerciseDelete = id => {
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id)
    }));
  };

  render() {
    const exercises = this.getExercisesByMuscles(),
      { category, exercise } = this.state;

    return (
      <React.Fragment>
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />

        <Exercises
          exercise={exercise}
          category={category}
          exercises={exercises}
          onSelect={this.handleExerciseSelect}
          onDelete={this.handleExerciseDelete}
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
