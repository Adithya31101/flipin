import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useHistory, Link } from 'react-router-dom';
// import { UserContext } from './Interface';
//Import pages of the form
// import validations from '../helperFunctions/validation';

const SignUp = () => {
    /*//Variable Initialisations
    const history = useHistory();
    const {state} = useContext(UserContext);

    //On page load
    useEffect(() => {
        if(state){
            history.push('/home')
        }
        return;
    }, [state, history]);

    //State 
    const [name, setName] = useState(""); 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [error, setError] = useState({
        name: "", username: "", email: "", password: ""
    });

    // Handler Functions
    const handleName = (e) => {
        setName(e.target.value);
        error.name = validations.validateName(e.target.value)
    }
    
    const handleUsername = (e) => {
        setUsername(e.target.value);
        error.username = validations.validateUsername(e.target.value)
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
        setIsSubmitting(true);
        e.preventDefault();
        if(validations.noError(error)){
                const user = {
                    name,
                    username,
                    email,
                    password
                } 
                axios.post('/api/auth/signup', user)
                .then(res => {
                    history.push('/login');
                })
                .catch(err => {
                    if(err.response.data){
                        setError(err.response.data.error);
                        setIsSubmitting(false);
                    }
                })
        } else {
            setIsSubmitting(false);
        }
       
    }

    const toggleShowPassword = (e) => {
        setIsPasswordHidden(prevState => {return !prevState});
    }

    const responseGoogle = (response) => {
        console.log(response);
    }
    */

    return (
        <div>
            Signin
        </div>
    );
}

export default SignUp;
