import * as grpcWeb from 'grpc-web';
import { FilterRequest, FilterResponse } from '@/grpc/cmsjournal/gen/citilink/cmsjournal/section/v1/section_api_pb';
import { SectionAPIPromiseClient } from '@/grpc/cmsjournal/gen/citilink/cmsjournal/section/v1/section_api_grpc_web_pb';
import { getGrpcClientWeb } from '@/grpc/client';

export type FilterRequestType = FilterRequest.AsObject;
export type FilterResponseType = FilterResponse.AsObject;

export const filterApi = async (
    params: FilterRequestType,
    metadata: grpcWeb.Metadata,
): Promise<FilterResponseType> => {
    const clientSection = getGrpcClientWeb(SectionAPIPromiseClient, '/rpc/cms-journal');

    const request = new FilterRequest();
    request.setIdsList(params.idsList);
    request.setLimit(params.limit);
    request.setOffset(params.offset);
    request.setSlugsList(params.slugsList);

    const filterResponse = await clientSection.filter(request, metadata);
    return filterResponse.toObject();
};
