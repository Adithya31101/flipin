import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Interface";
import Popup from '../../Popup';
import { CircularProgress, Snackbar, Tooltip } from "@material-ui/core";
import "../../../styles/Profile.css";
import camera from "../../../images/camera.svg";
import axios from "axios";
import { authHeader, category } from "../../staticInfo";
import validations from "../../../helperFunctions/validation";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import MuiAlert from "@material-ui/lab/Alert";
import EditRoundedIcon from "@material-ui/icons/EditRounded";


const Profile = () => {
   //Init Variables
   const {state, dispatch} = useContext(UserContext);
   
   //State
   const [user, setUser] = useState({});
   const [popupOpen, setPopupOpen] = useState(false);
   const [loading, setLoading] = useState("init");
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [addressLineOne, setaddressLineOne] = useState("");
   const [addressLineTwo, setaddressLineTwo] = useState("");
   const [cat, setCat] = useState("");
   const [city, setCity] = useState("");
   const [states, setStates] = useState("");
   const [country, setCountry] = useState("");
   const [pincode, setPincode] = useState("");
   const [image, setImage] = useState("");
   const [src, setSrc] = useState("");
   const [editable, setEditable] = useState("");
   const [error, setError] = useState({
      MobileNo: "",
      category: "",
      addressLineOne: "",
      addressLineTwo: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      image: "",
   });



   //Use Effects
   useEffect(()=>{
      if(!state.hasAddress){
         setPopupOpen(true);
      }
      axios.get("https://flipin-store-api.herokuapp.com/getprofile.php", authHeader)
        .then(({ data: {user},data }) => {
          if (data.responseCode === 200) {
            console.log(data);
            setUser(data);
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phoneNumber);
            setCat(user.category);
            setaddressLineOne(user.firstLineAddress);
            setaddressLineTwo(user.secondLineAddress);
            setCity(user.city);
            setStates(user.state);
            setPincode(user.pincode);
            setCountry(user.country);
            setSrc(user.logo);
            setLoading(false);
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
    const handleCategoryChange = (e) => {
      setCat(e.target.value);
    };
   const handlePincode = (e) => {
     setPincode(e.target.value);
     error.pincode = validations.validatePin(e.target.value);
   };
   const handelImageChange = (e) => {
     error.image = undefined;
     if (e.target.files[0]) {
       setImage(e.target.files[0]);
       const reader = new FileReader();
       reader.onload = () => {
         if (reader.readyState === 2) {
           setSrc(reader.result);
         }
       };
       reader.readAsDataURL(e.target.files[0]);
     }
   }

   const handleSubmit = (e) => {
     e.preventDefault();
     if (validations.noError(error)) {
       setLoading("submit");
        if (!state.isSeller) {
          axios.post("https://flipin-store-api.herokuapp.com/setprofile.php", {
              phoneNumber: phone,
              firstLineAddress: addressLineOne,
              secondLineAddress: addressLineTwo,
              city,
              state: states,
              country,
              pincode,
          }, authHeader)
            .then((res) => {
              if (res.data.responseCode === 204) {
                console.log(res.data);
                dispatch({ type: "ADDRESS", payload: {...state, hasAddress: true}});
                localStorage.setItem("user", JSON.stringify(state));
                setLoading(false);
              }
            })
            return;
        }
       const data = new FormData();
       data.append("file", image);
       data.append("upload_preset", "flipinStore");
       data.append("cloud_name", "flipin");
       const userFromInput = {
         category: cat,
         phoneNumber: phone,
         logo: src,
         premiumMember: "NO",
         firstLineAddress: addressLineOne,
         secondLineAddress: addressLineTwo,
         city,
         state: states,
         country,
         pincode,
       };
       if(user.logo === src){
         axios.post("https://flipin-store-api.herokuapp.com/setprofile.php", userFromInput, authHeader)
         .then((res) => {
           if (res.data.responseCode === 204) {
             console.log(res.data);
             dispatch({
               type: "ADDRESS",
               payload: { ...state, hasAddress: true },
             });
             localStorage.setItem("user", JSON.stringify(state));
             setLoading(false);
           }
         })
         .catch((e) => console.log(e));
       } else {
         axios.post("https://api.cloudinary.com/v1_1/flipin/image/upload", data)
        .then(({ data: {secure_url: url} }) => {
          userFromInput.logo = url;
          axios.post("https://flipin-store-api.herokuapp.com/setprofile.php", userFromInput, authHeader)
          .then((res) => {
            if (res.data.responseCode === 204) {
              console.log(res.data);
              setLoading(false);
              dispatch({
                type: "ADDRESS",
                payload: { ...state, hasAddress: true },
              });
              localStorage.setItem("user", JSON.stringify(state));
            }
          })
          .catch((e) => console.log(e));
        })
        .catch(e => console.log(e));
       }
       
     } else {
       console.log(error);
       setLoading(false);
     }
    };


   return (
     <div className="profile">
       <Popup open={popupOpen} handleClose={handleClose}>
         <h3>
           Please add your address before you can start using this application!
         </h3>
       </Popup>
       {loading==="init"? (
         <div className="loader" style={{height: "80vh"}}>
           <CircularProgress />
         </div>
       ) : (
         <div className="seller__container">
           <div>
             <section className="flex">
               <div>
                 <h1 className="seller__name">Hello {name}</h1>
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
               {state.isSeller && (
                 <div>
                   <h2 className="seller__membership">Membership</h2>
                   <span className={user.premiumMember? "seller__premium" : "seller__regular"}>
                     {user.premiumMember ? "Premium" : "Regular"}
                   </span>
                   <p></p>
                 </div>
               )}
             </section>
             <div className="seller">
               <h2 className="seller__head">Personal Profile</h2>
               {state.isSeller && 
               (src ? (
                 <div className="seller__logo">
                   <img src={src} alt={state.name} />
                   <label
                     className={editable ? "logo__edit-icon" : "hide"}
                     htmlFor="file-upload"
                   >
                     <EditRoundedIcon />
                   </label>
                   <input
                     type="file"
                     id="file-upload"
                     hidden
                     accept="image/*"
                     onChange={handelImageChange}
                   />
                 </div>
               ) : (
                 <>
                   <label htmlFor="file-upload">
                     <div className="image-input" id="image-upload-button">
                       <img src={camera} alt="camera icon" />
                       <span className="upload">Upload Picture</span>
                     </div>
                   </label>
                   <input type="file" id="file-upload" hidden />
                 </>
               ))}

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

                 {state.isSeller ? (
                   <div className="form-input-container">
                     <label htmlFor="category">Category</label>
                     <select
                       disabled={!editable}
                       value={cat}
                       onChange={handleCategoryChange}
                     >
                       {category.map((item) => (
                         <option key={item.id} value={item.type}>
                           {item.type}
                         </option>
                       ))}
                     </select>
                   </div>
                 ) : (
                   <div></div>
                 )}

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

                 <div className="seller__submit-container">
                   <button
                    disabled={loading==="submit"}
                     onClick={handleSubmit}
                     className="seller__button-submit"
                   >
                     Submit
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       )}
     </div>
   );
}

export default Profile;
