import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Interface";
import Popup from '../../Popup';
import { Tooltip } from "@material-ui/core";
import "../../../styles/Profile.css";
import camera from "../../../images/camera.svg";
import axios from "axios";
import { authHeader } from "../../staticInfo";
import validations from "../../../helperFunctions/validation";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { category } from '../../staticInfo';

const Profile = () => {
   //Init Variables
   const {state} = useContext(UserContext);

   //State
   const [popupOpen, setPopupOpen] = useState(false);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [addressLineOne, setaddressLineOne] = useState("");
   const [addressLineTwo, setaddressLineTwo] = useState("");
   const [city, setCity] = useState("");
   const [states, setStates] = useState("");
   const [country, setCountry] = useState("");
   const [pincode, setPincode] = useState("");
   const [profileImage, setProfileImage] = useState("");
   const [editable, setEditable] = useState("");
   const [error, setError] = useState({
      name: "",
      email: "",
      MobileNo: "",
      category: "",
      addressLineOne: "",
      addressLineTwo: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      profileImage: "",
   });



   //Use Effects
   useEffect(()=>{
      if(!state.hasAddress){
         setPopupOpen(true);
      }
      axios.get("https://flipin-store-api.herokuapp.com/getprofile.php", authHeader)
        .then(({ data }) => {
          if (data.responseCode === 200) {
            setName(data.user.name);
            setEmail(data.user.email);
          }
        })
        .catch((e) => console.log(e));
   }, []);


   //Handler Functions
   const handleClose = () => setPopupOpen(false);

   const handlePhone = (e) => {
     setPhone(e.target.value);
     error.phone = validations.validatePhone(e.target.value);
   };
   const handleaddressLineOne = (e) => {
     setaddressLineOne(e.target.value);
     error.addressLineOne = validations.validateGeneral(e.target.value, 'Address');
   };
   const handleaddressLineTwo = (e) => {
     setaddressLineTwo(e.target.value);
     error.addressLineTwo = validations.validateGeneral(e.target.value, 'Address');
   };
   const handleCity = (e) => {
     setCity(e.target.value);
     error.city = validations.validateGeneral(e.target.value, "City");
   };
   const handleState = (e) => {
     setStates(e.target.value);
     error.state = validations.validateGeneral(e.target.value, "State");
   };
   const handleCountry = (e) => {
     setCountry(e.target.value);
     error.country = validations.validateGeneral(e.target.value, "Country");
   };
   const handlePincode = (e) => {
     setPincode(e.target.value);
     error.pincode = validations.validatePin(e.target.value);
   };

   const handleSubmit = (e) => {
     e.preventDefault();
     const user = {
       phone,
       category,
       addressLineOne,
       addressLineTwo,
       city,
       state,
       country,
       pincode,
     };
     console.log(user);
     if (validations.noError(error)) {
       // axios.put("https://flipin-store-api.herokuapp.com/profile.php",authHeader, user);
       //   .then((res) => {
       //     if (res.data.responseCode === 204) {
       //       console.log(res.data);
       //     }
       //   })
       //   .catch((e) => console.log(e));
     } else {
       console.log(error);
     }
   };



   return (
     <div className="profile">
       <Popup open={popupOpen} handleClose={handleClose}>
         <h3>
           Please add your address before you can start using this application!
         </h3>
       </Popup>
       <div className="seller__container">
         <div>
           <section className="flex">
             <div>
               <h1 className="seller__john">Hello John</h1>
               <p className="seller__info">
                 This is your profile you can edit your information here
               </p>
               <button
                 onClick={() => {
                   setEditable((prev) => !prev);
                 }}
                 className="seller__editprofile"
               >
                 Edit Profile
               </button>
             </div>
             <div>
               <h2 className="seller__membership">Membership</h2>
               <button className="seller__premium">Premium</button>
               <p></p>
             </div>
           </section>
           <div className="seller">
             <h2 className="seller__head">Personal Profile</h2>
             {state.isSeller && (
                <>
                <label htmlFor="file-upload">
                  <div className="image-input" id="image-upload-button">
                  <img src={camera} alt="camera icon" />
                  <span className="upload">Upload Picture</span>
                  </div>
               </label>
               <input type="file" id="file-upload" hidden />
               </>
             )}
             
             <form className="profile-grid" onSubmit={handleSubmit}>
               <div className="form-input-container">
                 <label htmlFor="name">Name</label>
                 <input
                   disabled
                   type="text"
                   id="name"
                   name="name"
                   value={name}
                 />
                 {error.name && (
                   <Tooltip title={error.name} arrow placement="right">
                     <ErrorOutlineIcon />
                   </Tooltip>
                 )}
               </div>
               <div className="form-input-container">
                 <label htmlFor="email">Email Address</label>
                 <input
                   disabled
                   type="email"
                   id="email"
                   name="email"
                   value={email}
                 />
                 {error.email ? (
                   <span className="error-text">{error.email}</span>
                 ) : null}
               </div>
               <div className="form-input-container">
                 <label htmlFor="tel">Mobile Number</label>
                 <input
                   disabled={!editable}
                   type="tel"
                   id="tel"
                   name="tel"
                   value={phone}
                   onChange={handlePhone}
                 />
                 {error.phone ? (
                   <span className="error-text">
                     {error.phone && (
                       <Tooltip title={error.phone} arrow placement="right">
                         <ErrorOutlineIcon />
                       </Tooltip>
                     )}
                   </span>
                 ) : null}
               </div>
               
               {
               state.isSeller?
                (<div className="form-input-container">
                 <label htmlFor="category">Category</label>
                 <select>
                   {category.map((item) => (
                     <option key={item.id} value={item.type}>
                       {item.type}
                     </option>
                   ))}
                 </select>
               </div>)
               :
               (<div></div>)
               }
               
               <div className="form-input-container">
                 <label htmlFor="address-line-one">Address Line 1</label>
                 <input
                   disabled={!editable}
                   type="text"
                   id="address-line-one"
                   name="address-line-one"
                   value={addressLineOne}
                   onChange={handleaddressLineOne}
                 />
                 {error.addressLineOne ? (
                   <span className="error-text">{error.addressLineOne}</span>
                 ) : null}
               </div>
               <div className="form-input-container">
                 <label htmlFor="address-line-two">Address Line 2</label>
                 <input
                   disabled={!editable}
                   type="text"
                   id="address-line-two"
                   name="address-line-two"
                   value={addressLineTwo}
                   onChange={handleaddressLineTwo}
                 />
                 {error.addressLineTwo ? (
                   <span className="error-text">{error.addressLineTwo}</span>
                 ) : null}
               </div>
               <div className="form-input-container">
                 <label htmlFor="city">City</label>
                 <input
                   disabled={!editable}
                   type="text"
                   id="city"
                   name="city"
                   value={city}
                   onChange={handleCity}
                 />
                 {error.city ? (
                   <span className="error-text">{error.city}</span>
                 ) : null}
               </div>
               <div className="form-input-container">
                 <label htmlFor="state">State</label>
                 <input
                   disabled={!editable}
                   type="text"
                   id="state"
                   name="state"
                   value={states}
                   onChange={handleState}
                 />
                 {error.state ? (
                   <span className="error-text">{error.state}</span>
                 ) : null}
               </div>
               <div className="form-input-container">
                 <label htmlFor="country">Country</label>
                 <input
                   disabled={!editable}
                   type="text"
                   id="country"
                   name="country"
                   value={country}
                   onChange={handleCountry}
                 />
                 {error.country ? (
                   <span className="error-text">{error.country}</span>
                 ) : null}
               </div>
               <div className="form-input-container">
                 <label htmlFor="pincode">Pincode</label>
                 <input
                   disabled={!editable}
                   type="number"
                   id="pincode"
                   name="pincode"
                   value={pincode}
                   onChange={handlePincode}
                 />
                 {error.pincode ? (
                   <span className="error-text">{error.pincode}</span>
                 ) : null}
               </div>

               <button onClick={handleSubmit} className="seller__button-submit">
                 Submit
               </button>
             </form>
           </div>
         </div>
       </div>
       );
     </div>
   );
}

export default Profile;
