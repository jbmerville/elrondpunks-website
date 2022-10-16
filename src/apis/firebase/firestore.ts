/* eslint-disable @typescript-eslint/no-explicit-any */
import { Attribute, Bucket, NFTStats, NFTUrl, ObjectType } from 'types';
import { NFTType } from 'values';
import { addDoc, collection, getDocs, query, setDoc, where } from 'firebase/firestore';
import { filterHiddenNfts, getRarityTier } from 'helper';
import { firestore, storage } from './setup';
import { getDownloadURL, ref } from '@firebase/storage';

import _ from 'underscore';

import { getNftsForAddress } from 'apis';

const ATTRIBUTES_DB_NAMES = {
  number: 'Number',
  skin: 'Skin',
  allAttributes: 'allAttributes',
  rarity: 'rarity'
};

const isNFTGif = (nftId: number) => [1088, 1510].includes(nftId);

const getDownloadURLExtension = (nftId: number) => {
  if (isNFTGif(nftId)) {
    return '.gif';
  }
  return '.png';
};

const getBaseUrl = async (bucket: Bucket, nftId: number): Promise<[string, string]> => {
  const downloadURLExtension = getDownloadURLExtension(nftId);
  const url = await getDownloadURL(ref(storage, `${bucket}/#${nftId}${downloadURLExtension}`));
  const urlSplit = url.split(downloadURLExtension);
  const endOfBaseUrl = urlSplit[0].length - nftId.toString().length;
  return [urlSplit[0].substring(0, endOfBaseUrl), downloadURLExtension + urlSplit[1]];
};

export const getNftUrl = async (bucket: Bucket, nftId: number): Promise<NFTUrl> => {
  const downloadURLExtension = getDownloadURLExtension(nftId);

  const url = await getDownloadURL(ref(storage, `${bucket}/#${nftId}${downloadURLExtension}`));
  return { url, nftId };
};

export const getNftUrls = async (bucket: Bucket, nftIds: number[]): Promise<NFTUrl[]> => {
  const [baseUrl, token] = await getBaseUrl(bucket, 1);
  const urls: NFTUrl[] = [];
  for (const nftId of nftIds) {
    try {
      if (isNFTGif(nftId)) {
        urls.push(await getNftUrl(bucket, nftId));
      } else {
        urls.push({ url: `${baseUrl}${nftId}${token}`, nftId });
      }
    } catch (e) {
      console.log(e);
    }
  }
  return filterHiddenNfts(urls);
};

export const getNftUrlsFromAttribute = async (bucket: Bucket, attribute: string): Promise<NFTUrl[]> => {
  return await getNftUrlsFromAttributes(bucket, [attribute]);
};

export const getNftUrlsFromAttributes = async (bucket: Bucket, attributes: string[]): Promise<NFTUrl[]> => {
  const nftIds: number[] = [];
  const statsQuery = query(
    collection(firestore, 'punks'),
    ...attributes.map(attribute => where(`${ATTRIBUTES_DB_NAMES.allAttributes}.${attribute}`, '==', true))
  );
  const snapshot = await getDocs(statsQuery);
  for (const doc of snapshot.docs) {
    try {
      const nftId: number = parseInt(doc.data()[ATTRIBUTES_DB_NAMES.number].substring(1));
      nftIds.push(nftId);
    } catch (e) {
      console.log(e);
    }
  }

  nftIds.sort((a, b) => a - b);

  const nftUrls = await getNftUrls(bucket, nftIds);
  return nftUrls;
};

export const getNftsInGiveaway = async (bucket: Bucket): Promise<NFTUrl[]> => {
  const statsQuery = query(collection(firestore, 'giveaways'));
  const snapshot = await getDocs(statsQuery);
  const nftIds: number[] = [];
  for (const doc of snapshot.docs) {
    const ids: number[] = doc.data()['ids'];
    // eslint-disable-next-line prefer-spread
    nftIds.push.apply(nftIds, ids);
  }
  return filterHiddenNfts(await getNftUrls(bucket, nftIds));
};

const getTotalStats = async (attribute: string): Promise<number> => {
  if (attribute != undefined) {
    const statsQuery = query(collection(firestore, 'punk-stats'), where('name', '==', attribute));
    const snapshot = await getDocs(statsQuery);
    let res = 0;
    snapshot.forEach(stat => {
      res = stat.data()['quantity'];
    });
    return res;
  }
  return 0;
};

const getRarityStats = async (attribute: string): Promise<string> => {
  const statsQuery = query(collection(firestore, 'punk-stats'), where('name', '==', attribute));
  const snapshot = await getDocs(statsQuery);
  let res = '';
  snapshot.forEach(stat => {
    res = stat.data()[ATTRIBUTES_DB_NAMES.rarity];
  });
  return res;
};

const getDataNFT = async (nftId: string): Promise<ObjectType> => {
  const statsQuery = query(collection(firestore, 'punks'), where(`${ATTRIBUTES_DB_NAMES.number}`, '==', nftId));
  const snapshot = await getDocs(statsQuery);
  let res = {};
  snapshot.forEach(stat => {
    res = stat.data();
  });
  return res;
};

const getAttributesData = async (nftData: any): Promise<Attribute[]> => {
  const attributes: Attribute[] = [];
  for (const data in nftData.allAttributes) {
    if (!isBody(data)) {
      try {
        attributes.push({ name: data, count: await getTotalStats(data), category: getRarityTier(await getRarityStats(data)) });
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  }
  return attributes;
};

export const getNftStats = async (nftId: number): Promise<NFTStats> => {
  const nftData = await getDataNFT(`#${nftId}`);
  const nftStats: NFTStats = {
    skin: { name: nftData[ATTRIBUTES_DB_NAMES.skin], count: await getTotalStats(nftData[ATTRIBUTES_DB_NAMES.skin]), category: 'BODY' },
    attributes: (await getAttributesData(nftData)).sort((a, b) => (a.name < b.name ? -1 : 1)),
    isRevealed: true
  };
  return nftStats;
};
const isBody = (attribute: string) => {
  return ['Man', 'Woman', 'Alien', 'Monkey', 'Robot'].includes(attribute);
};

export const getAttributeStats = async (): Promise<Attribute[]> => {
  const statsQuery = query(collection(firestore, 'punk-stats'));
  const snapshot = await getDocs(statsQuery);
  const res: Attribute[] = [];
  snapshot.forEach(stat => {
    const { name, count, rarity } = stat.data();
    res.push({ name, count, category: rarity });
  });
  return _.uniq(
    res.sort((a, b) => (a.name < b.name ? -1 : 1)),
    true,
    att => att.name
  );
};

export const getNftsforOwner = async (bucket: Bucket, owner: string): Promise<NFTUrl[]> => {
  // Query the first page of docs
  const nftIds = await getNftsForAddress(owner, true);
  return await getNftUrls(bucket, nftIds.sort((a, b) => a - b).slice(0, 314));
};

export const getNFTName = async (nftId: number): Promise<string> => {
  const nftNameQuery = query(collection(firestore, 'punk-names'), where('nftId', '==', `#${nftId}`));
  let name = 'Unnamed';
  try {
    const snapshot = await getDocs(nftNameQuery);
    snapshot.forEach(doc => {
      name = doc.data().name;
    });
    // eslint-disable-next-line no-empty
  } catch (error) {
    return 'ERROR';
  }
  return name === '' ? 'Unnamed' : name;
};
export const getNftTypeUrl = async (bucket: Bucket, nftType: NFTType): Promise<NFTUrl[]> => {
  switch (nftType) {
    case NFTType.ALIEN:
      return [await getNftUrl(bucket, 4003)];
    case NFTType.MONKEY:
      return [await getNftUrl(bucket, 4001)];
    case NFTType.ROBOT:
      return [await getNftUrl(bucket, 4002)];
    case NFTType.SPECIAL:
      return [await getNftUrl(bucket, -1)];
    case NFTType.HUMAN:
      return [await getNftUrl(bucket, 4000)];
  }
};

export const writeNFTName = async (nftId: number, name: string): Promise<boolean> => {
  const nftNameQuery = query(collection(firestore, 'punk-names'), where('nftId', '==', `#${nftId}`));
  try {
    const snapshot = await getDocs(nftNameQuery);
    const newData = {
      nftId: `#${nftId}`,
      name
    };
    if (snapshot.docs.length === 0) {
      await addDoc(collection(firestore, 'punk-names'), newData);
    } else {
      await setDoc(snapshot.docs[0].ref, newData);
    }
    // eslint-disable-next-line no-empty
  } catch (error) {
    return false;
  }

  return true;
};
