import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as Rupee } from '../../../images/rupee.svg';
import validation from '../../../helperFunctions/validation';
import { Tooltip } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';
import { authHeader } from '../../staticInfo';

const BidInput = (props) => {
   //Variables
   //State
   const [price, setPrice] = useState(props.content.price);
   const [desc, setDesc] = useState(props.content.desc);
   const [error, setError] = useState({
      price: "", desc: ""
   });

   useEffect(() => {
     setPrice(props.content.price);
     setDesc(props.content.desc);
   }, [props.content.price, props.content.desc]);

   //Handlers
   const handlePriceInput = (e) => {
     setPrice(e.target.value);
     setError((prev) => ({
       ...prev,
       price: e.target.value > 0 ? undefined : "Enter a valid price!",
     }));
   };

   const handleDescInput = (e) => {
     setDesc(e.target.value);
     setError((prev) => ({
       ...prev,
       desc: validation.validateGeneral(e.target.value, "Description")
     }));
   };

   const handleCancel = (shouldUpdate) => {
      if(shouldUpdate){
         props.handleClose({ price, desc });
      } else {
         props.handleClose();
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      if(validation.noError(error)){
         axios.post("https://flipin-store-api.herokuapp.com/bid.php", {
            pid: props.pid,   
            price,
            desc
         }, authHeader)
         .then(({data})=>{
            if(data.responseCode === 201 || data.responseCode === 204){
               console.log(data);
               handleCancel(true);
            } else {
               console.log(data);
            }
            
         })
      } else {
         console.log(error);
      }
   }

   return (
     <div className="bid__input">
       <h2>{ props.edit ? "Edit Bid" : "Add Bid" }</h2>
         <form>
            <label htmlFor="price">Price</label>
            <div className="bid__input-price">
            <Rupee className="rupee" style={{width: '20px'}}/>
            <input id="price" type="number" onChange={handlePriceInput} value={price} />
            {error.price &&
            <Tooltip arrow placement="right" title={error.price}>
               <ErrorOutline />
            </Tooltip>}
            </div>
            <label htmlFor="desc">Description</label>
            <div className="textAreaError">
               <textarea onChange={handleDescInput} name="desc" id="desc" cols="30" rows="10" value={desc}></textarea>
               {error.desc &&
               <Tooltip arrow placement="right" title={error.desc}>
                  <ErrorOutline />
               </Tooltip>}
            </div>
            <div className="bid__input-buttons">
               <button type="submit" onClick={handleSubmit}>SUBMIT</button>
               <button type="button" onClick={() => handleCancel()}>CANCEL</button>
            </div>
         </form>
     </div>
   );
}

export default BidInput;
