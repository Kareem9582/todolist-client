export interface SearchFilter {
    [key: string]: string;
}

export interface SearchCriteria {
    [key: string]: SearchFilter
}