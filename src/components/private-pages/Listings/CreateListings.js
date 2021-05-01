import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { CircularProgress, LinearProgress, Snackbar, Tooltip } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

//Relative Imports
import { UserContext } from '../../Interface';
import { authHeader, category } from '../../staticInfo';
import "../../../styles/CreateListings.css";
import validation from '../../../helperFunctions/validation';

const CreateListings = (props) => {
  const {state: stateFromPush} = useLocation();
  //init variables
   const history = useHistory();
   const { state } = useContext(UserContext);
   const desc = useRef();

   //State
   const [percentage, setPercentage] = useState(0);
   const [Toast, setToast] = useState({
     open: false, severity: "", text: "" 
   });
   const [cloudUrl, setCloudUrl] = useState("");
   const [src, setSrc] = useState('');
   const [image, setImage] = useState('');
   const [name, setName] = useState('');
   const [cat, setCat] = useState(category[0].type);
   const [error, setError] = useState({
      name: undefined, desc: undefined, image: undefined
   });
   const [loading, setLoading] = useState(false);

   //Use Effects
   useEffect(()=> {
      if(state.isSeller){
         history.push('/browse');
      }
      if(stateFromPush && stateFromPush.edit){
        setName(stateFromPush.name);
        desc.current.value = stateFromPush.desc;
        setSrc(stateFromPush.src);
        setCat(stateFromPush.category);
        setCloudUrl(stateFromPush.src);
      }
   }, []);

   //Components
   const Alert = (props) => {
     return <MuiAlert elevation={6} variant="filled" {...props} />;
   };

   //Handlers
   const handleCategoryChange = (e) => {
      setCat(e.target.value);
   }

   const handleToastClose = (event, reason) => {
     if (reason === "clickaway") {
       return;
     }
     setToast(prev => ({...prev, open: false}));
     history.push("/dashboard");
   };

   

   const handleImageChange = (e) => {
     error.image = undefined;
     if(e.target.files[0]){
       setImage(e.target.files[0]);
       const reader = new FileReader();
       reader.onload = () => {
         if(reader.readyState === 2){
           setSrc(reader.result);
         }
       }
       reader.readAsDataURL(e.target.files[0]);
     }
   }

  //  const handleSendRequest = (e) => {
  //    e.preventDefault();
  //    console.log(cloudUrl);
  //    axios.post("http://localhost:5000/classify", { Link: cloudUrl })
  //      .then((res) => {
  //        if(res.data.responseCode === 200 && res.data.value !== cat){
  //          setToast({
  //            open: true,
  //            severity: "error",
  //            text: "The image does not match the category! (Suggested Category: " + res.data.value + ")",
  //          })
  //        }
  //      })
  //      .catch((e) => console.error(e));
  //  }

   const handleName = (e) => {
      setName(e.target.value);
      error.name = validation.validateGeneral(e.target.value, "Product Name");
   }

   const handleSubmit = (e) => {
    e.preventDefault();
    setError(prev => ({
      ...prev,
      name: validation.validateGeneral(name, "Product Name"),
      desc: validation.validateDescription(desc.current.value),
      image: image || src? undefined :  true,
    }));
    if (validation.noError(error)) {
      setLoading(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "flipinStore");
      data.append("cloud_name", "flipin");

      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 100) {
            setPercentage(percent);
          }
        },
      };
      if(stateFromPush && stateFromPush.src === src){
        const post = {
          pid: stateFromPush.pId,
          name,
          description: desc.current.value,
          category: cat,
          mediaUrl: src,
        };
        console.log(stateFromPush);
        axios.post("https://flipin-store.herokuapp.com/editproduct.php", post, authHeader)
          .then((res) => {
            if (res.data.responseCode === 204) {
              setLoading(false);
              setToast({
                open: true,
                severity: "success",
                text: "Post Edited successfully!",
              });
            } else {
              setToast({
                open: true,
                severity: "error",
                text: "Error occured! Please try again.",
              });
            }
          })
          .catch(e => console.log(e));
        
      } else {
          axios.post("https://api.cloudinary.com/v1_1/flipin/image/upload", data, options)
          .then(({ data: {secure_url: url} }) => {
            const post = {
              name,
              description: desc.current.value,
              category: cat,
              mediaUrl: url,
            };
            axios.post("https://flipin-store.herokuapp.com/productpost.php", post, authHeader)
              .then((res) => {
                if (res.data.responseCode === 201) {
                  setName("");
                  desc.current.value = "";
                  setImage("");
                  setLoading(false);
                  
                  setToast({
                    open: true,
                    severity: "success",
                    text: "Post created successfully!",
                  });
                } else {
                  setToast({
                    open: true,
                    severity: "error",
                    text: "Error occured! Please try again.",
                  });
                }
              });
        })
        .catch((e) => console.log(e));
      }
      
    } else {
      console.log(error);
    }
   }
   return (
     <div className="create__body">
       <div className="create__card">
         <div className="create__card-title">
           <h1>Tell us what you want to purchase.</h1>
           <h4>Let sellers from all over India fulfil your product needs.</h4>
         </div>
         <form className="create__form">
           <div className="create__form-name-category">
             <div className="create__form-input" style={{ width: "48%" }}>
               <label htmlFor="name">Name of the product</label>
               <div className="create__input-warning">
                 <input
                   type="text"
                   className="create__form-name"
                   id="name"
                   onChange={handleName}
                   value={name}
                   autoComplete="off"
                 />
                 {error.name && (
                   <Tooltip title={error.name} arrow placement="right">
                     <ErrorOutlineIcon />
                   </Tooltip>
                 )}
               </div>
             </div>
             <div className="create__form-input" style={{ width: "48%" }}>
               <label htmlFor="category">Category</label>
               <select
                 onChange={handleCategoryChange}
                 id="category"
                 value={cat}
               >
                 {category.map((item) => (
                   <option key={item.id} value={item.type}>
                     {item.type}
                   </option>
                 ))}
               </select>
             </div>
           </div>
           <div className="create__form-desc create__form-input">
             <label htmlFor="description">Tell us more about the product</label>
             <textarea
               ref={desc}
               id="description"
               cols="30"
               rows="12"
             ></textarea>
             {error.desc && (
               <Tooltip title={error.desc} arrow placement="right">
                 <ErrorOutlineIcon />
               </Tooltip>
             )}
           </div>
           <div className="create__form-upload">
             <label htmlFor="create-upload" className={image || src ? "hide" : null}>
               <div className="upload-button">
                 <span>+</span> Upload File
               </div>
             </label>
             {error.image && (
               <Tooltip title="Image is required!" arrow placement="right">
                 <ErrorOutlineIcon />
               </Tooltip>
             )}
             <input
               type="file"
               id="create-upload"
               accept="image/*"
               onChange={handleImageChange}
               hidden
             />
           </div>
           <div className={(image || src) ? "image__preview" : "hide"}>
             <span>Image Preview</span>
             <div className="create__form-image">
               <img src={src} alt={name} />
               <label htmlFor="create-upload" className="edit__btn">
                 <div className="edit__btn-body">
                   <EditRoundedIcon />
                 </div>
               </label>
             </div>
           </div>
           {/* <button onClick={handleSendRequest}>Send Request</button> */}
           <Snackbar
             open={Toast.open}
             autoHideDuration={5000}
             onClose={handleToastClose}
             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
           >
             <Alert onClose={handleToastClose} severity={Toast.severity}>
               {Toast.text}
             </Alert>
           </Snackbar>
           {percentage !== 0 && percentage !== 100 && (
             <LinearProgress variant="determinate" value={percentage} />
           )}

           <div className="create__form-submit">
             {loading? 
             <div className="loader">
               <CircularProgress />
             </div>
             :
             <button onClick={handleSubmit}>Submit</button>}
           </div>
         </form>
       </div>
     </div>
   );
}

export default CreateListings;
