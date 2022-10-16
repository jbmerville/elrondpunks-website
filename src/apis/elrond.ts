/* eslint-disable @typescript-eslint/no-explicit-any */
import { NFTType } from 'values';
import { getNFTType } from 'helper';

import _ from 'underscore';
import axios from 'axios';
import config from 'config';
import { getNftStats } from './firebase';
import moment from 'moment';

const { blockchain } = config;
const { elrondConfig, tokenIdentifier } = blockchain;

export const getNftsForAddress = async (address: string, size?: boolean): Promise<number[]> => {
  let request = `${elrondConfig.apiAddress}/accounts/${address}/nfts?collection=${tokenIdentifier}`;
  if (size) request += '&size=3000';
  const response: { data: any[] } = await axios.get(request);
  const nftsForAddress: number[] = [];
  try {
    for (const nft of response.data) {
      const nftId = parseInt(nft.name.split('#')[1]);

      nftsForAddress.push(nftId);
    }
  } catch (error) {
    console.log(error);
  }

  return nftsForAddress;
};

export const getBestNftTypeForOwner = async (owner: string): Promise<NFTType | 'NONE'> => {
  const nftIds = await getNftsForAddress(owner, true);
  if (nftIds.length === 0) {
    return 'NONE';
  }
  let res = NFTType.HUMAN;
  for (const nftId of nftIds) {
    if (res === NFTType.SPECIAL) {
      return res;
    }
    const nftStats = await getNftStats(nftId);

    res = getHighestRank(res, getNFTType(nftStats.skin.name));
  }
  return res;
};

const getHighestRank = (curr: NFTType, next: NFTType) => {
  const ranks = [NFTType.SPECIAL, NFTType.ALIEN, NFTType.ROBOT, NFTType.MONKEY, NFTType.HUMAN];
  if (ranks.indexOf(curr) <= ranks.indexOf(next)) {
    return curr;
  }
  return next;
};

export const getNftOwner = async (nftid: number): Promise<string> => {
  try {
    const nftNonce = await getNftNonce(nftid);
    const hexNftId = nftNonce.toString(16).length % 2 ? '0' + nftNonce.toString(16) : nftNonce.toString(16);
    const response: { data: { address: string }[] } = await axios.get(
      `${elrondConfig.apiAddress}/nfts/${tokenIdentifier}-${hexNftId}/owners`
    );
    return response.data[0].address;
  } catch {
    return 'ERROR';
  }
};

export const getNftNonce = async (nftid: number): Promise<number> => {
  try {
    const response: { data: { nonce: number }[] } = await axios.get(
      `${elrondConfig.apiAddress}/nfts?name=%23${nftid}&collection=${tokenIdentifier}`
    );
    return response.data[0].nonce;
  } catch {
    return 0;
  }
};

export const getEgldPrice = async (): Promise<number> => {
  const response: { data: { price: number } } = await axios.get(`${elrondConfig.apiAddress}/economics`);
  return response.data.price;
};

export const getNftName = async (nftId: number): Promise<number> => {
  const nftIdHex = nftId.toString(16).length % 2 == 0 ? nftId.toString(16) : `0${nftId.toString(16)}`;
  const response: { data: { name: string } } = await axios.get(`${elrondConfig.apiAddress}/nfts/${tokenIdentifier}-${nftIdHex}`);
  return parseInt(response.data.name.split('#')[1]);
};
