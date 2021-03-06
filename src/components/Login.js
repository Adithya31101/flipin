import { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

//Relative Imports
import { UserContext } from './Interface';
import validation from '../helperFunctions/validation';
import '../styles/Auth.css';

// Media Imports
import { ReactComponent as Google } from '../images/google.svg';
import { ReactComponent as Facebook } from '../images/facebook.svg';

const Login = () => {
    //State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({email: '', password: '', creds: ''});
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    
    //Initialising variables 
    const { state, dispatch } = useContext(UserContext);

    //Handler Functions
    const handleEmail = (e) => {
        setEmail(e.target.value);
        error.email = validation.validateEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        error.password = validation.isEmpty(e.target.value);
    }
    
    const handleLogin = () => {
        setError(prev => ({
                ...prev, 
                email: validation.validateEmail(email),
                password: validation.isEmpty(password),
            }
        ));
        if(error.email === undefined && error.password === undefined){
            axios.post('loginv.php', {
                email,
                password,
            })
            .then(res => {
                console.log(res.data);
                // error.creds = undefined;
                // localStorage.setItem("jwt",res.data.token);
                // localStorage.setItem("user",JSON.stringify(res.data.user));
                // dispatch({type: "USER", payload: res.data.user });
                // history.push('/home');
            })
            .catch(err => {
                // setError({
                //     ...error,
                //     creds: err.response.data.error
                // });
                console.log(error);
            });
        } else {
            
        }
    }

    const toggleShowPassword = (e) => {
        setIsPasswordHidden(prevState => {return !prevState});
    }

    //Sub-Components
    const ThirdParty = (props) => {
        return (
            <button className="auth__card-thirdparty">
                {props.children}
                <span>{props.text}</span>
            </button>
        );
    }

    return (
        <div className="auth__container" style={{height: "90vh"}}>
            <div className="auth__card">
                <h1 className="auth__card-header">Log In</h1>
                <ThirdParty text="Continue with Google"> <Google /> </ThirdParty>
                <ThirdParty text="Continue with Facebook"> <Facebook /> </ThirdParty>
                <div className="auth__card-or">OR</div>
                <div className="auth__card-input">
                    <input type="email" placeholder="Email" value={email} onChange={handleEmail} />
                    {error.email && <Tooltip title={error.email} arrow placement="right"><ErrorOutlineIcon /></Tooltip> }
                </div>
                <div className="auth__card-input">
                    <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                    { error.password && <Tooltip title={error.password} arrow placement="right"><ErrorOutlineIcon /></Tooltip> }
                </div>
                <button onClick={handleLogin} className="auth__card-submit">Continue</button>
                <Link className="auth__card-forgot" to="/forgot">Forgot Password?</Link>
                <p className="auth__card-nmy">Not a member yet? <Link to="/signup">Join Now</Link></p>
            </div>
        </div>
    );
}

export default Login;
