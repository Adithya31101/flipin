import { useContext, useState } from 'react';
import { UserContext } from './Interface';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//relative file imports
import '../styles/Header.css';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';

const Header = () => {
    //Variable Initialization
    const { state, dispatch } = useContext(UserContext);
    
    //State initialization
    const [menuOpen, setMenuopen] = useState(false);

    //Sub-Components
    const RenderListItems = () => {
        if(state){
            return (
                <>
                <NavItem to="/home" text="Home" />
                <NavItem to="/login" onClick={() => {
                    localStorage.clear();
                    dispatch({type: "CLEAR"});
                }} text="Logout" />        
                </>
            );
        } else {
            return (
                <>
                <NavItem to="/" text="HOME" />
                <NavItem to="/shop" text="SHOP" />
                <NavItem to="/about" text="ABOUT US" />
                <NavItem to="/contact" text="CONTACT US" />
                <NavItem to="/login" text="LOG IN" className="bold" />
                <NavItem to="/signup" text="SIGN UP" className="highlight" />
                </>
            ); 
        }
    }


    return (
        <nav className="navbar">
            <div onClick={() => setMenuopen(prev => !prev)} className="navbar__mobile-button">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            
            <img className="navbar__logo" src="https://cdn.zeplin.io/6011b3b2928e7a26fe68d186/assets/14b215bb-211f-4169-ac7f-348760b45d3b.png" alt="Flipin Logo"/>
          
            <ul className="navbar__links"> 
                <RenderListItems />
            </ul>

            <div className="navbar__mobile-menu">
                <ul>
                    <RenderListItems />
                </ul>
            </div>

            <Link className='navbar__mobile-login' to='/login'><AccountCircleIcon /></Link>
        </nav>
    );
}

export default Header
