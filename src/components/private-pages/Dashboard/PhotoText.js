import { getAvatar } from "../../../helperFunctions/misc";

const PhotoText = (props) => {
   return (
      <div className="photo-text">
         {
            props.src?
               <img className="avatar img" src={props.src} alt={props.name} />
               :
               <div className="avatar">{getAvatar(props.name)}</div>
         }
         <h5 className="text">{props.name}</h5>
      </div>
   );
}
export default PhotoText;