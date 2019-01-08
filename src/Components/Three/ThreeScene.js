import React, { Component } from "react";
import * as THREE from "three";

class ThreeScene extends Component {
  state = this.props.threeJS;

  componentDidMount() {
    const {
      cameraAngle,
      cameraPositionZ,
      cubeX,
      cubeY,
      cubeZ,
      cubeColor
    } = this.state;
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA, what happens exactly when I change the width/height?
    this.camera = new THREE.PerspectiveCamera(
      cameraAngle,
      width / height,
      0.1,
      1000
    );
    this.camera.position.z = cameraPositionZ;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(cubeX, cubeY, cubeZ);
    const material = new THREE.MeshBasicMaterial({ color: "#" + cubeColor });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.start();
  }

  componentDidUpdate({ threeJS }) {
    if (threeJS !== this.state) {
      this.setState({
        ...threeJS
      });
    }
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    if (this.props.threeJS.stop) {
      cancelAnimationFrame(this.frameId);
    }
  };
  animate = () => {
    const { cubeRotationX, cubeRotationY } = this.props.threeJS;
    this.cube.rotation.x += cubeRotationX;
    this.cube.rotation.y += cubeRotationY;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };
  render() {
    return (
      <div
        style={{ width: "400px", height: "400px" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeScene;
