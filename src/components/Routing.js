import React, { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
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
import Profile from "./private-pages/Profile/Profile";
import CreateListings from "./private-pages/Listings/CreateListings";
import BrowseListings from "./private-pages/Listings/BrowseListings";
import Product from "./private-pages/Product/Product";
import Inbox from "./private-pages/Inbox/Inbox";
import OrderDetails from "./private-pages/Orders/OrderDetails";
import Invoice from "./private-pages/Invoice/Invoice";
import PremiumPage from "./public-pages/PremiumPage";

const Routing = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    }
  }, []);

  return (
    <Switch>
      {/* Public Routes */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/shop">
        <Shop />
      </Route>
      <Route exact path="/get-premium">
        <PremiumPage />
      </Route>
      <Route path="/shop/:category">
        <Shop />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      {state ? (
        //Private Pages
        <>
          {!state.hasAddress ? (
            <Route>
              {history.push("/profile")}
              <Profile />
            </Route>
          ) : (
            <>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/product/:id">
                <Product />
              </Route>
              <Route path="/inbox">
                <Inbox />
              </Route>
              <Route path="/invoice/:id">
                <Invoice />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route exact path="/orders">
                <OrderPage />
              </Route>
              <Route path="/orders/:id">
                <OrderDetails />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/create">
                <CreateListings />
              </Route>
              <Route path="/browse">
                <BrowseListings />
              </Route>
            </>
          )}
        </>
      ) : (
        // Also Public pages that are unaccessible when logged in to avoid jwt override
        <>
          <Route exact path="/flipin">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </>
      )}

      {/* Default Page || 404 page */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routing;
