import * as grpcWeb from 'grpc-web';
import { DeleteRequest, DeleteResponse } from '@/grpc/cmsjournal/gen/citilink/cmsjournal/section/v1/section_api_pb';
import { SectionAPIPromiseClient } from '@/grpc/cmsjournal/gen/citilink/cmsjournal/section/v1/section_api_grpc_web_pb';

import { getGrpcClientWeb } from '@/grpc/client';

export type DeleteRequestType = DeleteRequest.AsObject;
export type DeleteResponseType = DeleteResponse.AsObject;

export const deleteApi = async (
    params: DeleteRequestType,
    metadata: grpcWeb.Metadata,
): Promise<DeleteResponseType> => {
    const clientSection = getGrpcClientWeb(SectionAPIPromiseClient, '/rpc/cms-journal');

    const request = new DeleteRequest();
    request.setIdsList(params.idsList);

    const deleteResponse = await clientSection.delete(request, metadata);
    return deleteResponse.toObject();
};
