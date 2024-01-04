import { ChangeEvent } from 'react';

type Props = {
    name: string;
    placeholder: string;
    action: (e : any) => void ;
};

/**
 
 * @param props.name Name of the field
 * @param props.placeholder the place holder
 * @param props.action action will happend in change event 
 * @constructor
 */
const DataTableColumn = (props: Props): JSX.Element  => {
    const { name, placeholder , action} = props;
    return(<td>
                <input type='text' name= {name} className='form-control' placeholder={placeholder} 
                onChange={ action} />
            </td>);
}

export default DataTableColumn;