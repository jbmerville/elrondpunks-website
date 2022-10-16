import { Properties } from 'csstype';
import { RarityTiers } from 'values';

export interface Styles {
  [name: string]: Properties;
}

export type Style = Properties;

export interface Attribute {
  name: string;
  count: number;
  category: 'BODY' | RarityTiers;
}

export interface NFTStats {
  skin: Attribute;
  attributes: Attribute[];
  owner?: string;
  isRevealed: boolean;
}

export interface NFTUrl {
  url: string;
  nftId: number;
}

export interface Transaction {
  date: string;
  hash: string;
  from?: string;
  to?: string;
  type: 'Mint' | 'Transfer';
}

export interface ObjectType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface DropType {
  startNftId: number;
  endNftid: number;
  dropNumber: number;
}

export interface NFTSale {
  price: number;
  txHash: string;
  from: string;
  to: string;
  date: Date;
  nftUrl: NFTUrl;
  marketplace: Marketplace;
}

export enum CYOPCategories {
  SKIN = 'SKIN',
  NOSE = 'NOSE',
  EYES = 'EYES',
  FACIAL_HAIR = 'FACIAL_HAIR',
  FACIAL_CHARACTERISTICS = 'FACIAL_CHARACTERISTICS',
  GLASSES = 'GLASSES',
  HAIR = 'HAIR',
  MOUTH = 'MOUTH',
  ACCESSORIES = 'ACCESSORIES',
  OTHER = 'OTHER'
}

export interface CYOPAttributeType {
  SKIN: CYOPAttributeCategory;
  NOSE: CYOPAttributeCategory;
  EYES: CYOPAttributeCategory;
  FACIAL_HAIR: CYOPAttributeCategory;
  FACIAL_CHARACTERISTICS: CYOPAttributeCategory;
  GLASSES: CYOPAttributeCategory;
  HAIR: CYOPAttributeCategory;
  MOUTH: CYOPAttributeCategory;
  ACCESSORIES: CYOPAttributeCategory;
  OTHER?: CYOPAttributeCategory;
}

export interface CYOPAttributeCategory {
  categoryName: CYOPCategories;
  attributes: { [key: string]: CYOPAttributeItem };
}

export interface CYOPAttributeItem {
  colors: CYOPAttributeItemColor[];
  category: string;
  rarity: string;
  usedCount?: number;
  totalCount: number;
  name: string;
}

export interface CYOPAttributeItemColor {
  color: string;
  file: string;
}

export enum Marketplace {
  EMOON = 'https://emoon.space',
  DEADRARE = 'https://deadrare.io/collection/EPUNKS-46b186',
  TRUSTMARKET = 'https://trust.market/'
}

export type Bucket = 'fullSize' | 'thumbnail';

export type ChainIDType = 'D' | '1' | 'T';
