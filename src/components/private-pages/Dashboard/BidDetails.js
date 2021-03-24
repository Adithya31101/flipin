import { Link } from "react-router-dom";

const BidDetails = (props) => {
   return (
     <>
       <div className="prod__info">
         <img className="avatar img" src={props.src} alt={props.name} />
         <h4 className="bold">{props.name}</h4>
       </div>
       <div className="details">
         <div className="bid__price">
           <span className="caption">Your Bid</span>
           <span className="bid__price-price">{`₹ ${props.ybid}`}</span>
         </div>
         <div className="bid__price">
           <span className="caption">Lowest Bid</span>
           <span className="bid__price-price">{`₹ ${props.lbid}`}</span>
         </div>
         <div className="bid__status">
           <span className="caption">Status</span>
           <span className={`badge ${props.status}`}>{props.status}</span>
         </div>
         <Link className="view" to={`/product/${props.pid}`}>
           View
         </Link>
       </div>
     </>
   );
}

export default BidDetails;
