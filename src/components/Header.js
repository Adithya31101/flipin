import { useContext, useState, useEffect } from 'react';
import { UserContext } from './Interface';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//relative file imports
import '../styles/Header.css';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';

const Header = () => {
    //State initialization
    const [menuOpen, setMenuopen] = useState(false);
    
    //UseEffect Implementation
    useEffect(() => {
        if(menuOpen){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [menuOpen]);

    //Variable Initialization
    const { state, dispatch } = useContext(UserContext);

    //Sub-Components
    const RenderListItems = () => {
        if(state){
            return (
              <>
                <NavItem to="/dashboard" text="DASHBOARD" />
                <NavItem to="/browse" text="BROWSE POSTS" />
                <NavItem to="/inbox" text="INBOX" />
                <NavItem to="/orders" text="ORDERS" />
                <NavItem to="/profile" text="PROFILE" />
                <NavItem
                  to="/login"
                  className="highlight"
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: "CLEAR" });
                  }}
                  text="LOGOUT"
                />
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
            <div onClick={() => setMenuopen(prev => !prev)}
            className={menuOpen? "navbar__mobile-close" : "navbar__mobile-button"}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            { menuOpen && <div className="backdrop" style={{
                opacity: "0.4", zIndex: 2,   
            }} onClick={()=>setMenuopen(false)}></div>}
            
            <Link to="/" onClick={()=>setMenuopen(false)}>
                <img className="navbar__logo" src="https://cdn.zeplin.io/6011b3b2928e7a26fe68d186/assets/14b215bb-211f-4169-ac7f-348760b45d3b.png" alt="Flipin Logo"/>
            </Link>
          
            <ul className="navbar__links"> 
                <RenderListItems />
            </ul>

            <div className="navbar__mobile-menu" style={menuOpen? ({left: '0vw'}) : ({left: '-70vw'})}>
                <ul onClick={() => setMenuopen(false)}>
                    <RenderListItems />
                </ul>
            </div>

            <Link className='navbar__mobile-login' onClick={()=>setMenuopen(false)} to='/login'><AccountCircleIcon /></Link>
        </nav>
    );
}

export default Header;
