export default function FormatDate(stringDate? : string) {
    const date = ConvertToDate(stringDate);
    return ('0' + date.getDate()).slice(-2)
        + '/'
        + ('0' + (date.getMonth() + 1)).slice(-2)
        + '/'
        + ('000' + (date.getFullYear())).slice(-4);
}

export function FormatDateInput(stringDate?: string) {
    const date = ConvertToDate(stringDate);
    return ('000' + (date.getFullYear())).slice(-4)
        + '-'
        + ('0' + (date.getMonth() + 1)).slice(-2)
        + '-'
        + ('0' + date.getDate()).slice(-2);
}

export function ConvertToDate(stringDate?: string) : Date{
    const date = new Date(stringDate ? stringDate : Date.now.toString());
    return date;
}
