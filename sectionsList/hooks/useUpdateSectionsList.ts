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

import { UpdateRequestType } from '../api/update';
import { updateAction } from '../redux/actions';

import type { SectionsListStateType } from '../redux/types';

export const useUpdateSectionsList = (params: UpdateRequestType) => {
    const dispatch = useDispatch();
    const payload = useSelector(payloadSelector);
    const error = useSelector(errorSelector);
    const isPending = useSelector(isPendingSelector);

    useEffect(
        () => {
            if (payload || error || isPending) {
                return;
            }

            dispatch(updateAction(params));
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

export const useUpdateSectionsListLazy = (): [
    (params: UpdateRequestType) => void,
    SectionsListStateType,
] => {
    const dispatch = useDispatch();
    const payload = useSelector(payloadSelector);
    const error = useSelector(errorSelector);
    const isPending = useSelector(isPendingSelector);

    const fetch = useCallback(
        (params: UpdateRequestType) => {
            dispatch(updateAction(params));
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
