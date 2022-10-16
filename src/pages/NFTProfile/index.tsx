import { useParams } from 'react-router-dom';
import { Loading, NftAttributes, PageContainer, Text } from 'common-components';
import { NFTStats, NFTUrl, Styles } from 'types';
import React, { useEffect, useState } from 'react';
import { getNftOwner, getNftStats, getNftUrl } from 'apis';

import { Colors } from 'values';
import NFTName from './NFTName';
import config from 'config';
import { useIsMobile } from 'hooks';

const NFTProfile = () => {
  const { collectionName, nameOfSingleNft, walletAddress } = config;
  const { nftId } = useParams<{ nftId: string }>();
  const [nftUrl, setNFTUrl] = useState<NFTUrl | undefined>();
  const [nftStats, setNFTStats] = useState<NFTStats | undefined>();
  const [nftOwner, setNFTOwner] = useState<string | undefined>();
  const isMobile = useIsMobile();

  useEffect(() => {
    const parsedImageId = nftId ? parseInt(nftId) : 0;
    getNftUrl('fullSize', parsedImageId).then(setNFTUrl);
    getNftStats(parsedImageId).then(setNFTStats);
    getNftOwner(parsedImageId).then(setNFTOwner);
  }, []);

  const styles: Styles = {
    container: {
      padding: '80px 0',
      overflow: 'hidden'
    },
    imageContainer: {
      background: Colors.IMAGE_BACKGROUND,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
    imageHeader: {
      background: Colors.GREY,
      padding: '5px',
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    image: {
      height: '400px'
    },
    statsContainer: {
      margin: '70px',
      display: 'flex',
      flexDirection: 'column'
    },
    heading: {
      fontWeight: 'bold',
      marginTop: '40px',
      marginBottom: '25px'
    }
  };

  if (isMobile) {
    styles.imageContainer = {
      background: Colors.IMAGE_BACKGROUND,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'column',
      flex: '1 1 auto',
      height: '250px'
    };
    styles.image = {
      maxHeight: '200px'
    };
    styles.statsContainer = {
      margin: '20px',
      display: 'flex',
      flexDirection: 'column'
    };
  }

  const renderMarketStatus = () => {
    return (
      <>
        <div className="wrapper"></div>
        <Text size="medium" bold style={styles.heading}>
          Current Market Status
        </Text>
        <Text>
          This {nameOfSingleNft} is currently owned by{' '}
          <Text style={{ wordWrap: 'break-word', width: isMobile ? '300px' : '' }} color={Colors.PRIMARY} bold>
            {nftOwner ? (
              <a target="_blank" rel="noreferrer" href={`https://explorer.elrond.com/accounts/${nftOwner}/nfts`}>
                {nftOwner === walletAddress ? collectionName : nftOwner}
              </a>
            ) : (
              <Loading />
            )}
          </Text>
        </Text>
      </>
    );
  };

  return (
    <PageContainer style={styles.container}>
      {nftUrl ? (
        <div style={styles.imageContainer}>
          <div style={styles.imageHeader}>
            <Text style={{ marginLeft: '15px' }} bold>
              #{nftId}
            </Text>
          </div>
          <img
            style={styles.image}
            alt={`#${nftId}`}
            src={nftUrl.url}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = '/images/notfound.png';
            }}
          />
        </div>
      ) : (
        <div style={{ ...styles.imageContainer, background: 'none' }}>
          <Loading size="large" />
        </div>
      )}
      <div style={styles.statsContainer}>
        <NFTName nftId={nftId || '0'} owner={nftOwner} />
        {nftOwner === 'ERROR' ? (
          <Text color={Colors.ERROR}>This ePunk is not in the collection.</Text>
        ) : (
          <NftAttributes nftStats={nftStats} />
        )}
        {renderMarketStatus()}
      </div>
    </PageContainer>
  );
};

export default NFTProfile;
