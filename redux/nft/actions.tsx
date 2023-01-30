import {
    MyThunkDispatch,
    PageConfigType,
    QueryConfigType,
} from "../common/types";
import { actionFailure, actionStart, actionSuccess } from "../common/actions";
import {
    AllMintedNftsType,
    FETCH_MINTED_NFTS,
    MintedNftsByIdType,
    SET_MINT_NFT_FORM_PAGE_PROPS,
    SET_MINTED_NFT_QUERY_PROPS,
    SET_MINTED_NFT,
    SET_MINTED_NFTS,
} from "./types";
import { getMintedNfts } from "../../www/external_api/MintApi";
import { PageableMiniDto } from "../../www/models/dto/PageableDto";
import { convertMiniPaginationToClientPaginationConfig } from "../../www/utils/PaginationUtils";

/* ============================================= */
/* Internal */
/* ============================================= */

export const convertPagedNftsIntoClientSideData = (
    nfts: PageableMiniDto<any>,
) => {
    const byId: MintedNftsByIdType = {};
    const allIds: AllMintedNftsType = [];
    const config = convertMiniPaginationToClientPaginationConfig(nfts);
    const content = nfts.data;
    for (let i = 0; i < content.length; i++) {
        const contentItem = content[i];
        const contentItemId = contentItem.uuid;
        byId[contentItemId] = contentItem;
        allIds.push(contentItemId);
    }
    return { byId, allIds, config };
};

export const setMintedNfts = (
    nftsById: MintedNftsByIdType,
    allNfts: AllMintedNftsType,
    pageConfig: PageConfigType,
) => {
    return (dispatch: MyThunkDispatch) => {
        dispatch({
            type: SET_MINTED_NFTS,
            payload: {
                allNfts: allNfts,
                nftsById: nftsById,
                pageConfig: pageConfig,
            },
        });
    };
};

export const setMintedNft = (nft: any) => {
    return (dispatch: MyThunkDispatch) => {
        dispatch({
            type: SET_MINTED_NFT,
            payload: {
                nft: nft,
            },
        });
    };
};

export const setMintNftFormPageProps = mintFormPageProps => {
    return (dispatch: MyThunkDispatch) => {
        dispatch({
            type: SET_MINT_NFT_FORM_PAGE_PROPS,
            payload: {
                mintFormPageProps: mintFormPageProps,
            },
        });
    };
};

export const setMintedNftQueryProps = queryProps => {
    return (dispatch: MyThunkDispatch) => {
        dispatch({
            type: SET_MINTED_NFT_QUERY_PROPS,
            payload: {
                queryProps: queryProps,
            },
        });
    };
};

/* ============================================= */
/* API */
/* ============================================= */

export const fetchMintedNfts = (query: QueryConfigType) => {
    return dispatch => {
        dispatch(actionStart(FETCH_MINTED_NFTS));
        const apiCall = getMintedNfts(query);
        apiCall
            .then(res => {
                const { byId, allIds, config } =
                    convertPagedNftsIntoClientSideData(res);
                dispatch(setMintedNfts(byId, allIds, config));
                dispatch(actionSuccess(FETCH_MINTED_NFTS, res));
            })
            .catch(e => {
                dispatch(actionFailure(FETCH_MINTED_NFTS, e));
            });
        return apiCall;
    };
};

export const fetchMintedNft = (uuid: string) => {};
