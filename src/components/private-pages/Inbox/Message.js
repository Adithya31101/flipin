const Message = (props) => {
   const time = props.time.toLocaleTimeString();
   const date = new Date();
   return (
      <div className="message__text">
         <h4>{props.children}</h4>
         <p>{time}</p>
      </div>
   );
}

export default Message;
