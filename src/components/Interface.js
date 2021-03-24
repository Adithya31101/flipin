//Interface File creates an UI for the entire web app or is a parent for the entire application 
import { createContext, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

//Relative Imports
import { initialState, reducer } from '../reducers/userReducer';

//Import components
import Header from './public-pages/Header';
import Routing from './Routing';
import Footer from './public-pages/Footer';

//Global Context 
export const UserContext = createContext();

const Interface = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            <BrowserRouter> 
                <header><Header /></header>
                <main>
                    <Routing />
                </main>
                <Footer isLoggedIn={state? true : false} />
            </BrowserRouter>
        </UserContext.Provider>
    );
}
export default Interface;
