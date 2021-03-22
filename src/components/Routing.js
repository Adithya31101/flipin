import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./Interface";

// Import the different components
import Home from "./public-pages/Home";
import About from "./public-pages/About";
import Login from "./public-pages/Login";
import SignUp from "./public-pages/SignUp";
import Shop from "./public-pages/Shop";
import Contact from "./public-pages/Contact";
import NotFound from "./public-pages/NotFound";
import Dashboard from "./private-pages/Dashboard/Dashboard";
import OrderPage from "./private-pages/Orders/OrderPage";

const Routing = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    }
  }, [dispatch]);

  return (
    <Switch>
      {/* Public Routes */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/flipin">
        <Home />
      </Route>
      <Route path="/shop">
        <Shop />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      {/* Private Routes */}
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/orders">
        <OrderPage />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routing;
