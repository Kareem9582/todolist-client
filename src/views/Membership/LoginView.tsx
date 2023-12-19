import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../Types/Login";
import { FormEvent, useState } from "react";
import { UserLogin } from "../../services/AuthenicationService";
import { useSessionStorage } from '../../hooks/useStorage';

const LoginView = (): JSX.Element => {

    const [user, SetUser] = useState<Login>({
        email: '', 
        password: ''
    });
    const { updateStorage } = useSessionStorage('accessToken', '');
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await UserLogin(user);
        if ("tokenType" in result) {
            updateStorage(result['accessToken']);
            navigate('/');
        }
        else {
            console.log(result);
            setError('Invalid Email or Password');
        }

    }

    return (
        <div className='w-100 vh-100 justify-content-center align-items-center' >
            <div className='border bg-secondary text-white p-5'>
                <form onSubmit ={ handleFormSubmit }>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email:</label>
                        <input type='text' name='email' className='form-control' placeholder='Enter Email' required
                            onChange={e => SetUser({...user, email: e.target.value} )} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' name='password' className='form-control' placeholder='Enter Password' required
                            onChange={e => SetUser({ ...user, password: e.target.value })} /> 
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-info'>Login</button>
                    </div>
                    <div className='mb-3' hidden={ error? false : true }>
                        <div className='alert alert-danger' role='alert'>{ error }</div>
                    </div>
                </form>
            </div>
            <p>Not a Member?!!  <Link to='/SignUp'>Sign Up</Link></p>
        </div>
    );
}

export default LoginView;