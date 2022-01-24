import * as grpcWeb from 'grpc-web';
import { CreateRequest, CreateResponse } from '@/grpc/cmsjournal/gen/citilink/cmsjournal/section/v1/section_api_pb';
import { SectionAPIPromiseClient } from '@/grpc/cmsjournal/gen/citilink/cmsjournal/section/v1/section_api_grpc_web_pb';
import { getGrpcClientWeb } from '@/grpc/client';

export type CreateRequestType = CreateRequest.AsObject;
export type CreateResponseType = CreateResponse.AsObject;

export const createApi = async (
    params: CreateRequestType,
    metadata: grpcWeb.Metadata,
): Promise<CreateResponseType> => {
    const clientSection = getGrpcClientWeb(SectionAPIPromiseClient, '/rpc/cms-journal');

    const request = new CreateRequest();
    request.setSlug(params.slug);
    request.setTitle(params.title);

    const createResponse = await clientSection.create(request, metadata);
    return createResponse.toObject();
};
