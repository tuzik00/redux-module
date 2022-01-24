import * as grpcWeb from 'grpc-web';
import * as pbWrappers from 'google-protobuf/google/protobuf/wrappers_pb';

import { UpdateRequest, UpdateResponse } from '@/grpc/cmsjournal/gen/citilink/cmsjournal/section/v1/section_api_pb';
import { SectionAPIPromiseClient } from '@/grpc/cmsjournal/gen/citilink/cmsjournal/section/v1/section_api_grpc_web_pb';
import { getGrpcClientWeb } from '@/grpc/client';

export type UpdateRequestType = Omit<UpdateRequest.AsObject, 'isMain' | 'title' | 'isVisible' | 'slug' | 'seoTitle' | 'seoDescription'> & {
    isMain?: boolean;
    title?: string;
    isVisible?: boolean;
    slug?: string;
    seoTitle?: string;
    seoDescription?: string;
};

export type UpdateResponseType = UpdateResponse.AsObject;

export const updateApi = async (
    params: UpdateRequestType,
    metadata: grpcWeb.Metadata,
): Promise<UpdateResponseType> => {
    const clientSection = getGrpcClientWeb(SectionAPIPromiseClient, '/rpc/cms-journal');

    const request = new UpdateRequest();
    request.setId(params.id);

    if (params?.title) {
        const titleValue = new pbWrappers.StringValue();
        titleValue.setValue(params.title);
        request.setTitle(titleValue);
    }

    if (params?.slug) {
        const slugValue = new pbWrappers.StringValue();
        slugValue.setValue(params.slug);
        request.setSlug(slugValue);
    }

    if (params?.seoTitle) {
        const seoTitleValue = new pbWrappers.StringValue();
        seoTitleValue.setValue(params.seoTitle);
        request.setSlug(seoTitleValue);
    }

    if (params?.seoDescription) {
        const seoDescriptionValue = new pbWrappers.StringValue();
        seoDescriptionValue.setValue(params.seoDescription);
        request.setSlug(seoDescriptionValue);
    }

    if (params?.isMain) {
        const isVisibleValue = new pbWrappers.BoolValue();
        isVisibleValue.setValue(params.isMain);
        request.setIsMain(isVisibleValue);
    }

    if (params?.isVisible) {
        const isVisibleValue = new pbWrappers.BoolValue();
        isVisibleValue.setValue(params.isVisible);
        request.setIsVisible(isVisibleValue);
    }

    const updateResponse = await clientSection.update(request, metadata);
    return updateResponse.toObject();
};
