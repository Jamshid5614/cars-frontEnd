import "./App.css";
import { Route, Link, Redirect } from "react-router-dom";
import Home from "./components/Home";
import ViewCar from "./components/ViewCar";
import CreateCar from "./components/CreateCar";
import SelectedCar from "./components/SelectedCar";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

function App() {
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
        <Redirect to="/cars" />
          <Route exact path={["/cars", "/"]} component={Home} />
          <Route exact path="/cars/view/:id" component={ViewCar} />
          <Route exact path="/cars/new" component={CreateCar} />
          <Route exact path="/cars/:id" component={SelectedCar} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
        </>
      ) : (
        <>
          {window.location.pathname == "/sign-up" ? (
            <Route exact path="*" component={SignUp} />
          ) : (
            <Route exact path="*" component={SignIn} />
          )}
        </>
      )}
    </>
  );
}

export default App;
