import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
//Relative imports
import '../../../styles/Dashboard.css';
import { UserContext } from '../../Interface';
import DashboardEntry from './DashboardEntry';
import PhotoText from './PhotoText';
import BidDetails from './BidDetails';
import { authHeader } from '../../staticInfo';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { db } from '../../../services/firebase';

const Dashboard = () => {
   const {state} = useContext(UserContext);

   const [isLoading, setLoading] = useState("summary");
   const [data, setData] = useState({});
   const [chats, setChats] = useState([]);
   
   useEffect(() => {
      axios.get("https://flipin-store-api.herokuapp.com/dashboard.php", authHeader)
      .then((res) => {
         if (res.data.responseCode === 200) {
           setData(res.data);
           setLoading("inbox");
           let user = state.isSeller ? "seller" : "customer";
           db.collection("chatroom")
              .where(user, "==", state.id)
              .onSnapshot(({ docs }) => {
                const a = docs.map((doc) => {
                  const data = doc.data();
                  return ({
                    name: state.isSeller? data.customerName : data.sellerName,
                    id: doc.id,
                    logo: state.isSeller? null : data.sellerLogo,
                  });
                });
                setChats(a);
                setLoading(false);
              });
        }
    })
      .catch(e => console.log(e));
   }, []);
   
   return (
     <div className="dashboard">
       <div className="dashboard__summary">
         <section className="dashboard__summary-profile border">
           {isLoading === "summary" ? (
             <div className="loader" style={{ height: "30vh" }}>
               <CircularProgress />
             </div>
           ) : (
             <>
               <PhotoText name={state.name} src={data.src} />
               <div className="divider"></div>
               <DashboardEntry details={data.summary.s1} />
               <DashboardEntry details={data.summary.s2} />
               <DashboardEntry details={data.summary.s3} />
               <div className="divider"></div>
               <DashboardEntry
                 details={{
                   key: state.isSeller ? "Earnings" : "Expenditure",
                   value: data.e,
                 }}
               />
               <DashboardEntry
                 details={{ key: "Rating", value: data.rating }}
               />
             </>
           )}
         </section>
         <section className="dashboard__summary-inbox border">
           <div className="fixed">
             <h2 className="inbox-header">Inbox</h2>
             <div className="divider"></div>
           </div>
           {isLoading === "inbox" || isLoading === "summary"? 
            <div className="loader" style={{height: "46vh"}}>
              <CircularProgress />
            </div>
            :
            chats.map((chat) => (
             <Link to="/inbox" key={chat.id} >
               <PhotoText name={chat.name} src={chat.logo} />
             </Link>
           ))}
         </section>
       </div>
       {isLoading === "summary" ? (
         <div className="loader" style={{ height: "80vh" }}>
           <CircularProgress />
         </div>
       ) : (
         <>
           <div className="dashboard__bids">
             <div className="dashboard__bids-active">
               <h1>{state.isSeller ? "Bids" : "Product Listings"}</h1>
               <div className="dashboard__bids-list">
                 {/* Use the data.bids to loop through all the different  */}
                 {data.itemsArray.map((item) =>
                   state.isSeller ? (
                     <div key={item.id} className="bid">
                       <BidDetails
                         src={item.src}
                         name={item.pName}
                         status={item.status}
                         ybid={item.yBid}
                         lbid={item.lBid}
                         pid={item.id}
                       />
                     </div>
                   ) : (
                     <div className="bid">
                       <BidDetails
                         src={item.src}
                         name={item.pName}
                         pViews={item.pViews}
                         pid={item.id}
                         tbid={item.tBids}
                         lbid={item.lBid}
                       />
                     </div>
                   )
                 )}
               </div>
             </div>
           </div>
         </>
       )}
     </div>
   );
}

export default Dashboard;
