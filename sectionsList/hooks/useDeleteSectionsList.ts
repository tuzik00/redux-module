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

import { DeleteRequestType } from '../api/delete';
import { deleteAction } from '../redux/actions';

import type { SectionsListStateType } from '../redux/types';

export const useDeleteSectionsList = (params: DeleteRequestType) => {
    const dispatch = useDispatch();
    const payload = useSelector(payloadSelector);
    const error = useSelector(errorSelector);
    const isPending = useSelector(isPendingSelector);

    useEffect(
        () => {
            if (payload || error || isPending) {
                return;
            }

            dispatch(deleteAction(params));
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

export const useDeleteSectionsListLazy = (): [
    (params: DeleteRequestType) => void,
    SectionsListStateType,
] => {
    const dispatch = useDispatch();
    const payload = useSelector(payloadSelector);
    const error = useSelector(errorSelector);
    const isPending = useSelector(isPendingSelector);

    const fetch = useCallback(
        (params: DeleteRequestType) => {
            dispatch(deleteAction(params));
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
