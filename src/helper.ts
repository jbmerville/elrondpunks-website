import { CYOPCategories, NFTStats, NFTUrl } from 'types';
import { Colors, NFTType, RarityTiers } from 'values';

import config from 'config';

const { team } = config;

export const trimAddress = (address: string, length = 17) => {
  const amount = address.length - length + 10;
  return address.substring(0, 7) + '...' + address.substring(amount);
};

export const filterHiddenNfts = (nfts: NFTUrl[]) => {
  return nfts.map(filterHiddenNft);
};

export const filterHiddenNft = (nft: NFTUrl) => {
  if (nft.url === undefined) return { url: '/images/notfound.png', nftId: nft.nftId };
  return nft;
};

export const generateNftIds = (startNftId: number, endNftid: number): number[] => {
  const imageIds: number[] = [];
  for (let i = startNftId; i <= endNftid; i++) {
    imageIds.push(i);
  }
  return imageIds;
};

export const getNumberWithOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const isNftSpecial = (nftStats: NFTStats): boolean => {
  const gender = nftStats.skin.name;
  return !['Man', 'Woman', 'Monkey', 'Alien', 'Robot'].includes(gender);
};

export const getRarityTier = (rarity: string): RarityTiers => {
  switch (rarity) {
    case 'SPECIAL':
      return RarityTiers.SPECIAL;
    case 'LEGENDARY':
      return RarityTiers.LEGENDARY;
    case 'SUPER':
      return RarityTiers.SUPER;
    case 'RARE':
      return RarityTiers.RARE;
    case 'GOOD':
      return RarityTiers.GOOD;
    default:
      return RarityTiers.COMMON;
  }
};

export const getNFTType = (skin: string): NFTType => {
  switch (skin) {
    case 'Man':
      return NFTType.HUMAN;
    case 'Woman':
      return NFTType.HUMAN;
    case 'Alien':
      return NFTType.ALIEN;
    case 'Monkey':
      return NFTType.MONKEY;
    case 'Robot':
      return NFTType.ROBOT;
    default:
      return NFTType.SPECIAL;
  }
};

export const getCYOPCatergory = (category: string): CYOPCategories => {
  switch (category) {
    case 'SKIN':
      return CYOPCategories.SKIN;
    case 'NOSE':
      return CYOPCategories.NOSE;
    case 'EYES':
      return CYOPCategories.EYES;
    case 'GLASSES':
      return CYOPCategories.GLASSES;
    case 'HAIR':
      return CYOPCategories.HAIR;
    case 'MOUTH':
      return CYOPCategories.MOUTH;
    case 'FACIAL_CHARACTERISTICS':
      return CYOPCategories.FACIAL_CHARACTERISTICS;
    case 'FACIAL_HAIR':
      return CYOPCategories.FACIAL_HAIR;
    case 'ACCESSORIES':
      return CYOPCategories.ACCESSORIES;
    default:
      return CYOPCategories.OTHER;
  }
};

export const getRarityColorFromString = (rarity: string): Colors => {
  if (rarity === 'COMMON') return Colors.GREY;
  return getRarityColor(getRarityTier(rarity));
};

export const getRarityColor = (rarity: RarityTiers): Colors => {
  switch (rarity) {
    case RarityTiers.SPECIAL:
      return Colors.SPECIAL;
    case RarityTiers.LEGENDARY:
      return Colors.LEGENDARY;
    case RarityTiers.SUPER:
      return Colors.SUPER;
    case RarityTiers.RARE:
      return Colors.RARE;
    case RarityTiers.GOOD:
      return Colors.GOOD;
    default:
      return Colors.COMMON;
  }
};

export const pickRandomFromList = (items: any[]) => items[Math.floor(Math.random() * items.length)];

export const isNftUrlSpecial = (nftUrl: NFTUrl) => {
  const specialEpunkIds = [
    53,
    190,
    299,
    320,
    380,
    402,
    526,
    693,
    822,
    876,
    972,
    1088,
    1152,
    1185,
    1510,
    1539,
    1781,
    1845,
    1878,
    1904,
    1989,
    1999,
    2017,
    2096,
    2231,
    2405,
    2624,
    2697,
    2784,
    2822,
    3009,
    3029,
    3041,
    3109,
    3141
  ];
  return specialEpunkIds.includes(nftUrl.nftId);
};
