import { Loading, PageContainer, Text, ThumbnailSection } from 'common-components';
import { NFTUrl, Styles } from 'types';
import React, { useEffect, useState } from 'react';

import { Colors } from 'values';
import config from 'config';
import { getNftUrlsFromAttribute } from 'apis';
import { useParams } from 'react-router-dom';

const Attribute = () => {
  const { attribute } = useParams<{ attribute: string }>();
  const { nameOfSingleNft, imageSize } = config;
  const [nftUrls, setNFTUrls] = useState<NFTUrl[] | undefined>();

  useEffect(() => {
    getNftUrlsFromAttribute('fullSize', attribute || '').then(setNFTUrls);
  }, []);

  const styles: Styles = {
    seperator: {
      width: '100%',
      height: '1px',
      background: Colors.IMAGE_BACKGROUND,
      margin: '20px 0'
    },
    image: {
      height: imageSize,
      width: imageSize,
      margin: '2px 2px 0px 0px'
    },
    header: {
      width: '-webkit-fill-available',
      padding: '15px',
      background: Colors.IMAGE_BACKGROUND,
      marginBottom: '25px'
    },
    thumbnailSection: {
      marginBottom: '50px'
    }
  };

  return (
    <PageContainer heightFitAvailable>
      <div style={styles.header}>
        <Text>Attributes / {attribute}</Text>
      </div>
      {nftUrls === undefined ? (
        <Loading />
      ) : (
        <>
          <Text size="medium" bold>
            {nftUrls.length} {nameOfSingleNft}s Found
          </Text>
          <div style={styles.seperator} />
          <div style={styles.thumbnailSection}>
            <ThumbnailSection isPaginated getNftUrls={() => getNftUrlsFromAttribute('thumbnail', attribute || '')} sectionNumberUseBounds />
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default Attribute;
