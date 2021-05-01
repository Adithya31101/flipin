import { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ReactComponent as PinIcon } from "../../../images/pin.svg";
import { ReactComponent as ChatIcon } from "../../../images/chat.svg";
import { ReactComponent as TickIcon } from "../../../images/tick.svg";
import { ReactComponent as BoxIcon } from "../../../images/ebox.svg";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import "../../../styles/OrderDetails.css";
import { UserContext } from "../../Interface";
import axios from "axios";
import { authHeader } from "../../staticInfo";
import { CircularProgress } from "@material-ui/core";
import Popup from "../../Popup";
import Feedback from './FeedbackInput';
import UpdateOrderInput from "./UpdateOrderInput";
import { CheckRounded, CloseRounded, Star } from "@material-ui/icons";


const OrderDetails = () => {
  
  const { id } = useParams();
  const { state } = useContext(UserContext);
  const history = useHistory();
  //State
  const [isLoading, setIsLoading] = useState(true);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openEditOrder, setOpenEditOrder] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});

  useEffect(() => {
    axios.post("https://flipin-store.herokuapp.com/getorderdetails.php", { oid: id }, authHeader)
      .then((res) => {
        setOrderInfo(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);

  //Handlers
  const handleChat = () => {
    history.push({
      pathname: "/inbox",
      state: state.isSeller
        ? {
              customer: orderInfo.id,
              customerName: orderInfo.personName,
              seller: state.id,
              sellerName: state.name,
              sellerLogo: state.url ? state.url : null,
            }
          : {
              customer: state.id,
              customerName: state.name,
              seller: orderInfo.id,
              sellerName: orderInfo.personName,
              sellerLogo: state.logo ? state.logo : null,
            }
    });
  }

  const handleUpdateOrderStatusClose = (updateHappen = false, status, dd) => {
    if(updateHappen){
      setOrderInfo((prev) => ({
        ...prev,
        status: status,
        deliveryDate: dd
      }));
    }
    setOpenEditOrder(false);
  }

  const handleAcceptBidCancel = () => {
    setOpenConfirmation(false);
  }

  const handleAcceptOrder = () => {
    axios.post("https://flipin-store.herokuapp.com/editorder.php", {oid: id}, authHeader)
    .then(res => {
      if(res.data.responseCode === 204){
        console.log(res.data);
        setOrderInfo((prev) => ({
          ...prev,
          status: "COMPLETE",
        }));
        setOpenConfirmation(false);
      }
    })
    .catch(e => console.error(e));
  }

  const handleCloseFeedback = (feedbackGiven = false) => {
    if(feedbackGiven){
      setOrderInfo((prev) => ({
        ...prev,
        hasGivenFeedback: true,
      }));
    }
    setOpenFeedback(false);
  }

  return (
    <div className="sellerorder">
      <Popup open={openFeedback} handleClose={() => handleCloseFeedback(false)}>
        {!isLoading && (
          <Feedback
            handleClose={handleCloseFeedback}
            id={id}
            name={orderInfo.personName}
          />
        )}
      </Popup>
      <Popup open={openEditOrder} handleClose={() => handleUpdateOrderStatusClose()}>
        {!isLoading && (
          <UpdateOrderInput
            date={orderInfo.deliveryDate}
            handleClose={handleUpdateOrderStatusClose}
            id={id}
            status={orderInfo.status}
          />
        )}
      </Popup>
      <Popup open={openConfirmation} handleClose={handleAcceptBidCancel}>
        <h1>Mark the order complete?</h1>
        <p>Are you sure you want to close this order?</p>
        <div className="product-page__info-buttons">
          <button onClick={handleAcceptOrder}>
            <CheckRounded />
            &nbsp; Yes
          </button>
          <button onClick={handleAcceptBidCancel}>
            <CloseRounded />
            &nbsp; No
          </button>
        </div>
      </Popup>
      {isLoading ? (
        <div className="loader" style={{ height: "70vh" }}>
          <CircularProgress />
        </div>
      ) : (
        <section className="product-page__information">
          <div className="information-image-container">
            <img src={orderInfo.mediaUrl} alt={orderInfo.name} />
          </div>
          <div className="information-text-container">
            <div>
              <h1>
                {orderInfo.name}
                <Link to={`/invoice/${id}`}>
                  <DescriptionRoundedIcon />
                  &nbsp;View Invoice
                </Link>
              </h1>
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
                    Customer's Name<span> {orderInfo.personName}</span>
                  </p>
                ) : (
                  <p>
                    Seller's Name<span>{orderInfo.personName}</span>
                  </p>
                )}
              </div>
              <div className="information-price">
                <p>
                  Delivery Date <span> {new Date(orderInfo.deliveryDate).toLocaleDateString()}</span>
                </p>
              </div>
              {state.isSeller ? (
                <div className="information-lb">
                  <button disabled={orderInfo.status === "DELIVERED" || orderInfo.status === "COMPLETE"} 
                  onClick={() => setOpenEditOrder(true)}>
                    <BoxIcon />
                    UPDATE ORDER STATUS
                  </button>

                  <button onClick={handleChat}>
                    <ChatIcon />
                    CHAT WITH CUSTOMER
                  </button>
                </div>
              ) : (
                <div className="information-lb">
                  <button disabled={orderInfo.status === "COMPLETE" } onClick={() => setOpenConfirmation(true)}>
                    <TickIcon />
                    MARK THE ORDER COMPLETE
                  </button>
                  <button onClick={handleChat}>
                    <ChatIcon />
                    CHAT WITH SELLER
                  </button>
                </div>
              )}
              <div className="information-desc">
                <h4>Product Description</h4>
                <p>{orderInfo.description}</p>
              </div>
              {(!orderInfo.hasGivenFeedback && orderInfo.status === "COMPLETE") && <button className="feedback_button" onClick={()=>setOpenFeedback(true)}>
                <Star /> &nbsp;
                Give Feedback!
              </button>}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default OrderDetails;
