import { useRef, useState } from 'react';
import axios from 'axios';

import contact from '../../images/contact.png';
import '../../styles/Contact.css';

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const queryRef = useRef();

    const handleInput = ({ target }) => {
        const value = target.value;
        if(target.type === "text"){
            setName(value);
        } else {
            setEmail(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://flipin-store-api.herokuapp.com/contact.php", {
          email,
          name,
          message: queryRef.current.value,
        })
        .then(({ data }) => {
            if(data.responseCode === 201){
                //Show the user that "query sent successfully, we shall reach you by email!"
                console.log(data.message);
            } else {
                console.log("error ", data.message);
            }
        })
        .catch(err => console.log(err));
    }

    return (
      <section className="container flex">
        <div className="img-container">
          <img src={contact} alt="Girl on a call" />
        </div>
        <div className="form-container">
          <h2 className="form-heading">Contact Us</h2>
          <form className="column">
            {/* TODO: Add Validation */}
            <label className="name">Name</label>
            <input className="input" type="text" onChange={handleInput} />
            <label className="name" htmlFor="email">
              Email Address
            </label>
            <input className="input" type="email" onChange={handleInput} />
            <label className="name" htmlFor="textarea">
              Query
            </label>
            <textarea res ref={queryRef} className="textarea" rows="3"></textarea>
            <button className="form-submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </section>
    );
};

export default Contact;
