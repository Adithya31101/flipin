import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import axios from 'axios';

import validations from '../helperFunctions/validation';
import { UserContext } from './Interface';

// Media Imports
import { ReactComponent as Google } from '../images/google.svg';
import { ReactComponent as Facebook } from '../images/facebook.svg';

const SignUp = () => {
    const {_, dispatch} = useContext(UserContext);
    const history = useHistory();
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
        if(validations.noError(error)){
            axios.post('https://flipin-store-api.herokuapp.com/signup.php',{
                isSeller,
                name, 
                email, 
                password,
                phone,
            })
            .then(({data}) => {
                if(data.responseCode === 201){
                    //Show user that the registeration is successful and 
                    localStorage.setItem("jwt",data.jwt);
                    localStorage.setItem("user",JSON.stringify(data.user));
                    dispatch({type: "USER", payload: data.user });
                    history.push('/dashboard');
                } else {
                    //show the user an error that occured in the registeration
                    console.log(data.error);
                }
            })
            .catch(error => console.log(error));
        }
       
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
                <input className="auth__switch" type="checkbox" onChange={() => setIsSeller(prev => !prev)}/>
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
