const Popup = (props) => {
   return (
     <div className="popup" style={{ display: props.open ? "flex" : "none" }}>
       <div className="popup__message">{props.children}</div>
       <div className="popup__bg" onClick={() => props.handleClose()}></div>
     </div>
   );
}

export default Popup;
