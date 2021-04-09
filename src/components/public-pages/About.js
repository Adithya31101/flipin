import Difference from './Difference';
import king from '../../images/king.png';
import adithya from '../../images/adithya.png';
import arpit from '../../images/arpit.png';
import ayush from '../../images/ayush.png';
import yashika from "../../images/yashika.png";
import '../../styles/About.css';
import crown from '../../images/crown.svg';

const About = () => {
    // SubComponents
    const TeamMember = (props) => {
        return (
            <div className="team-member">
                <img src={props.src} alt={props.name} />
                <h4>{props.name}</h4>
                <p>{props.regno}</p>
            </div>
        );
    }


    return (
      <div className="container">
        <div className="why__us">
          <div className="why__us-reasons">
            <h1 className="about_us">About Us</h1>
            <h3 className="why__us-header">Why us?</h3>
            <Difference title="Customer-Centric">
              The e-commerce we are all familiar with is the customer looks
              through the listing of the various sellers and places an order.
              But on Flipin its opposite sellers look through the listing
            </Difference>
            <Difference title="Best Price in Market">
              With the bidding system, the customer always get the best
              competitive price in the market, and the seller is also kept in
              check, as there is healthy competition
            </Difference>
            <Difference title="Ease in Processing">
              The products can be easily posted and bids can be efficiently
              converted to an order.
            </Difference>
            <Difference title="Ease in communication">
              With our chat feature, the communication can be done in an
              effective manner and many misconceptions can be avoided with the
              help of the same
            </Difference>
          </div>
          <img src={king} alt="king-customer" />
        </div>
        <div className="team">
          <h2 className="team__h2">
            “ Customer is Kin
            <div className="crown">
              g <img className="crown" src={crown} alt="crown" />
            </div>
            to us ”
          </h2>
          <h3 className="team__h3">Our Team</h3>
          <div className="team__grid">
            <TeamMember name="Adithya S" regno="1941005" src={adithya} />
            <TeamMember name="Arpit Chandak" regno="1941011" src={arpit} />
            <TeamMember name="Ayush Jain" regno="1941014" src={ayush} />
            <TeamMember
              name="Yashika Lakhamani"
              regno="1941067"
              src={yashika}
            />
          </div>
        </div>
      </div>
    );
}

export default About;
