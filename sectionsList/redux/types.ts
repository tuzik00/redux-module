import { FilterResponseType } from '../api/filter';

export interface SectionsListStateType {
    isPending: boolean;
    payload: FilterResponseType | null;
    error: unknown | null;
}

export interface SectionsListStoreType {
    'sectionsList': SectionsListStateType;
}
