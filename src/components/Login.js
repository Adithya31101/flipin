import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Dialog, Tooltip } from '@material-ui/core';
import { CheckCircle, ErrorOutline, Visibility, VisibilityOff} from '@material-ui/icons';

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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState({email: '', password: '', creds: ''});
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    
    //Initialising variables 
    const { _, dispatch } = useContext(UserContext);
    const history = useHistory();

    //Handler Functions
    const handleEmail = (e) => {
        setEmail(e.target.value);
        error.email = validation.validateEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        error.password = validation.isEmpty(e.target.value);
    }
    
    const handleClose = () => {
      setDialogOpen(false);
      history.push("/dashboard");
    }

    const handleLogin = () => {
        setError(prev => ({
                ...prev, 
                email: validation.validateEmail(email),
                password: validation.isEmpty(password),
            }
        ));
        if(error.email === undefined && error.password === undefined){
            axios.post('https://flipin-store-api.herokuapp.com/login.php', {
                email,
                password,
            })
            .then(({data}) => {
                if(data.responseCode === 200){
                    //Show the user that login was successful
                    error.creds = undefined;
                    localStorage.setItem("jwt",data.jwt);
                    localStorage.setItem("user",JSON.stringify(data.user));
                    dispatch({type: "USER", payload: data.user });
                    setDialogOpen(true);
                } else if(data.responseCode === 422){
                    setError({
                        ...error,
                        creds: data.error,
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            
        }
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
      <div className="auth__container" style={{ height: "90vh" }}>
        <div className="auth__card">
          <h1 className="auth__card-header">Log In</h1>
          <ThirdParty text="Continue with Google">
            <Google />
          </ThirdParty>
          <ThirdParty text="Continue with Facebook">
            <Facebook />
          </ThirdParty>
          <div className="auth__card-or">OR</div>
          <div className="auth__card-input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
            />
            {error.email && (
              <Tooltip title={error.email} arrow placement="right">
                <ErrorOutline />
              </Tooltip>
            )}
          </div>
          <div className="auth__card-input">
            <input
              type={isPasswordHidden ? "password" : "text"}
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />

            {error.password ? (
              <Tooltip title={error.password} arrow placement="right">
                <ErrorOutline />
              </Tooltip>
            ) : (
              <span
                className="eyeIcon"
                onClick={() => setIsPasswordHidden((prev) => !prev)}
              >
                {isPasswordHidden ? <Visibility /> : <VisibilityOff />}
              </span>
            )}
          </div>
          <button onClick={handleLogin} className="auth__card-submit">
            Continue
          </button>
          <Link className="auth__card-forgot" to="/forgot">
            Forgot Password?
          </Link>
          <p className="auth__card-nmy">
            Not a member yet? <Link to="/signup">Join Now</Link>
          </p>
        </div>
        <Dialog
          className="dialog-box"
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={dialogOpen}
        >
          <CheckCircle style={{ color: "#39b54a", fontSize: 60 }} />
          <h5>Logged in successfully</h5>
        </Dialog>
      </div>
    );
}

export default Login;
