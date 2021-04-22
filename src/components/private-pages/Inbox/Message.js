const Message = (props) => {
   const time = props.time.toLocaleTimeString();
   return (
      <div className="message__text">
         {props.media && <img className="message__img" src={props.media} alt="Image cannot be displayed"/>}
         <h4>{props.children}</h4>
         <p>{time}</p>
      </div>
   );
}

export default Message;
