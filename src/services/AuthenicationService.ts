import { Login } from "../Types/Login";
import { User } from "../Types/User";
const baseUrl = "https://localhost:7223/"

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
    'referrerPolicy': 'origin'
}

async function UserLogin(user: Login) {
    const apiUrl = new URL('/Login', baseUrl).href;
    const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: headers
    });
    return await response.json();
};

async function UserSignUp(user: User) {
    const apiUrl = new URL('/Register', baseUrl).href;
    const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: headers
    });
    return await response.status;
};

export { UserLogin, UserSignUp };