import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from 'axios';
import '../../../styles/Invoice.css';

import logoHeader from '../../../images/logo_header.png';
import { authHeader } from "../../staticInfo";

const Invoice = () => {
   const { id } =  useParams();
   const history = useHistory();
   const [bill, setBill] = useState({});
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     axios.post("https://flipin-store.herokuapp.com/billing.php",{ oid: id },authHeader)
       .then((res) => {
         setBill(res.data);
         setIsLoading(false);
       })
       .catch((e) => {
         console.error(e);
       });
   });
   const handlePrint = () => {
      console.log("Hello");
      const printableElements = document.getElementById('printable').innerHTML;
      const orderHTML = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
      document.body.innerHTML = orderHTML;
      window.print();
      history.go(0);
   }
   return (
     <div>
       {isLoading ? (
         <div className="loader" style={{ height: "90vh" }}>
           <CircularProgress />
         </div>
       ) : (
         <div className="bill_container">
            <button onClick={handlePrint} className="bill_print">SAVE PDF</button>
            <div className="bill_details" id="printable">
               <div className="bill_date-logo">
                  <span>{`${bill.date.day} ${bill.date.month} ${bill.date.year}`}</span>
                  <img src={logoHeader} alt="Flipin Logo" />
               </div>
               <div className="bill_info">
                  <div className="address">
                     <h4>Billed To: </h4>
                     <div>
                        <span>{bill.Customer.name}</span>
                        <span>{bill.Customer.firstLineAddress + " " + bill.Customer.secondLineAddress + ", "}</span>
                        <span>{bill.Customer.city + ", " + bill.Customer.state + ", "}</span>
                        <span>{bill.Customer.country + " - " + bill.Customer.pincode}</span>
                     </div>
                  </div>
                  <div className="address">
                     <h4>Payable To:</h4>
                     <div>
                        <span>{bill.Seller.name}</span>
                        <span>{bill.Seller.firstLineAddress + " " + bill.Seller.secondLineAddress + ", "}</span>
                        <span>{bill.Seller.city + ", " + bill.Seller.state + ", "}</span>
                        <span>{bill.Seller.country + " - " + bill.Seller.pincode}</span>
                     </div>
                  </div>
               </div>
               <div className="bill_particulars">
                  <div className="particulars_row bold">
                     <span>ITEM</span>
                     <span>QTY</span>
                     <span>PRICE/QTY</span>
                     <span>TOTAL</span>
                  </div>
                  <hr />
                  <div className="particulars_row" style={{marginTop: "2rem"}}>
                     <span>{bill.productName}</span>
                     <span>{bill.quantity}</span>
                     <span>{bill.price}</span>
                     <span>{bill.price*bill.quantity}</span>
                  </div>

                  <div className="particulars_row" style={{marginTop: "7rem"}}>
                     <span></span>
                     <span></span>
                     <span>Commision (@{bill.commission})</span>
                     <span>{bill.commissionAmount}</span>
                  </div>
                  <div className="particulars_row bold" style={{marginTop: "2rem"}}>
                     <span></span>
                     <span></span>
                     <span>Total</span>
                     <span>{bill.totalPrice}</span>
                  </div>
               </div>
               <div className="bill_footer">
                  <hr />
                 FlipIn Store
               </div>
            </div>
         </div>
       )}
     </div>
   );
}

export default Invoice;
