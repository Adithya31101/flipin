import { useRef, useState } from 'react';
import axios from 'axios';
import MuiAlert from "@material-ui/lab/Alert";
import contact from '../../images/contact.png';
import '../../styles/Contact.css';
import { CircularProgress, Snackbar, Tooltip } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';
import validation from '../../helperFunctions/validation';

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState({
      name: undefined, email: undefined, query: undefined
    });
    const [Toast, setToast] = useState({
     open: false, severity: "", text: "" 
   });
    const [loading, setLoading] = useState(false);
    const queryRef = useRef();

    const handleInput = ({ target }) => {
        const value = target.value;
        if(target.type === "text"){
            setName(value);
            error.name = validation.validateName(target.value);
        } else {
            setEmail(value);
            error.email = validation.validateEmail(target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validation.noError(error)){
          setLoading(true);
          axios.post("https://flipin-store.herokuapp.com/contact.php", {
            email,
            name,
            message: queryRef.current.value,
          })
          .then(({ data }) => {
            setError({
              name: validation.validateName(name),
              error: validation.validateEmail(email),
              query: validation.validateGeneral(queryRef.current.value, "Query")
            })
              if(data.responseCode === 201){
                  setLoading(false);
                  setToast({
                    open: true,
                    severity: "success",
                    text: "Message sent successfully!",
                  });
                  setName("");
                  setEmail("");
                  queryRef.current.value = "";
              } else {
                  setLoading(false);
                  setToast({
                    open: true,
                    severity: "error",
                    text: "Error in sending message :(",
                  });
              }
          })
          .catch(err => console.log(err));
        }
    }

       const handleToastClose = (event, reason) => {
         if (reason === "clickaway") {
           return;
         }
         setToast((prev) => ({ ...prev, open: false }));
       };


    const Alert = (props) => {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    return (
      <section className="container flex">
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
        <div className="img-container">
          <img src={contact} alt="Girl on a call" />
        </div>
        <div className="form-container">
          <h2 className="form-heading">Contact Us</h2>
          <form className="column">
            {/* TODO: Add Validation */}
            <label className="name">Name</label>
            <div className="input__container">
              <input className="input" type="text" onChange={handleInput} value={name}/>
              {error.name && (
                <Tooltip title={error.name} arrow placement="right">
                  <ErrorOutline />
                </Tooltip>
              )}
            </div>
            <label className="name" htmlFor="email">
              Email Address
            </label>
            <div className="input__container">
              <input className="input" value={email} type="email" onChange={handleInput} />
              {error.email && (
                <Tooltip title={error.email} arrow placement="right">
                  <ErrorOutline />
                </Tooltip>
              )}
            </div>
            <label className="name" htmlFor="textarea">
              Query
            </label>
            <div className="input__container">
              <textarea ref={queryRef} className="textarea" rows="3"></textarea>
              {error.query && (
                <Tooltip title={error.query} arrow placement="right">
                  <ErrorOutline />
                </Tooltip>
              )}
            </div>
            {!loading ? (
              <button className="form-submit" onClick={handleSubmit}>
                Submit
              </button>
            ) : (
              <div className="flex-center" style={{width: "400px"}}>
                <CircularProgress />
              </div>
            )}
          </form>
        </div>
      </section>
    );
};

export default Contact;
