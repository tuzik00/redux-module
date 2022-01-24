import { reducerWithInitialState } from 'typescript-fsa-reducers';

import {
    filterAction,
    deleteAction,
    updateAction,
    createAction,
} from './actions';

import { SectionsListStateType } from './types';

/**
 * Инициализационное состояние
 */
const initialState: SectionsListStateType = {
    isPending: false,
    payload: null,
    error: null,
};

export default reducerWithInitialState(initialState)
    .case(filterAction.async.started, (state) => ({
        ...state,
        isPending: true,
    }))
    .case(filterAction.async.done, (state, { result: payload }) => ({
        ...state,
        isPending: false,
        payload,
    }))
    .case(filterAction.async.failed, (state, { error }) => ({
        ...state,
        isPending: false,
        error,
    }))

    .case(updateAction.async.started, (state) => ({
        ...state,
        isPending: true,
    }))
    .case(updateAction.async.done, (state, { result: payload }) => ({
        ...state,
        isPending: false,
        payload: state.payload?.sectionsList ? {
            ...state.payload,
            sectionsList: state.payload?.sectionsList?.map((item) => {
                if (item.id === payload.section?.id) {
                    return {
                        ...item,
                        ...payload.section,
                    };
                }

                return {
                    ...item,
                    isMain: false,
                };
            }) || [],
        } : null,
    }))
    .case(updateAction.async.failed, (state, { error }) => ({
        ...state,
        isPending: false,
        error,
    }))

    .case(deleteAction.async.started, (state) => ({
        ...state,
        isPending: true,
    }))
    .case(deleteAction.async.done, (state, { params }) => ({
        ...state,
        isPending: false,
        payload: state.payload?.sectionsList ? {
            ...state.payload,
            sectionsList: state.payload?.sectionsList?.filter((item) => (
                !params.idsList.includes(item.id)
            )) || [],
        } : null,
    }))
    .case(deleteAction.async.failed, (state, { error }) => ({
        ...state,
        isPending: false,
        error,
    }))

    .case(createAction.async.started, (state) => ({
        ...state,
        isPending: true,
    }))
    .case(createAction.async.done, (state, { result: payload }) => ({
        ...state,
        isPending: false,
        payload: state.payload?.sectionsList ? {
            ...state.payload,
            sectionsList: payload.section ? [
                payload.section,
                ...state.payload.sectionsList,
            ] : state.payload.sectionsList,
        } : null,
    }))
    .case(createAction.async.failed, (state, { error }) => ({
        ...state,
        isPending: false,
        error,
    }));
