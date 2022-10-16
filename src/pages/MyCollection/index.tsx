import { Loading, PageContainer, PunkThumbnail, Text } from 'common-components';
import { NFTUrl, Styles } from 'types';
import React, { useEffect, useState } from 'react';
import { useGetLoginInfo, useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';

import { Colors } from 'values';
import config from 'config';
import { getNftsforOwner } from 'apis';
import { trimAddress } from 'helper';
import { useIsMobile } from 'hooks';
import { useNavigate } from 'react-router';

const index = () => {
  const { nameOfSingleNft } = config;
  const { address } = useGetAccountInfo();
  const [nftUrls, setNFTUrls] = useState<NFTUrl[] | undefined>();
  const { isLoggedIn } = useGetLoginInfo();

  const history = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isLoggedIn) history('/unlock');
    if (address) getNftsforOwner('fullSize', address).then(setNFTUrls);
  }, []);

  const styles: Styles = {
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
    thumbnailContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gridGap: '30px 125px',
      paddingBottom: '100px'
    },
    thumbnail: {
      marginBottom: '0px'
    },
    header: {
      margin: '20px 0'
    }
  };

  if (isMobile) {
    styles.thumbnailContainer = {
      display: 'flex',
      flexWrap: 'wrap',
      paddingBottom: '50px'
    };
    styles.thumbnail = {
      marginRight: '20px'
    };
  }

  const renderImages = () => {
    if (nftUrls === undefined) {
      return <Loading size="large" />;
    }
    if (nftUrls.length === 0) {
      return (
        <Text style={styles.header} size="medium">
          You don&apos;t own any {nameOfSingleNft}s :(
        </Text>
      );
    }
    return (
      <>
        <Text style={styles.header} size="medium" block>
          You own the following{' '}
          <Text style={styles.header} bold>
            {nftUrls.length}
          </Text>{' '}
          {nameOfSingleNft}:
        </Text>
        <div style={styles.thumbnailContainer}>
          {nftUrls.map(nftUrl => (
            <div key={nftUrl.nftId} style={styles.thumbnail}>
              <PunkThumbnail nftUrl={nftUrl} nftId={nftUrl.nftId} size={isMobile ? 'default' : 'large'} />
            </div>
          ))}
        </div>
      </>
    );
  };

  const formattedAddress = isMobile && address ? trimAddress(address, 33) : address;

  return (
    <PageContainer heightFitAvailable style={styles.container}>
      <Text size="large" bold>
        Your {nameOfSingleNft}s
      </Text>
      <Text color={Colors.PRIMARY}>
        <Text color={Colors.TEXT}>View your NFTs on the Elrond Explorer: </Text>{' '}
        <a target="_blank" rel="noreferrer" href={`https://explorer.elrond.com/accounts/${address}/nfts`} style={{ wordWrap: 'normal' }}>
          {address ? formattedAddress : <Loading />}
        </a>
      </Text>
      {renderImages()}
    </PageContainer>
  );
};

export default index;
