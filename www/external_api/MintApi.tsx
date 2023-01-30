import { ApiResponse } from "../models/dto/GenericDto";
import { MintFormRes, MintFormReq } from "../models/dto/MintDto";
import Api from "../utils/ApiUtils";
import { QueryConfigType } from "../../redux/common/types";
import { PageableMiniDto } from "../models/dto/PageableDto";

export const postMintForm = (req: MintFormReq) => {
    return Api.apiCall<ApiResponse<MintFormRes>>({
        method: "POST",
        data: req,
    });
};

export const getMintedNfts = (query: QueryConfigType) => {
    return Api.apiCall<PageableMiniDto<any>>({
        method: "GET",
        params: { page: query.page, size: query.size },
    });
};
