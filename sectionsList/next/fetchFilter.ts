import { FilterRequest } from '@/grpc/cmsjournal/gen/citilink/cmsjournal/section/v1/section_api_pb';

import type { GrpcErrorType } from '@/utils/grpcErrors';
import type { PageContextType } from '@/types/next';

import { filterAction } from '../redux/actions';

export type FilterRequestType = FilterRequest.AsObject;

export const fetchFilter = async (ctx: PageContextType, params: FilterRequestType) => {
    const {
        store,
        logger,
    } = ctx;

    try {
        await store.dispatch(filterAction(params));

        logger.info('fetch filter');
    } catch (e) {
        logger.error(
            'fetch filter fail',
            { error: (e as GrpcErrorType).message },
        );

        throw e;
    }
};
