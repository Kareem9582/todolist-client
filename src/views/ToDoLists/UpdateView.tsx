import { FormEvent, useEffect, useState } from "react";
import PermissionGate from "../../components/PermissionGate/PermissionGate"
import NoPermissionsView from "../NoPermissionsView/NoPermissionsView"
import { useNavigate, useParams } from "react-router-dom";
import { ToDoItem } from "../../Types/ToDoItem";
import { GetItemById, UpdateItem } from "../../services/ToDoListService";
import { FormatDateInput } from "../../Helpers/DateHelper";



const UpdateView = (): JSX.Element => {
    const { id } = useParams();
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const [item, setItem] = useState<ToDoItem>({
        title: '',
        description: '',
        completionDate: '',
        isCompleted: false, 
        id:''
    });

    useEffect(() => {
        GetData(id);
    }, [id]);

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const result = await UpdateItem(item);
        if (result === 202) {
            alert("Item Updated, Now you will be directed to Main page");
            navigate('/');
        }
        else {
            console.log(result);
            setError('Something is Wrong');
        }
    }

    return (
        <PermissionGate fallback={
            <NoPermissionsView actionText="Update ToDo Item"></NoPermissionsView>
        }>
            <h1 id="tabelLabel">Are you sure you want to delete?</h1>
            <div className='w-100 vh-100 justify-content-center align-items-center' >
                <div className='border bg-secondary text-white p-5'>
                    <form onSubmit={handleFormSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='title'>Title:</label>
                            <input type='text' name='title' className='form-control' placeholder='Enter Title' value={item.title}
                                onChange={e => setItem({ ...item, title: e.target.value })}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='description'>Description:</label>
                            <input type='text' name='description' className='form-control' placeholder='Enter Description' value={item.description}
                                onChange={e => setItem({ ...item, description: e.target.value })}/>
                        </div>
                        <div className='form-check d-flex'>
                            <input type='checkbox' name='isComplete' className='form-check-input' checked={item.isCompleted}
                                onChange={e => setItem({ ...item, isCompleted: e.target.checked })}/>
                            <label className='form-check-label' htmlFor='isComplete'>Is Complete:</label>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='completionDate'>Completion Date:</label>
                            <input type='date' name='completionDate' className='form-control' placeholder='Enter Description' value={FormatDateInput(item.completionDate)}
                                onChange={e => setItem({ ...item, completionDate: e.target.value })}/>
                        </div>
                        <div className='mb-3'>
                            <button className='btn btn-danger'>Update</button>
                        </div>
                        <div className='mb-3' hidden={error ? false : true}>
                            <div className='alert alert-danger' role='alert'>{error}</div>
                        </div>
                    </form>
                </div>
            </div>
        </PermissionGate>
    );

    async function GetData(id?: string) {
        const response = await GetItemById(id);
        const data = await response;
        setItem(data);

    }
};

export default UpdateView;