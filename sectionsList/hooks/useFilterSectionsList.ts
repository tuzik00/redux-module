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

import { FilterRequestType } from '../api/filter';
import { filterAction } from '../redux/actions';

import type { SectionsListStateType } from '../redux/types';

export const useFilterSectionsList = (params: FilterRequestType) => {
    const dispatch = useDispatch();
    const payload = useSelector(payloadSelector);
    const error = useSelector(errorSelector);
    const isPending = useSelector(isPendingSelector);

    useEffect(
        () => {
            if (payload || error || isPending) {
                return;
            }

            dispatch(filterAction(params));
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

export const useSectionsListLazy = (): [
    (params: FilterRequestType) => void,
    SectionsListStateType,
] => {
    const dispatch = useDispatch();
    const payload = useSelector(payloadSelector);
    const error = useSelector(errorSelector);
    const isPending = useSelector(isPendingSelector);

    const fetch = useCallback(
        (params: FilterRequestType) => {
            dispatch(filterAction(params));
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
