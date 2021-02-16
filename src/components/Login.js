import { useState } from 'react';
import { Link } from 'react-router-dom';

//Relative Imports
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
    
    //Handler Functions
    const handleEmail = (e) => {
        setEmail(e.target.value);
        error.email = validation.validateEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if(e.target.value === ''){
            error.password = 'Password cannot be empty';
        } else {
            error.password = undefined;
        }
    }
    
    const handleLogin = () => {
        if(error.email === undefined && error.password === undefined){
            console.log({email, password})
        //     axios.post('/api/auth/login',{
        //         email,
        //         password
        //     })
        //     .then(res => {
        //         console.log(res.data);
        //         error.creds = undefined;
        //         localStorage.setItem("jwt",res.data.token);
        //         localStorage.setItem("user",JSON.stringify(res.data.user));
        //         dispatch({type: "USER", payload: res.data.user });
        //         history.push('/home');
        //     })
        //     .catch(err => {
        //         setError({
        //             ...error,
        //             creds: err.response.data.error
        //         });
        //     });
        } else console.log(error);
    }

    // const toggleShowPassword = (e) => {
    //     setIsPasswordHidden(prevState => {return !prevState});
    // }

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
                <input type="email" placeholder="Email" value={email} onChange={handleEmail} />
                <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                <button onClick={handleLogin} className="auth__card-submit">Continue</button>
                <Link className="auth__card-forgot" to="/forgot">Forgot Password?</Link>
                <p className="auth__card-nmy">Not a member yet? <Link to="/signup">Join Now</Link></p>
            </div>
        </div>
    );
}

export default Login;