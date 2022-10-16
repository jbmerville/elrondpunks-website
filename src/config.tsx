import { ChainIDType } from 'types';
import { Colors } from 'values';
import React from 'react';
import { Text } from 'common-components';
import elrondConfigs from 'elrondConfigs';
type Chains = 'dev' | 'test' | 'main';

interface BlockchainConfig {
  tokenIdentifier: string;
  walletAddress: string;
  smartContractAddress: string;
  elrondConfig: any;
  chainID: ChainIDType;
}

const getBlockchainConfig = (chain: Chains): BlockchainConfig => {
  switch (chain) {
    case 'main':
      return {
        tokenIdentifier: 'EPUNKS-46b186',
        walletAddress: 'erd1s3wyfghqf8whx5mymz2jlmjuk2l42cnku7cn72kn4sp6hma8eu7qrkt3v8',
        smartContractAddress: 'erd1qqqqqqqqqqqqqpgqqkct5249vldr76mgmfew3wusf4q0tufmeu7qpd788q',
        elrondConfig: elrondConfigs[chain],
        chainID: '1'
      };
    case 'dev':
      return {
        tokenIdentifier: 'EPUNKS-46b186',
        walletAddress: 'erd1s3wyfghqf8whx5mymz2jlmjuk2l42cnku7cn72kn4sp6hma8eu7qrkt3v8',
        smartContractAddress: 'erd1qqqqqqqqqqqqqpgqqkct5249vldr76mgmfew3wusf4q0tufmeu7qpd788q',
        elrondConfig: elrondConfigs[chain],
        chainID: '1'
      };
    case 'test':
      return {
        tokenIdentifier: 'EPUNKS-46b186',
        walletAddress: 'erd1s3wyfghqf8whx5mymz2jlmjuk2l42cnku7cn72kn4sp6hma8eu7qrkt3v8',
        smartContractAddress: 'erd1qqqqqqqqqqqqqpgqqkct5249vldr76mgmfew3wusf4q0tufmeu7qpd788q',
        elrondConfig: elrondConfigs[chain],
        chainID: '1'
      };
  }
};

export default {
  blockchain: getBlockchainConfig('main'),
  apiConfig: {
    googleSheetAttributeCount: 7
  },
  collectionSize: 3141,
  revealedDate: '2022-02-11T23:00:00-00:00',
  priceMint: '0.4',
  totalDropCount: 10,
  walletAddress: 'erd1s3wyfghqf8whx5mymz2jlmjuk2l42cnku7cn72kn4sp6hma8eu7qrkt3v8',
  collectionName: 'ElrondPunks',
  nameOfSingleNft: 'ePunk',
  domainName: 'elrondpunks.com',
  imageSize: '98px',
  disclamer: 'ElrondPunks is in no way affiliated with CryptoPunks.',
  collectionDescription: (
    <>
      The very first collection of NFTs on Elrond! Digitized on ESDT technology, the ePunks respect Elrond&apos;s ideology. Very small
      quantity, exclusivity and usefulness. No more than 3,141 ePunks will be minted. Our goal is to make this a good investement for anyone
      buying into the collection by continiously pushing what DeFi and NFTs have to offer on Elrond. Every punk attributes as well as every
      special punks are individually crafted by our Artist. Let&apos;s build together!
    </>
  ),
  team: {
    name: 'GTG',
    members: [{ nickname: 'Kimura', quote: '', nftId: 1088, role: 'Project Owner' }]
  },
  FAQ: [
    {
      question: 'How can I purchase an ePunk?',
      answer: (
        <>
          You can purchase ePunks on our website by tuning in to one of our drops. Or on any marketplaces for elrond NFTs, like{' '}
          <div style={{ color: Colors.PRIMARY, fontWeight: 'bold', display: 'inline-block' }}>
            <a target="_blank" rel="noreferrer" href="https://deadrare.io/collection/EPUNKS-46b186">
              DeadRare
            </a>
          </div>
          .
        </>
      ),
      category: 'general'
    },
    {
      question: 'What is the mint price of ePunks?',
      answer: (
        <>
          ePunks mint price is 0.4 EGLD. 30% of the mint price will be donated to Planète Urgence. Royalties are fixed to 10%, including 3%
          returning to our heart association :{' '}
          <div style={{ color: Colors.PRIMARY, fontWeight: 'bold', display: 'inline-block' }}>
            <a target="_blank" rel="noreferrer" href="https://planete-urgence.org/en/">
              Planète Urgence
            </a>
          </div>
          .
        </>
      ),
      category: 'general'
    },
    {
      question: 'Where can I sell my ePunks?',
      answer: (
        <>
          You can sell your ePunks on{' '}
          <div style={{ display: 'flex' }}>
            -
            <div style={{ color: Colors.PRIMARY, fontWeight: 'bold', display: 'block' }}>
              <a target="_blank" rel="noreferrer" href="https://deadrare.io/collection/EPUNKS-46b186">
                DeadRare
              </a>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            -
            <div style={{ color: Colors.PRIMARY, fontWeight: 'bold', display: 'inline-block' }}>
              <a target="_blank" rel="noreferrer" href="https://isengardmarket.com/collection/EPUNKS-46b186">
                Isengard
              </a>
            </div>
          </div>
        </>
      ),
      category: 'general'
    },
    {
      question: 'How can I preview my ePunks?',
      answer: (
        <>
          You can view your ePunks using any of the following:
          <div>
            1. Visit the{' '}
            <div style={{ color: Colors.PRIMARY, fontWeight: 'bold', display: 'inline-block' }}>
              <a target="_blank" rel="noreferrer" href="/my-collection">
                My ePunks
              </a>
            </div>{' '}
            page.
          </div>
          <div>2. Connect to your wallet.</div>
          <>You can also check if you hold the NFT thanks to elrond explorer, in the NFT section of your account.</>
        </>
      ),
      category: 'general'
    },
    {
      question: 'What is the total supply of ePunks?',
      answer: 'There will be no more than 3,141 ePunks. Every ePunk is unique.',
      category: 'general'
    },
    {
      question: 'Is this project affiliated with CryptoPunks?',
      answer: 'No, ePunks come from their very own galactic metaverse.',
      category: 'general'
    },
    {
      question: 'What are the special ePunks?',
      answer:
        'There are 33 special ePunks. These ePunks represent specific characters who are not affiliated with any trademark, although they may look alike.',
      category: 'general'
    },
    {
      question: 'Why are there so many smokers & stoned eyes?',
      answer: 'No... we are not junkies.',
      category: 'general'
    }
  ],
  roadmap: [
    {
      quarter: 'Q4 2021',
      content: (
        <div>
          <Text bold>FIRST COLLECTION ON ELROND</Text>
          <Text style={{ marginTop: '10px' }}>
            We started developing the project on Elrond as the first collection to be minted on the Elrond blockchain. We started building
            the art, website and the community growing it to what it is today.
          </Text>
          <Text style={{ marginTop: '30px' }} bold>
            MINTING
          </Text>
          <Text style={{ marginTop: '10px', marginBottom: '40px' }}>
            We minted all 3141 ePunks on the blockchain, minted on our website using our very own smart contract for a price of 0.40EGLD
            each.
          </Text>
        </div>
      )
    },
    {
      quarter: 'Q3 2022',
      content: (
        <div>
          <Text bold>Ownership of the project transferred to Kimura</Text>
        </div>
      )
    }
  ]
};
