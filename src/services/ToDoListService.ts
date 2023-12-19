import { GetData } from "../Helpers/SessionHelper";
import { SearchCriteria, SearchFilter } from "../Types/SearchFilter";
import { ToDoItem } from "../Types/ToDoItem";


const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,PUT,DELETE,OPTIONS',
    'referrerPolicy': 'origin',
    'Authorization': `Bearer ${GetData("accessToken")}`
});


async function GetDoToItems() {
    const baseUrl = 'https://localhost:7223/api/ToDoList/GetItems/';
    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: headers
    });
    return await response;
}


async function CreateItem(item: ToDoItem) {
    const baseUrl = 'https://localhost:7223/api/ToDoList/';
    const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: headers
    });
    return await response.status;
}

async function DeleteItem(id?: string) {
    const baseUrl = 'https://localhost:7223/api/ToDoList/' + id;
    const response = await fetch(baseUrl, {
        method: 'DELETE',
        headers: headers
    });
    return await response.status;
}

async function UpdateItem(item: ToDoItem) {
    const baseUrl = 'https://localhost:7223/api/ToDoList/';
    const response = await fetch(baseUrl, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: headers
    });
    return await response.status;
}

async function GetItemById(id?: string) {
    const baseUrl = 'https://localhost:7223/api/ToDoList/GetItem/' + id;
    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: headers
    });
    return await response.json();
}

async function SearchItems(filter: SearchFilter) {
    const baseUrl = 'https://localhost:7223/api/ToDoList/Search/';
    const filterBody: SearchCriteria = {
        'filtersList': filter
    }
    const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(filterBody),
        headers: headers
    });
    return await response.json();
}

export { GetDoToItems, CreateItem, DeleteItem, UpdateItem, GetItemById, SearchItems };