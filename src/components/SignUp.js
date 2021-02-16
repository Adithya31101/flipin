import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import validations from '../helperFunctions/validation';

// Media Imports
import { ReactComponent as Google } from '../images/google.svg';
import { ReactComponent as Facebook } from '../images/facebook.svg';

const SignUp = () => {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        name: "", email: "", password: "", retype: ""
    });
    const retypePassword = useRef();

    // Handler Functions
    const handleName = (e) => {
        setName(e.target.value);
        error.name = validations.validateName(e.target.value)
    }
    
    const handleEmail = (e) => {
        setEmail(e.target.value);
        error.email = validations.validateEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        error.password = validations.validatePassword(e.target.value)
    }
     
    const handleSubmit = (e) => {
        console.log(retypePassword.current.value);
        e.preventDefault();
        //Error: need to reset the password error string
        if(validations.noError(error) && retypePassword.current.value === password){
            console.log({name, email, password})
        } else {
            error.retype = "Passwords don't match!";
            console.log(error);
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
        <div className="auth__container" style={{height: "120vh"}}>
            <div className="auth__card">
                <h1 className="auth__card-header">Sign Up</h1>
                <ThirdParty text="Continue with Google"> <Google /> </ThirdParty>
                <ThirdParty text="Continue with Facebook"> <Facebook /> </ThirdParty>
                <div className="auth__card-or">OR</div>
                <input type="text" placeholder="Name" value={name} onChange={handleName} />
                <input type="email" placeholder="Email" value={email} onChange={handleEmail} />
                <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                <input ref={retypePassword} type="password" placeholder="Password" />
                <button onClick={handleSubmit} className="auth__card-submit">Continue</button>
                <p className="auth__card-nmy">Already a member? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    );
}

export default SignUp;
