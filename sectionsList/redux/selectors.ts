import { createSelector } from 'reselect';
import { MODULE_NAME } from '../module';
import { SectionsListStateType, SectionsListStoreType } from './types';

export const stateSelector = (
    state: SectionsListStoreType,
): SectionsListStateType => state[MODULE_NAME];

export const isPendingSelector = createSelector(
    stateSelector,
    ({ isPending }) => isPending,
);

export const payloadSelector = createSelector(
    stateSelector,
    ({ payload }) => payload,
);

export const errorSelector = createSelector(
    stateSelector,
    ({ error }) => error,
);
