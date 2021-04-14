const Message = (props) => {
   return (
      <>
         <h4>{props.children}</h4>
         <p>{props.time.toUTCString()}</p>
      </>
   );
}

export default Message;
