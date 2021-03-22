const PhotoText = (props) => {
   return (
      <div className="photo-text">
         <div className="avatar"></div>
         <h5 className="text">{props.name}</h5>
      </div>
   );
}
export default PhotoText;