import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn"
import Register from "./components/Register/Register";
import "./App.css";
import Profile from "./components/Profile/Profile";

// TO-DO: Play around with different models
const MODEL_ID = "face-detection";

const returnClarifyRequestOptions = (imageURL) => {
  const PAT = "ce53ddff59c943faaa0edc8e90834b3e";
  const USER_ID = "59zf7da7czjz";
  const APP_ID = "my-first-application-0290u";
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };


  return requestOptions;
};

const initialState = {
  inputField: '',
  imageUrl: '',
  box: {},
  route: 'SignIn',
  isSignedIn: false,
  isProfilePage: false,
  currentUserData: {},
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

  loadUser = (data) => {
    const { id, name, email, entries, joined } = data
    this.setState({ user: { id, name, email, entries, joined } })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage")
    const width = image.width;
    const height = image.height;
    // TO-DO: Understand the math
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ inputField: event.target.value })
  }

  onRouteChange = (component) => {
    if (component === "SignIn") {
      this.setState(initialState)
    } else if (component === "Home") {
      this.setState({ isSignedIn: true })
      this.setState({ isProfilePage: false })
    } else if (component === "Profile") {
      this.setState({ isSignedIn: true })
      this.setState({ isProfilePage: true })
    }

    this.setState({ route: component })
  }

  handleOnProfileClick = () => {
    this.onRouteChange("Profile")
    fetch(`http://localhost:3000/profile/${this.state.user.id}`)
      .then(response => response.json())
      .then(data => this.setState({ currentUserData: data }))
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.inputField })

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      returnClarifyRequestOptions(this.state.inputField)
    )

      .then((response) => response.json())
      .then((result) => {
        this.displayFaceBox(this.calculateFaceLocation(result))
        if (result) {
          fetch("http://localhost:3000/image", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(entry => entry.json())
            .then(count => this.setState({ user: { ...this.state.user, entries: count } }))
            .catch(console.log)
        }
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    const { isSignedIn, route, imageUrl, box, isProfilePage, user } = this.state;

    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} num={20} />
        <Navigation isSignedIn={isSignedIn} isProfilePage={isProfilePage} onRouteChange={this.onRouteChange} handleOnProfileClick={this.handleOnProfileClick} />
        {route === "Home" ?
          <>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </> :
          route === "Profile" ?
            <Profile currentUserData={this.state.currentUserData} /> :
            route === "SignIn" ?
              <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> :
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />

        }
      </div>
    );
  }
}

export default App;