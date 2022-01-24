import {
    useEffect,
    useCallback,
} from 'react';

import {
    useDispatch,
    useSelector,
} from 'react-redux';

import {
    payloadSelector,
    errorSelector,
    isPendingSelector,
} from '../redux/selectors';

import { CreateRequestType } from '../api/create';
import { createAction } from '../redux/actions';

import type { SectionsListStateType } from '../redux/types';

export const useCreateSectionsList = (params: CreateRequestType) => {
    const dispatch = useDispatch();
    const payload = useSelector(payloadSelector);
    const error = useSelector(errorSelector);
    const isPending = useSelector(isPendingSelector);

    useEffect(
        () => {
            if (payload || error || isPending) {
                return;
            }

            dispatch(createAction(params));
        },
        [
            dispatch,
            error,
            isPending,
            params,
            payload,
        ],
    );

    return {
        payload,
        error,
        isPending,
    };
};

export const useCreateSectionsListLazy = (): [
    (params: CreateRequestType) => void,
    SectionsListStateType,
] => {
    const dispatch = useDispatch();
    const payload = useSelector(payloadSelector);
    const error = useSelector(errorSelector);
    const isPending = useSelector(isPendingSelector);

    const fetch = useCallback(
        (params: CreateRequestType) => {
            dispatch(createAction(params));
        },
        [
            dispatch,
        ],
    );

    return [
        fetch,
        {
            payload,
            error,
            isPending,
        },
    ];
};
