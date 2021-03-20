import { useState, useEffect } from 'react';
import axios from 'axios';
import BidDetails from './BidDetails';
import { authHeader } from './staticInfo';

//Style import
import '../styles/OrderPage.css';
import { CircularProgress } from '@material-ui/core';

const OrderPage = () => {
   const [isBidButtonActive, setBidButtonActive] = useState(true);
   const [isLoading, setIsLoading] = useState(true);
   const [data, setData] = useState({});

   useEffect(() => {
      axios.get("https://flipin-store-api.herokuapp.com/order.php", authHeader)
      .then(res => {
         setData(res.data);
         console.log(res.data);
         setIsLoading(false);
      })
      .catch(e => console.log(e));
   }, [])

   // const data = {
   //   summary: {
   //     toc: 24,
   //     tb: 24,
   //     ab: 24,
   //     ao: 24,
   //     te: 24,
   //   },
   //   bids: [
   //     {
   //       id: "P1",
   //       src: "",
   //       pName: "Belt",
   //       lBid: "500",
   //       yBid: "600",
   //       status: true,
   //     },
   //     {
   //       id: "P2",
   //       src: "",
   //       pName: "Lipstick",
   //       lBid: "400",
   //       yBid: "800",
   //       status: false,
   //     },
   //     {
   //       id: "P3",
   //       src: "",
   //       pName: "B",
   //       lBid: "500",
   //       yBid: "600",
   //       status: true,
   //     },
   //   ],
   //   order: [
   //     {
   //       id: "P1",
   //       src: "",
   //       pName: "Belt",
   //       lBid: "500",
   //       yBid: "600",
   //       status: true,
   //     },
   //     {
   //       id: "P2",
   //       src: "",
   //       pName: "Lipstick",
   //       lBid: "400",
   //       yBid: "800",
   //       status: false,
   //     },
   //     {
   //       id: "P3",
   //       src: "",
   //       pName: "B",
   //       lBid: "500",
   //       yBid: "600",
   //       status: true,
   //     },
   //   ],
   // };
   //Sub component
   const SummaryItem = (props) => {
      return (
         <div className="order__summary-item">
            <h3 className="order__summary-name">{props.name}</h3>
            <h2 className="order__summary-number">{props.number}</h2>
         </div>
      );
   }

   return (
     <div className="order__container">
       <h1 className="order__heading">Orders</h1>
       <div className="order__summary">
         <SummaryItem name="Total Orders Completed" number="24" />
         <SummaryItem name="Total Bids" number="24" />
         <SummaryItem name="Active Bids" number="24" />
         <SummaryItem name="Active Orders" number="24" />
         <SummaryItem name="Total Earning" number="24" />
       </div>
       <div className="active__details">
         <div className="active__details-buttons">
           <button
             className={
               !isBidButtonActive
                 ? "active__details-bid"
                 : "active__details-bid active"
             }
             onClick={() => setBidButtonActive(true)}
           >
             BIDS
           </button>
           <button
             className={
               isBidButtonActive
                 ? "active__details-order"
                 : "active__details-order active"
             }
             onClick={() => setBidButtonActive(false)}
           >
             ORDERS
           </button>
         </div>
         {isLoading ? (
           <div className="loader">
             <CircularProgress />
           </div>
         ) : (
           <div className="bid-order__details">
             {data.bid.map((bid) => {
               return (
                 <div key={bid.id} className="bid__details">
                   <BidDetails
                     name={bid.pName}
                     lBid={bid.lBid}
                     bid={bid.yBid}
                     status={bid.status}
                   />
                 </div>
               );
             })}
           </div>
         )}
       </div>
     </div>
   );
};

export default OrderPage
