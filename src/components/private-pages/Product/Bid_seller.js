import { EditRounded } from '@material-ui/icons';
import React, { useContext } from 'react';
import { getAvatar } from '../../../helperFunctions/misc';
import { UserContext } from '../../Interface';

const Bid = (props) => {
  const {state} = useContext(UserContext);
   return (
     <>
       {props.logo ? (
         <img className="avatar img" src={props.logo} alt={props.name} />
       ) : (
         <div className="avatar">{getAvatar(props.name)}</div>
       )}
       <h3>{props.name}</h3>
       <p>{props.desc}</p>
       <h2 className="amount">{`₹ ${props.amount}`}</h2>
       {props.sellerId === state.id && (
         <div className="edit" onClick={() =>
             props.setBidInput({
               open: true,
               edit: true,
               content: {
                 price: props.amount,
                 desc: props.desc,
               },
             })
           }
         >
           <EditRounded />
         </div>
       )}
     </>
   );
}

export default Bid;
