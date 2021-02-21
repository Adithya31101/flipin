import Difference from './Difference';
import king from '../images/king.png';
import '../styles/About.css';
import crown from '../images/crown.svg';

const About = () => {
    // SubComponents
    const TeamMember = (props) => {
        return (
            <div className="team-member">
                { props.src ? <img src="" alt="" /> : <div className="team-member__placeholder"></div> }
                <h4>{props.name}</h4>
                <p>{props.regno}</p>
            </div>
        )
    }


    return (
        <div className="container">
            <div className="why__us">
                    <h1 className="about_us">About Us</h1>
                <div className="why__us-reasons">
                    <h3 className="why__us-header">Why us?</h3>
                    <Difference title="Lorem Ipsum" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Difference>
                    <Difference title="Lorem Ipsum" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Difference>
                    <Difference title="Lorem Ipsum" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Difference>
                    <Difference title="Lorem Ipsum" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Difference>
                </div>
                <img src={king} alt="king-customer" />
            </div>
            <div className="team">
                <h2 className="team__h2">“ Customer is Kin
                    <div className="crown">g <img className="crown" src={crown} alt="crown" /></div>
                 to us ”</h2>
                <h3 className="team__h3">Our Team</h3>
                <div className="team__grid">
                    <TeamMember name="Adithya S" regno="1941005" />
                    <TeamMember name="Arpit Chandak" regno="1941011" />
                    <TeamMember name="Ayush Jain" regno="1941014" />
                    <TeamMember name="Yashika Lakhamani" regno="1941067" />
                </div>
            </div>
        </div>
    );
}

export default About;
