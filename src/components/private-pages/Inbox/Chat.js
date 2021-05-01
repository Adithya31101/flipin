//Props: name, src

import { useContext } from "react";
import { getAvatar } from "../../../helperFunctions/misc";
import { UserContext } from "../../Interface";

const Chat = (props) => {
  const {state} = useContext(UserContext);
  return (
     <>
       {(props.src && !state.isSeller)?
       <img className="avatar img" src={props.src} alt={props.name} />
       :
       <div className="avatar">{getAvatar(props.name)}</div>
       }
       <h3 className="chat__person-name">
         {props.name}
       </h3>
     </>
   );
}

export default Chat;
