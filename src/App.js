import React from "react";
import { useEffect, useState } from "react";
import axios from "./utils/axios";
import 'antd/dist/antd.css'; 
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import ViewCar from "./components/ViewCar";
import CreateCar from "./components/CreateCar";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Profile from "./components/Profile";
import GlobalContext from "./context/GlobalContext";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      isAdmin: true,
    };
  }



  fetchData = () => {
    axios.get("/cars")
    .then((data) => {
      this.setState({ cars: data.data });
    });
  }

  componentDidMount() {
    this.fetchData();
    setInterval(() => {
      this.fetchData()
    }, 120000)
  }


  handleIsAdmin = (val) => {
    this.setState({isAdmin: val})
  }

  shouldRender = (bool) => {
    if(bool) {
      this.fetchData();
    }
  }

  render() {
    const { isAdmin,cars,user } = this.state;
    console.log(cars)
    return (
      <>
        <GlobalContext.Provider
          value={{ isAdmin,handleIsAdmin: this.handleIsAdmin,cars, shouldRender: this.shouldRender}}
        >
          {localStorage.getItem("token") ? (
            <>
              <Redirect to="/cars" />
              <Route
                exact
                path={["/cars", "/"]}
                render={() => <Home />}
              />
              <Route exact path="/cars/view/:id" component={ViewCar} />
              <Route exact path="/cars/new" component={CreateCar} />
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/profile" component={Profile} />
            </>
          ) : (
            <>
              {window.location.pathname === "/sign-up" ? (
                <>
                  <Redirect to="/sign-up" />
                  <Route exact path="*" component={SignUp} />
                </>
              ) : (
                <>
                  <Redirect to="/sign-in" />
                  <Route exact path="*" component={SignIn} />
                </>
              )}
            </>
          )}
        </GlobalContext.Provider>       
      </>
    );
  }
}

export default App;
