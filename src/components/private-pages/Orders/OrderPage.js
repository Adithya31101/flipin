import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

//Style import
import BidDetails from './BidDetails';
import { authHeader } from '../../staticInfo';
import '../../../styles/OrderPage.css';

const OrderPage = () => {
   const [isActiveOrders, setIsActiveOrders] = useState(true);
   const [orders, setOrders] = useState([]); 
   const [isLoading, setIsLoading] = useState(true);
   const [data, setData] = useState({});

   useEffect(() => {
      axios.get("https://flipin-store-api.herokuapp.com/order.php", authHeader)
      .then(res => {
         setData(res.data);
         setOrders(res.data.orders.filter(o => o.status !== "COMPLETE"));
         setIsLoading(false);
      })
      .catch(e => console.log(e));
   }, []);

   //Handlers
   const handleTabChange = (active) => {
     setIsActiveOrders(active);
     if(active){
        setOrders(data.orders.filter(o => o.status !== "COMPLETE"));
     } else {
       setOrders(data.orders);
     }
   }

   //Sub component
   const SummaryItem = (props) => {
      return (
         <div className="order__summary-item">
            <h3 className="order__summary-name">{props.details.key}</h3>
            <h2 className="order__summary-number">{props.details.value}</h2>
         </div>
      );
   }

   if(isLoading){
     return (
       <div className="loader" style={{height: "90vh"}}>
          <CircularProgress />
        </div>
     );
   } else {
    return (
      <div className="order__container">
        <h1 className="order__heading">Orders</h1>
        <div className="order__summary">
          <SummaryItem details={data.summary.s1} />
          <SummaryItem details={data.summary.s2} />
          <SummaryItem details={data.summary.s3} />
          <SummaryItem details={data.summary.s4} />
          <SummaryItem details={data.summary.s5} />
        </div>
        <div className="active__details" style={{ marginTop: "4rem" }}>
          <div className="active__details-buttons">
            <button
              className={
                !isActiveOrders
                  ? "active__details-bid"
                  : "active__details-bid active"
              }
              onClick={() => handleTabChange(true)}
            >
              ACTIVE ORDERS
            </button>
            <button
              className={
                isActiveOrders
                  ? "active__details-order"
                  : "active__details-order active"
              }
              onClick={() => handleTabChange(false)}
            >
              ALL ORDERS
            </button>
          </div>
          <div className="bid-order__details">
            {orders.map((bid) => {
              return (
                <div key={bid.oid} className="bid__details">
                  <BidDetails
                    id={bid.oid}
                    src={bid.src}
                    name={bid.name}
                    productName={bid.productName}
                    price={bid.price}
                    status={bid.status}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
   }
};

export default OrderPage;


