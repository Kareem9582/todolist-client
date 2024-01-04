/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import PermissionGate from "../../components/PermissionGate/PermissionGate";
import NoPermissionsView from "../NoPermissionsView/NoPermissionsView";
import { ToDoItem } from "../../Types/ToDoItem";
import { FormEvent, useState } from "react";
import { CreateItem } from "../../services/ToDoListService";

const CreateView = (): JSX.Element => {
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const [item, SetItem] = useState<ToDoItem>({
        title: '',
        description: ''
    });

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const result = await CreateItem(item);
        if (result === 204) {
            alert("New Item Created, Now you will be directed to Main page");
            navigate('/');
        }
        else {
            console.log(result);
            setError('Something is Wrong');
        }
    }

    return (
        <PermissionGate fallback={
            <NoPermissionsView actionText="Create To do Item"></NoPermissionsView>
        }>
            <div className='w-100 vh-100 justify-content-center align-items-center' >
                <div className='border bg-secondary text-white p-5'>
                    <form onSubmit={e=> handleFormSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='title'>Title:</label>
                            <input type='text' name='title' className='form-control' placeholder='Enter Title' required
                                onChange={e => SetItem({ ...item, title: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='description'>Description:</label>
                            <input type='text' name='description' className='form-control' placeholder='Enter Description' required
                                onChange={e => SetItem({ ...item, description: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <button className='btn btn-info'>Create</button>
                        </div>
                        <div className='mb-3' hidden={error ? false : true}>
                            <div className='alert alert-danger' role='alert'>{error}</div>
                        </div>
                    </form>
                </div>
            </div>
        </PermissionGate>
    );
}

export default CreateView;
