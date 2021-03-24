import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Interface";
import Popup from '../../Popup';

const Profile = () => {

   const {state} = useContext(UserContext);
   const [popupOpen, setPopupOpen] = useState(false);
   useEffect(()=>{
      if(!state.hasAddress){
         setPopupOpen(true);
      }
   }, []);

   const handleClose = () => setPopupOpen(false);
   return (
      <div className="profile">
         <Popup open={popupOpen} handleClose={handleClose}>
            <h3>Please add your address before you can start using this application!</h3>
         </Popup>
         
         Profile Page
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita totam iure facere enim, asperiores, itaque deserunt, nobis quas beatae corporis culpa! Iusto temporibus modi, laboriosam adipisci cupiditate reprehenderit et nemo?
      </div>
   );
}

export default Profile;
