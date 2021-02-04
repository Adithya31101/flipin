
//Relative Imports
import '../styles/Auth.css';

const Login = () => {
    //initialisation Variables
    /*const history = useHistory();
    const {state, dispatch} = useContext(UserContext);

    useEffect(() => {
        if(state){
            history.push('/home')
        }
        return;
    }, [state, history]);

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
            axios.post('/api/auth/login',{
                email,
                password
            })
            .then(res => {
                console.log(res.data);
                error.creds = undefined;
                localStorage.setItem("jwt",res.data.token);
                localStorage.setItem("user",JSON.stringify(res.data.user));
                dispatch({type: "USER", payload: res.data.user });
                history.push('/home');
            })
            .catch(err => {
                setError({
                    ...error,
                    creds: err.response.data.error
                });
            });
        }
    }

    const toggleShowPassword = (e) => {
        setIsPasswordHidden(prevState => {return !prevState});
    }
    */

    return (
        <div className="auth-container">
Login
        </div>
    );
}

export default Login;