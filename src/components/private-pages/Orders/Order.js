import { Link } from "react-router-dom";

const Order = (props) => {
   return (
      <div className="order">
         <div className="avatar"></div>
         <h4 className="bold">{props.name}</h4>
         <div className="details">
            <div className="order__price">
               <span className="caption">Price</span>
               <span className="order__price-price">{`INR ${props.price}`}</span>
            </div>
            <div className="order__status">
               <span className="caption">Status</span>
               <span className={`badge ${props.status}`}>{props.status}</span>
            </div>
         </div>
         <Link className="view" to={`/orders/${props.id}`}>View</Link>
      </div>
   );
}

export default Order;
