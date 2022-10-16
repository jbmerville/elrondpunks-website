import { Attribute, NFTStats, Style, Styles } from 'types';
import { Colors } from 'values';
import { Loading, Text } from 'common-components';
import React from 'react';
import { getRarityColor, isNftSpecial } from 'helper';

import { Link } from 'react-router-dom';
import config from 'config';
import { useIsMobile } from 'hooks';

interface NftAttributesProps {
  nftStats?: NFTStats;
  size: 'small' | 'default';
}

const defaultProps = {
  size: 'default'
};
const NftAttributes = (props: NftAttributesProps) => {
  const { nftStats, size } = props;
  const isMobile = useIsMobile();
  const { nameOfSingleNft } = config;

  const styles: Styles = {
    heading: {
      marginTop: '40px',
      marginBottom: '25px'
    },
    attributeContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    attribute: {
      flex: '1 1 30%',
      width: 'max-content',
      display: 'flex',
      flexDirection: 'column'
    },
    special: {
      animation: 'shadows 1.2s ease-in infinite, move 1.2s ease-in infinite'
    },
    scoreContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '2px'
    },
    barContainer: {
      height: '25px',
      width: '250px',
      border: `2px solid ${Colors.PRIMARY}`,
      marginRight: '10px',
      overflow: 'hidden'
    }
  };

  if (isMobile) {
    styles.attribute = {
      flex: '1 1 auto',
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px'
    };
  }

  const getAttributeSectionStyle = (attributes: Attribute[]): Style => {
    const attributesSection: Style = {
      display: 'grid',
      gridTemplateRows: '40px'
    };
    if (attributes.length < 3) {
      attributesSection.gridTemplateColumns = `repeat(${attributes.length}, 160px)`;
    } else {
      attributesSection.gridTemplateColumns = `repeat(3, 160px)`;
    }

    if (size === 'default') {
      attributesSection.gridTemplateColumns = '1fr 1fr 1fr';
      attributesSection.gridTemplateRows = '100px';
    } else {
      attributesSection.marginTop = '10px';
    }

    if (isMobile) {
      attributesSection.gridTemplateColumns = '1fr';
    }

    return attributesSection;
  };

  const renderAttributes = (stats: NFTStats) => {
    return stats.attributes.map((attribute, index) => {
      const isLastRow = index >= stats.attributes.length - 3;
      const attributeRoute = `/attributes/${attribute.name}`;
      const rarity = ((attribute.count / config.collectionSize) * 100).toPrecision(1);
      const rarityTier = attribute.category;
      if (rarityTier === 'BODY') return <> </>;
      const rarityColor = getRarityColor(rarityTier);

      return (
        <div key={attribute.name} style={{ marginBottom: isLastRow ? '' : '10px', ...styles.attribute }}>
          <Link to={attributeRoute}>
            <Text color={Colors.PRIMARY} bold>
              {attribute.name}
            </Text>
          </Link>
          {size === 'default' && (
            <>
              <Text>
                <Text color={rarityColor} bold>
                  {attribute.count}
                </Text>{' '}
                {nameOfSingleNft}s have this item
              </Text>
              <Text>
                <Text color={rarityColor} bold>
                  {rarity}%
                </Text>{' '}
                item rarity
              </Text>
            </>
          )}
          <Text>
            <Text color={rarityColor} bold>
              {rarityTier}
            </Text>
          </Text>
        </div>
      );
    });
  };

  if (nftStats === undefined) {
    return <Loading size={size === 'default' ? 'large' : 'default'} />;
  }
  if (!nftStats.isRevealed) {
    return <Text>This {nameOfSingleNft} has not been revealed yet</Text>;
  }
  const gender = nftStats.skin.name;

  return (
    <div style={styles.attributeContainer}>
      {isNftSpecial(nftStats) ? (
        <div>
          <Text color={Colors.PURPLE} size="large" bold>
            <div className="glitch" data-text={`Special ${nameOfSingleNft}`}>
              Special {nameOfSingleNft}
            </div>
          </Text>
          <Text block color={Colors.PURPLE} size="medium" style={{ marginTop: '20px' }} bold>
            {gender}
          </Text>
        </div>
      ) : (
        <Text bold>
          One of {nftStats.skin.count}
          <Link to={`/attributes/${gender}`}>
            {' '}
            <Text color={Colors.PRIMARY} size="default">
              {gender}{' '}
            </Text>
          </Link>{' '}
          {nameOfSingleNft}
        </Text>
      )}
      {size === 'default' && (
        <Text size="medium" style={styles.heading} bold>
          Accessories
        </Text>
      )}
      {nftStats.attributes.length === 0 ? (
        <Text style={{ marginTop: '10px' }}>No accessories</Text>
      ) : (
        <div style={getAttributeSectionStyle(nftStats.attributes)}>{renderAttributes(nftStats)}</div>
      )}{' '}
    </div>
  );
};

NftAttributes.defaultProps = defaultProps;

export default NftAttributes;
