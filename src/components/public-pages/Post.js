import { memo } from 'react';

import { ReactComponent as Pin } from '../../images/pin.svg';


const Post = (props) => {
   return (
     <>
       {/* image, name, location, lowest bid  */}
       <img className="product__image" src={props.img} alt={props.name} />
       <div className="product__info">
         <h4 className="product__heading">{props.name}</h4>
         <div style={{ marginTop: "10px" }}>
           <span>Lowest Bid </span>
           <span className="product__lowbid">{`₹ ${props.bid}`}</span>
         </div>
         <div className="product__location">
           <Pin />
           <span>{props.location}</span>
         </div>
       </div>
     </>
   );
};
// Oldest Newest Category Bid Amount
export default memo(Post);
