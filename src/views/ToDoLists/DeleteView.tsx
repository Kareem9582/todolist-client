import { FormEvent, useEffect, useState } from "react";
import PermissionGate from "../../components/PermissionGate/PermissionGate"
import NoPermissionsView from "../NoPermissionsView/NoPermissionsView"
import { useNavigate, useParams } from "react-router-dom";
import { ToDoItem } from "../../Types/ToDoItem";
import { DeleteItem, GetItemById } from "../../services/ToDoListService";
import FormatDate from "../../Helpers/DateHelper";



const DeleteView = (): JSX.Element => {
    const { id } = useParams();
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const [item, setItems] = useState<ToDoItem>({
        title: '',
        description: '',
        completionDate: '',
        isCompleted: false
    });

    useEffect(() => {
        GetData(id);
    }, [id]);


    

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
       e.preventDefault();
        const result = await DeleteItem(item.id);
        if (result == 202) {
            alert("Item Deleted, Now you will be directed to Main page");
            navigate('/');
        }
        else {
            setError('Something is Wrong');
        }
    }

    return (
        <PermissionGate fallback={
            <NoPermissionsView actionText="Create To do Item"></NoPermissionsView>
        }>
            <h1 id="tabelLabel">Are you sure you want to delete?</h1>
            <div className='w-100 vh-100 justify-content-center align-items-center' >
                <div className='border bg-secondary text-white p-5'>
                    <form onSubmit={e => handleFormSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='title'>Title:</label>
                            <input type='text' name='title' className='form-control' placeholder='Enter Title' disabled value={ item.title } />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='description'>Description:</label>
                            <input type='text' name='description' className='form-control' placeholder='Enter Description' disabled value={item.description} />
                        </div>
                        <div className='form-check d-flex'>
                            <input type='checkbox' name='isComplete' className='form-check-input' readOnly checked={item.isCompleted} disabled />
                            <label className='form-check-label' htmlFor='isComplete'>Is Complete:</label>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='completionDate'>Completion Date:</label>
                            <input type='text' name='completionDate' className='form-control' placeholder='Enter Description' disabled value={FormatDate(item.completionDate) } />
                        </div>
                        <div className='mb-3'>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                        <div className='mb-3' hidden={error ? false : true}>
                            <div className='alert alert-danger' role='alert'>{error}</div>
                        </div>
                    </form>
                </div>
            </div>
        </PermissionGate>
    );

    async function GetData(id? : string) {
        const response = await GetItemById(id);
        const data = await response;
        setItems(data);

    }
};

export default DeleteView;