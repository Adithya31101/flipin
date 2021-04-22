import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ReactComponent as PinIcon } from "../../../images/pin.svg";
import { ReactComponent as ChatIcon } from "../../../images/chat.svg";
import { ReactComponent as TickIcon } from "../../../images/tick.svg";
import { ReactComponent as BoxIcon } from "../../../images/ebox.svg";
import "../../../styles/OrderDetails.css";
import { UserContext } from "../../Interface";
import axios from "axios";
import { authHeader } from "../../staticInfo";
import { CircularProgress } from "@material-ui/core";


const OrderDetails = () => {
  const { id } = useParams();
  const { state } = useContext(UserContext);
  const history = useHistory();
  //State
  const [isLoading, setIsLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState({});

  useEffect(() => {
    axios
      .post(
        "https://flipin-store-api.herokuapp.com/getorderdetails.php",
        { oid: id },
        authHeader
      )
      .then((res) => {
        setOrderInfo(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);

  return (
    <div className="sellerorder">
      {
         isLoading?
         <div className="loader" style={{height: "70vh"}}>
            <CircularProgress />
         </div>
         :
         <section className="product-page__information">
         <div className="information-image-container">
            <img src={orderInfo.mediaUrl} alt={orderInfo.name} />
         </div>
         <div className="information-text-container">
            <div>
               <h1>{orderInfo.name}</h1>
               <div className="information-location">
               <PinIcon />
               <h3>{orderInfo.location}</h3>
               </div>
               <div className="information-price">
               <p>
                  Price <span> {orderInfo.price}</span>
               </p>
               </div>
               <div className="information-status">
               <p>
                  Status <span className="status live">{orderInfo.status}</span>
               </p>
               </div>

               <div className="information-name">
               {state.isSeller ? (
                  <p>
                     Seller's Name<span> {orderInfo.personName}</span>
                  </p>
               ) : (
                  <p>
                     Customer's Name<span>{orderInfo.personName}</span>
                  </p>
               )}
               </div>
               {state.isSeller ? (
               <div className="information-lb">
                  <button>
                     <BoxIcon />
                     UPDATE ORDER STATUS
                  </button>

                  <button>
                     <ChatIcon />
                     CHAT WITH CUSTOMER
                  </button>
               </div>
               ) : (
               <div className="information-lb">
                  <button>
                     <TickIcon />
                     MARK THE ORDER COMPLETE
                  </button>
                  <button>
                     <ChatIcon />
                     CHAT WITH SELLER
                  </button>
               </div>
               )}
               <div className="information-desc">
               <h4>Product Description</h4>
               <p>{orderInfo.description}</p>
               </div>
            </div>
         </div>
         </section>
      }
    </div>
  );
};

export default OrderDetails;
