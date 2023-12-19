import { ReactNode } from 'react';
import { useSessionStorage } from '../../hooks/useStorage';

type Props = {
    fallback?: JSX.Element | null;
    children: ReactNode;
};

/**
 * A gate component that determines if a user has the correct permissions to view all nested children elements. If the user does not possess the correct permissions then they will be displayed the fallback component.
 * @param props.fallback A fallback component to render for this view if the user doesn't possess the necessary roles to view it. Defaults to null, a component such as: <Redirect /> can be used to redirect the user to another page.
 * @param props.children The children components to render if the user possesses the correct permissions.
 * @constructor
 */
const PermissionGate = (props: Props): JSX.Element | null => {
    const { fallback = null, children} = props;
    const { getStorage } = useSessionStorage('accessToken', '');
    // Use a selector to listen for changes to the given permission. but we need ot apply the roles first which outside scope of this demo I will keep the line anyway in case we need to discuss it
    // const hasPermission: boolean = useParamSelector(getPermissionFeatureByKey, permission);
    const hasPermission: string = getStorage();
    return hasPermission ? <>{children}</> : <>{fallback}</>;
};

export default PermissionGate;