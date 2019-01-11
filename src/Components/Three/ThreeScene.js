import React, { Component } from "react";
import * as THREE from "three";

class ThreeScene extends Component {
  state = this.props.threeJS;

  getInitState() {}

  componentDidMount() {
    this.generateWorld();
  }

  componentWillReceiveProps({ threeJS }) {
    this.setState(
      {
        ...threeJS
      },
      () => {
        this.handleEditProperties();
        console.log(this.cube, this.camera);
        // this.renderScene();
        // this.start();
      }
    );
  }

  handleEditProperties = () => {
    this.camera.fov = this.state.cameraAngle;
    this.camera.updateProjectionMatrix();
    this.camera.position.set(0, 0, this.state.cameraPositionZ);
    this.cube.scale.set(this.state.cubeX, this.state.cubeY, this.state.cubeZ);
    this.cube.material.color.setHex("0x" + this.state.cubeColor);
  };

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  generateWorld = () => {
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
    this.camera.position.x = -5;
    this.camera.position.y = 1;
    this.camera.position.z = 5;
    // this.camera.position.z = cameraPositionZ;
    this.camera.lookAt(this.scene.position);
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //Add Plane
    const planeGeo = new THREE.PlaneBufferGeometry(10, 10);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: "#CC0000",
      side: THREE.DoubleSide
    });

    this.plane = new THREE.Mesh(planeGeo, planeMaterial);
    this.plane.rotation.x = -0.5 * Math.PI;
    // this.plane.position.x = 15;
    this.plane.position.y = -1;
    // this.plane.position.z = 2;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);

    //Add Light
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(5, 3, -5);
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);

    this.spotLight1 = new THREE.SpotLight(0xffffff);
    this.spotLight1.position.set(-30, 50, -10);
    this.spotLight1.castShadow = true;
    this.scene.add(this.spotLight1);

    //Axes Helper
    this.axes = new THREE.AxesHelper(20);
    this.scene.add(this.axes);

    //ADD CUBE
    const geometry = new THREE.BoxGeometry(cubeX, cubeY, cubeZ);
    const material = new THREE.MeshLambertMaterial({ color: "#" + cubeColor });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.castShadow = true;
    this.scene.add(this.cube);
    console.log(this.camera, this.plane, this.spotLight, this.cube, this.scene);
    this.start();
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    const { cubeRotationX, cubeRotationY } = this.props.threeJS;
    this.cube.rotation.x += cubeRotationX;
    this.cube.rotation.y += cubeRotationY;
    this.cube.rotation.z += cubeRotationY;
    // this.plane.rotation.x += 0.01;
    // this.plane.rotation.y += 0.01;
    // this.plane.rotation.z += 0.01;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };
  render() {
    return (
      <div
        style={{ width: "600px", height: "600px" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeScene;
