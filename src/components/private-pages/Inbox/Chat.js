//Props: name, src

import { getAvatar } from "../../../helperFunctions/misc";

const Chat = (props) => {
   return (
     <>
       {props.src?
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
