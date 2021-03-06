import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import validations from '../helperFunctions/validation';

// Media Imports
import { ReactComponent as Google } from '../images/google.svg';
import { ReactComponent as Facebook } from '../images/facebook.svg';

const SignUp = () => {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isSeller, setIsSeller] = useState(false);
    const [error, setError] = useState({
        name: "", email: "", password: "", phone: ""
    });

    // Handler Functions
    const handleName = (e) => {
        setName(e.target.value);
        error.name = validations.validateName(e.target.value);
    }
    
    const handleEmail = (e) => {
        setEmail(e.target.value);
        error.email = validations.validateEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        error.password = validations.validatePassword(e.target.value);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
        error.phone = validations.validatePhone(e.target.value);
    }
     
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            name, 
            email, 
            password,
            phone,
        })
       
    }

    // const toggleShowPassword = (e) => {
    //     setIsPasswordHidden(prevState => {return !prevState});
    // }

    // Sub Components
    const ThirdParty = (props) => {
        return (
            <button className="auth__card-thirdparty">
                {props.children}
                <span>{props.text}</span>
            </button>
        );
    }

    return (
        <div className="auth__container" style={{height: "100vh"}}>
            <div className="auth__card">
                <h1 className="auth__card-header">Sign Up</h1>
                <ThirdParty text="Continue with Google"> <Google /> </ThirdParty>
                <ThirdParty text="Continue with Facebook"> <Facebook /> </ThirdParty>
                <div className="auth__card-or">OR</div>
                <input className="auth__switch" type="checkbox" />
                <div className="auth__card-input">
                    <input type="text" placeholder="Name" value={name} onChange={handleName} />
                    { error.name && <Tooltip title={error.name} arrow placement="right"><ErrorOutlineIcon /></Tooltip> }
                </div>
                <div className="auth__card-input">
                    <input type="email" placeholder="Email" value={email} onChange={handleEmail} />
                    { error.email && <Tooltip title={error.email} arrow placement="right"><ErrorOutlineIcon /></Tooltip> }
                </div>
                <div className="auth__card-input">
                    <input type="text" placeholder="Phone" value={phone} onChange={handlePhone} />
                    { error.phone && <Tooltip title={error.phone} arrow placement="right"><ErrorOutlineIcon /></Tooltip> }
                </div>
                <div className="auth__card-input">
                    <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                    { error.password && <Tooltip title={error.password} arrow placement="right"><ErrorOutlineIcon /></Tooltip> }
                </div>
                <button onClick={handleSubmit} className="auth__card-submit">Continue</button>
                <p className="auth__card-nmy">Already a member? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    );
}

export default SignUp;
