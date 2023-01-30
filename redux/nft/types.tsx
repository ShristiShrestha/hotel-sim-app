/* ============================================= */
/* API */
/* ============================================= */
import { MintFormReq } from "../../www/models/dto/MintDto";
import {
    MintFormPageStatus,
    MintFormPaymentStatus,
} from "../../www/models/internal/MintInternal";
import { PageConfigType, QueryConfigType } from "../common/types";

export const FETCH_MINTED_NFTS = "FETCH_MINTED_NFTS";
export const FETCH_MINTED_NFT = "FETCH_MINTED_NFT";

/* ============================================= */
/* Internal */
/* ============================================= */
export const SET_MINTED_NFTS = "SET_MINTED_NFTS";
export const SET_MINTED_NFT = "SET_MINTED_NFT";
export const SET_MINT_NFT_FORM_PAGE_PROPS = "SET_MINT_NFT_FORM_PAGE_PROPS";
export const SET_MINTED_NFT_QUERY_PROPS = "SET_MINTED_NFT_QUERY_PROPS";

export type AllMintedNftsType = any[];

export type MintedNftsByIdType = {
    [id: string]: any;
};

export type MintFormPageProps = {
    formReq: MintFormReq;
    formPageStatus: MintFormPageStatus;
    formPaymentStatus: MintFormPaymentStatus;
};

export type MintState = {
    nft: any;
    allMintedNfts: AllMintedNftsType;
    mintedNftsById: MintedNftsByIdType;
    pageConfig: PageConfigType;
    queryProps: QueryConfigType;
    mintFormPageProps: MintFormPageProps;
};
