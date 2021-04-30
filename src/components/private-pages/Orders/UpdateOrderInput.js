import { Send } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import "../../../styles/OrderDetails.css";
import { authHeader } from "../../staticInfo";

const UpdateOrderInput = (props) => {
   const statusOptions = [
   "STARTED",
   "PACKED",
   "SHIPPED",
   "OUT FOR DELIVERY",
   ];
   //new Date().toISOString().substring(0,10)
   const currentStatus = statusOptions.indexOf(props.status);
   const nextStatus = currentStatus + 1;
   const [status, setStatus] = useState(statusOptions[nextStatus]);
   const [date, setDate] = useState(props.date);
   

   //Handlers
   const handleSubmit = () => {
      const updateObj = {
        oid: props.id,
        status,
        dateDelivery: date,
      };
      axios.post("https://flipin-store.herokuapp.com/editorder.php", updateObj, authHeader)
      .then(res => {
         if(res.data.responseCode === 204){
            props.handleClose(true, status, date);
         }
      })
      .catch(e => console.error(e));
   }
   const handleStatusChange = (e) => {
      setStatus(e.target.value);
   }
   const handleDateChange = (e) => {
      setDate(e.target.value);
   }

   return (
     <div className="update_order">
       <h1>Update Order Status</h1>
       <h4>Order Status: </h4>
       <select value={status} onChange={handleStatusChange}>
         {
            statusOptions.map((item, i) => (
               <option defaultChecked={item===statusOptions[currentStatus+1]} key={i} disabled={i <= currentStatus}>{item}</option>
            ))
         }
       </select>
       <h4>Delivery Date: </h4>
       <input type="date" value={date} onChange={handleDateChange} />
       <br/>
       <button className="submit" onClick={handleSubmit}>
         <Send style={{width: '20px', marginRight: '5px'}}/>
         Submit</button>
     </div>
   );
}

export default UpdateOrderInput;
