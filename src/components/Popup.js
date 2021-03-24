const Popup = (props) => {
   return (
      <div className="popup" style={{display: props.open? "flex" : "none"}} onClick={props.handleClose}>
        <div className="popup__message">
           {props.children}
        </div>
      </div>
   );
}

export default Popup;
