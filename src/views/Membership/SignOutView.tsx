import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import { useSessionStorage } from "../../hooks/useStorage";

const SignOutView = (): JSX.Element => {

    const { deleteStorage } = useSessionStorage('accessToken', '');
    const navigate = useNavigate();

    function HandleLinkClick(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void {
        e.preventDefault();
        deleteStorage();
        navigate("/Login");
    }

    return (
        <button onClick={e => HandleLinkClick(e)} className="btn btn-link">Sign Out</button>
    );
}

export default SignOutView;