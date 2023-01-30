// @flow
import * as React from "react";
import {
    MintFormPageProps,
    MintState,
    SET_MINT_NFT_FORM_PAGE_PROPS,
    SET_MINTED_NFT_QUERY_PROPS,
    SET_MINTED_NFT,
    SET_MINTED_NFTS,
} from "./types";
import { initPageConfig } from "../../www/utils/GlobalUtils";
import { QueryConfigType, RootState } from "../common/types";
import {
    MintFormPageStatus,
    MintFormPaymentStatus,
} from "../../www/models/internal/MintInternal";
import { MintFormReq } from "../../www/models/dto/MintDto";

const initMintFormReq: MintFormReq = {
    user_name: "",
};

const initMintNftsQuery: QueryConfigType = {
    page: 0,
    size: 10,
};

const initMintFormPageProps: MintFormPageProps = {
    formReq: initMintFormReq,
    formPageStatus: MintFormPageStatus.CREATE_FORM,
    formPaymentStatus: MintFormPaymentStatus.START_WAIT,
};

const initState: MintState = {
    nft: {},
    allMintedNfts: [],
    mintedNftsById: {},
    pageConfig: initPageConfig,
    queryProps: initMintNftsQuery,
    mintFormPageProps: initMintFormPageProps,
};

export const selectNft = (state: RootState) => state.nft.nft;
export const selectNftsById = (state: RootState) => state.nft.mintedNftsById;
export const selectAllNfts = (state: RootState) => state.nft.allMintedNfts;
export const selectNftsConfig = (state: RootState) => state.nft.pageConfig;

export const selectNftQueryProps = (state: RootState) => state.nft.queryProps;
export const selectNftFormPageProps = (state: RootState) =>
    state.nft.mintFormPageProps;

export default function Reducer(state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_MINT_NFT_FORM_PAGE_PROPS:
            return { ...state, mintFormPageProps: payload.mintFormPageProps };
        case SET_MINTED_NFT_QUERY_PROPS:
            return { ...state, queryProps: payload.queryProps };
        case SET_MINTED_NFT:
            return { ...state, nft: payload.nft };
        case SET_MINTED_NFTS:
            return {
                ...state,
                allMintedNfts: payload.allMintedNfts,
                mintedNftsById: payload.mintedNftsById,
                pageConfig: payload.pageConfig,
            };
        default:
            return { ...state };
    }
}
