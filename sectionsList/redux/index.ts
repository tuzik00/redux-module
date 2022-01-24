import { MODULE_NAME } from '../module';
import reducer from './reducer';

export * from './selectors';
export * from './actions';
export * from './types';

export function getReducer(): Record<string, typeof reducer> {
    return {
        [MODULE_NAME]: reducer,
    };
}
