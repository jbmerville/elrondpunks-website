import { NFTUrl, Styles } from 'types';
import React, { useEffect, useState } from 'react';

import { Colors } from 'values';
import { Link } from 'react-router-dom';
import { Text } from 'common-components';
import { getNftUrl } from 'apis';
import { useIsMobile } from 'hooks';

interface PunkThumbnailProps {
  nftUrl?: NFTUrl;
  nftId: number;
  topLeftValue?: string | number;
  size?: 'default' | 'large' | 'small';
  hideInfo?: boolean;
  cancelOnClick?: boolean;
}

const defaultProps = {
  size: 'default'
};

const PunkThumbnail = (props: PunkThumbnailProps) => {
  const { nftUrl, nftId, topLeftValue, size, hideInfo, cancelOnClick } = props;
  const [nftUrlState, setNFTUrl] = useState<NFTUrl | undefined>();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (nftUrl) setNFTUrl(nftUrl);
    else getNftUrl('fullSize', nftId).then(setNFTUrl);
  }, [nftUrl]);

  const getSize = () => {
    switch (size) {
      case 'large':
        return '250px';
      case 'small':
        return isMobile ? '75px' : '100px';
      default:
        return '150px';
    }
  };

  const styles: Styles = {
    imageContainer: {
      background: Colors.IMAGE_BACKGROUND,
      height: getSize(),
      width: getSize(),
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      overflow: 'hidden'
    },
    image: {
      width: '100%'
    },
    loading: {
      height: getSize()
    },
    nftId: {
      position: 'relative',
      top: '20px',
      left: '5px'
    }
  };
  if (cancelOnClick) {
    return (
      <div>
        {topLeftValue && (
          <Text size={size === 'small' ? 'small' : 'medium'} style={styles.nftId} bold>
            #{topLeftValue}
          </Text>
        )}
        {nftUrlState ? (
          <div style={styles.imageContainer}>
            <img style={styles.image} alt={`#${nftId}`} src={nftUrlState.url} />
          </div>
        ) : (
          <div style={styles.imageContainer}>
            <img style={styles.loading} alt={`#${nftId}`} src={'/images/loading.gif'} />
          </div>
        )}
        {!hideInfo && (
          <Text size={size === 'small' ? 'default' : 'medium'} style={{ color: Colors.PRIMARY }} bold>
            #{nftId}
          </Text>
        )}
      </div>
    );
  }
  return (
    <Link to={`/epunk/${nftId}`}>
      {topLeftValue && (
        <Text size={size === 'small' ? 'small' : 'medium'} style={styles.nftId} bold>
          #{topLeftValue}
        </Text>
      )}
      {nftUrlState ? (
        <div style={styles.imageContainer}>
          <img style={styles.image} alt={`#${nftId}`} src={nftUrlState.url} />
        </div>
      ) : (
        <div style={styles.imageContainer}>
          <img style={styles.loading} alt={`#${nftId}`} src={'/images/loading.gif'} />
        </div>
      )}
      {!hideInfo && (
        <Text size={size === 'small' ? 'default' : 'medium'} style={{ color: Colors.PRIMARY }} bold>
          #{nftId}
        </Text>
      )}
    </Link>
  );
};

PunkThumbnail.defaultProps = defaultProps;

export default PunkThumbnail;
