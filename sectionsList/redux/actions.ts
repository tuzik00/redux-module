import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { MODULE_NAME } from '../module';

import {
    FilterRequestType,
    FilterResponseType,
    filterApi,
} from '../api/filter';

import {
    DeleteRequestType,
    DeleteResponseType,
    deleteApi,
} from '../api/delete';

import {
    UpdateRequestType,
    UpdateResponseType,
    updateApi,
} from '../api/update';

import {
    CreateRequestType,
    CreateResponseType,
    createApi,
} from '../api/create';

const create = actionCreatorFactory(MODULE_NAME);
const createAsync = asyncFactory(create);

export const filterAction = createAsync<FilterRequestType, FilterResponseType>(
    'FILTER',
    (params) => filterApi(params, {}),
);

export const deleteAction = createAsync<DeleteRequestType, DeleteResponseType>(
    'DELETE',
    (params) => deleteApi(params, {}),
);

export const updateAction = createAsync<UpdateRequestType, UpdateResponseType>(
    'UPDATE',
    (params) => updateApi(params, {}),
);

export const createAction = createAsync<CreateRequestType, CreateResponseType>(
    'CREATE',
    (params) => createApi(params, {}),
);
