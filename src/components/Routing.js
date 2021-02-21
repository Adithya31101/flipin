import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './Interface';

// Import the different components
import Home from './Home';
import About from './About';
import Login from './Login';
import SignUp from './SignUp';
import Shop from './Shop';
import Contact from './Contact';
import NotFound from './NotFound';


const Routing = () => {
    // eslint-disable-next-line
    const {state, dispatch} = useContext(UserContext);
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            dispatch({type: 'USER', payload: user});
        }
    }, [dispatch]);

    return (
        <Switch>
            {/* Public Routes */}
            <Route exact path="/"><Home /></Route>
            <Route path="/shop"><Shop /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/contact"><Contact /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/signup"><SignUp /></Route>
            <Route><NotFound /> </Route>
            {/* Private Routes */}
        </Switch>
    );
}

export default Routing;
