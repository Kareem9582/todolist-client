import { Link, useNavigate } from "react-router-dom";
import { User } from "../../Types/User";
import { FormEvent, useState } from "react";
import { UserSignUp } from "../../services/AuthenicationService";

const SignUpView = (): JSX.Element => {

    const [user, SetUser] = useState<User>({
        email: '', 
        password: '',
        userName: ''
    });

    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const result = await UserSignUp(user);
        if (result == 200) {
            alert("New User Created, Now you will be directed to login page");
            navigate('/Login');
        }
        else {
            console.log(result);
            setError('Something is Wrong');
        }
    }

    return (
        <div className='w-100 vh-100 justify-content-center align-items-center' >
            <div className='border bg-secondary text-white p-5'>
                <form onSubmit={e => handleFormSubmit(e)}>
                <div className='mb-3'>
                        <label htmlFor='userName'>User Name:</label>
                        <input type='text' name='userName' className='form-control' placeholder='Enter User Name' required
                            onChange={e => SetUser({...user, userName: e.target.value} )} />
                    </div>
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
                        <button className='btn btn-info'>Register</button>
                    </div>
                    <div className='mb-3' hidden={ error? false : true }>
                        <div className='alert alert-danger' role='alert'>{ error }</div>
                    </div>
                </form>
            </div>
            <p>Already a Member?!!  <Link to='/Login'>Login</Link></p>
        </div>
    );
}

export default SignUpView;