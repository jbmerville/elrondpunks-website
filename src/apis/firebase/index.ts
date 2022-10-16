import { analytics, firebaseApp, firestore, realtime, storage } from './setup';
import {
  getAttributeStats,
  getNFTName,
  getNftStats,
  getNftTypeUrl,
  getNftUrl,
  getNftUrls,
  getNftUrlsFromAttribute,
  getNftUrlsFromAttributes,
  getNftsInGiveaway,
  getNftsforOwner,
  writeNFTName
} from './firestore';

export {
  firebaseApp,
  analytics,
  storage,
  firestore,
  realtime,
  getNftUrl,
  getNftUrls,
  getNftStats,
  getNftUrlsFromAttribute,
  getNftsInGiveaway,
  getNftsforOwner,
  getNftUrlsFromAttributes,
  getNFTName,
  writeNFTName,
  getAttributeStats,
  getNftTypeUrl
};
