import { Link } from 'react-router-dom';

type Props = {
    actionText: string;
};

/**
 * Helper view to display when a user has insufficient permissions to view a certain page/area of the portal.
 * @param [actionText] The HTML that is passed in to define the action/feature that the user does not have permission for. (To create a comment).
 * @constructor
 */
const NoPermissionsView = ({ actionText }: Props): JSX.Element => (
    <div>
        <div className="d-flex flex-column align-items-center">

            <p className="mt-2 font-sm text-uppercase mb-0">
                You have <strong>insufficient permissions</strong> to 
                <span>
                        <strong>{actionText}</strong>
                </span>
            </p>
            <p><Link to='/Login' className = 'btn btn-success my-3'>Login</Link></p>
        </div>
    </div>
);

export default NoPermissionsView;