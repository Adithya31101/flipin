import React, { useContext, useState } from "react";
import { getAvatar } from "../../../helperFunctions/misc";
import { ReactComponent as Arrow } from "../../../images/arrow.svg";
import { ReactComponent as ChatIcon } from "../../../images/chat.svg";
import { ReactComponent as BoxIcon } from "../../../images/ebox.svg";
import { useHistory } from "react-router";
import { UserContext } from "../../Interface";

const Bid = (props) => {
  const {state} = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  
   const history = useHistory();
   const handleChatWithSeller = () => {
      history.push({
        pathname: "/inbox",
        state: {
          customer: state.id,
          customerName: state.name,
          seller: props.sellerId,
          sellerName: props.name,
          sellerLogo: props.logo,
        },
      });
   }
   const handlePlaceOrder = () => {
     props.setAcceptBidOpen({
       open: true,
       sellerId: props.sellerId,
     });
   }
  
  return (
    <>
      {props.logo ? (
        <img className="avatar img" src={props.logo} alt={props.name} />
      ) : (
        <div className="avatar">{getAvatar(props.name)}</div>
      )}
      <h3>{props.name}</h3>
      <p>{props.desc}</p>
      <div className={`bid__dropdown ${expanded? "open" : "closed"}`}>
        <div className="bid__amt-btn">
           <h2 className="amount">{`₹ ${props.amount}`}</h2>
           <div
             className="dropdown__button"
             onClick={() => setExpanded((prev) => !prev)}
           >
             <Arrow />
           </div>
        </div>

        {expanded && (
          <div className="dropdown__options">
            <button onClick={handleChatWithSeller}>
              <ChatIcon
                style={{ fill: "#fff", width: "20px", marginRight: "10px" }}
              />
              CHAT WITH SELLER
            </button>
            <button disabled={!props.active} onClick={handlePlaceOrder}>
              <BoxIcon
                style={{ fill: "#fff", width: "20px", marginRight: "10px" }}
              />
              PLACE ORDER
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Bid;
