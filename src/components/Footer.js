import { Link } from 'react-router-dom';

//Relative imports
import { footerInfo } from './staticInfo';
import '../styles/Footer.css';

//Media Imports
import footerLogo from '../images/logo_footer.png';
import {ReactComponent as Instagram} from '../images/insta.svg';
import {ReactComponent as LinkedIn} from '../images/linkedIn.svg';
import {ReactComponent as Twitter} from '../images/twitter.svg';



const Footer = (props) => {
    //Sub Components: 
    const FooterSection = (subProps) => {
        const {header, list} = subProps.section;
        return (
            <>
                <h4 className="bold">{header}</h4>
                <ul>
                { list.map(item => <li key={item.id}><Link to={item.to}>{item.name}</Link></li>) }
                </ul>
            </>
        );
    }


    return (
        <footer>  
            {
                !props.isLoggedIn 
                &&            
                <div className="footer__message">
                   <h1>Join Us as a Seller&nbsp;or Customer</h1>
                </div>
            }
            <div className="footer">
                { footerInfo.map(section => (
                    <section key={section.id} className="footer__section">
                        <FooterSection section={section} />
                    </section> 
                ))}
                <div className="footer__marketing"> 
                    <img src={footerLogo} alt="Flipin"/>
                    <div className="footer__marketing-social">
                        <a target="_blank" rel="noreferrer" href="https://instagram.com"><Instagram /></a>
                        <a target="_blank" rel="noreferrer" href="https://linkedin.com"><LinkedIn /></a>
                        <a target="_blank" rel="noreferrer" href="https://twitter.com"><Twitter /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
