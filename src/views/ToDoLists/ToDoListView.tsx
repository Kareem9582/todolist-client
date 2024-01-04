import { FormEvent, useEffect, useState } from 'react';
import PermissionGate from '../../components/PermissionGate/PermissionGate';
import NoPermissionsView from '../NoPermissionsView/NoPermissionsView';
import { GetDoToItems, SearchItems } from '../../services/ToDoListService';
import { ToDoItem } from '../../Types/ToDoItem';
import { Link } from 'react-router-dom';
import FormatDate from '../../Helpers/DateHelper';
import { SearchFilter } from '../../Types/SearchFilter';
import SignOutView from '../Membership/SignOutView';
import { useViewport } from '../../hooks/useViewport';
import DataTableColumn from '../../components/DataTableColumn';
import React from 'react';



const ToDoListView = (): JSX.Element => {
    const {viewportWidth} = useViewport();
    const [items, setItems] = useState<ToDoItem[]>();
    const [filter, setFilter] = useState<SearchFilter>({
        title: '',
        description: '',
        completionDate:''
    });


    function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        SearchData();
    }

    useEffect(() => {
        GetData();
    }, []);

    const contents = items === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. Taking long time try to <SignOutView></SignOutView> and login again </em></p>

        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Title</th>
                    { IsDesktopSize() && (
                        <React.Fragment>
                            <th>Description</th>
                            <th>Is Completed</th>
                            <th>Completion Date</th>
                        </React.Fragment>      
                    )}
                    <th></th>
                </tr>
            </thead>
            <tbody>
            
                <tr>
                    
                    <DataTableColumn name='title' placeholder='Enter Title' action={e=> setFilter({ ...filter, 'title': e.target.value })}/>
                    { IsDesktopSize() && (
                        <React.Fragment>
                            <DataTableColumn name='Description' placeholder='Enter Description' action={e => setFilter({ ...filter, 'description': e.target.value })}/>
                            <td></td>
                            <td><input type='date' name='completionDate' className='form-control' placeholder='Enter Description' 
                        onChange={e => setFilter({ ...filter, 'completionDate': e.target.value })}/></td>
                        </React.Fragment>)
                    }

                    <td>
                        <form onSubmit={handleFormSubmit}>
                            <button className='btn btn-info'>Search</button>
                        </form>
                        
                    </td>
                </tr>
                {items.map(item =>
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        { IsDesktopSize() && (
                            <React.Fragment>
                                <td>{item.description}</td>
                                <td>{item.isCompleted? 'Yes' : 'No'}</td>
                                <td>{FormatDate(item.completionDate)}</td>
                            </React.Fragment>)
                        }
                        <td>
                            <Link to={`/Delete/${item.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                            </Link>
                            <Link to={`/Update/${item.id}`} className='mx-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor"
                                    className="bi bi-pen" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                </svg>
                            </Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <PermissionGate fallback={
            <NoPermissionsView actionText="List items"></NoPermissionsView>
        }>
            <div className='container'>
                <div className='d-flex'>
                    <Link to='/Create' className='btn btn-info'>Create</Link>
                </div>
            </div>
            <div>
                <h1 id="tabelLabel">To Do List</h1>
                {contents}
            </div>
        </PermissionGate>
    );

    async function GetData() {
        const response = await GetDoToItems();
        const data = await response;
        if(response.status === 200){
            setItems(await data.json());
        }
    }

    async function SearchData() {
        const response = await SearchItems(filter);
        const data = await response;
        setItems(data);
    }

    function IsDesktopSize(): boolean{
        return viewportWidth >= 1024;
    }
}


export default ToDoListView;




