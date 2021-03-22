import { useEffect, useContext } from 'react';
import axios from 'axios';
//Relative imports
import '../../../styles/Dashboard.css';
import { UserContext } from '../../Interface';
import DashboardEntry from './DashboardEntry';
import PhotoText from './PhotoText';
import Order from '../Orders/Order';
import { authHeader } from '../../staticInfo';

const SellerDashboard = () => {
   const {state} = useContext(UserContext);

   useEffect(() => {
      console.log(authHeader, state);
   }, [])
   
   return (
      <div className="dashboard">
         <div className="dashboard__summary">
            <section className="dashboard__summary-profile border">
               <PhotoText name="Gajraj Singh & C0."/>
               <div className="divider"></div>
               <DashboardEntry item="Total Bids" value="200" />
               <DashboardEntry item="Completed Orders" value="200" />
               <DashboardEntry item="Ongoing Orders" value="200" />
               <div className="divider"></div>
               <DashboardEntry item="Earnings" value="INR 12000" />
               <DashboardEntry item="Seller Rating" value="4.5" />
            </section>
            <section className="dashboard__summary-inbox border">
               <div className="fixed">
                  <h2 className="inbox-header">Inbox</h2>
                  <div className="divider"></div>
               </div>
               <PhotoText name="Customer name"/>
               <PhotoText name="Customer name"/>
               <PhotoText name="Customer name"/>
               <PhotoText name="Customer name"/>
               <PhotoText name="Customer name"/>
               <PhotoText name="Customer name"/>
            </section> 
         </div>
         <div className="dashboard__orders">
           <div className="dashboard__orders-active">
               <h1 className="border">Active Orders</h1>
               <div className="dashboard__orders-list">
                  <Order name="Customer Name" price="500" status="shipped" id="1" />
               </div>
           </div>
         </div>
      </div>
   );
}

export default SellerDashboard;
