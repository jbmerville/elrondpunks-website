import { Link, useNavigate } from 'react-router-dom';
import { MaiarConnect, PageContainer, Text } from 'common-components';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons';

import Burger from './Burger';
import { Colors } from 'values';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Styles } from 'types';
import config from 'config';
import { useIsMobile } from 'hooks';

const Header = () => {
  const { collectionName, nameOfSingleNft } = config;
  const isMobile = useIsMobile();
  const history = useNavigate();

  const styles: Styles = {
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '50px 0'
    },
    leftLinksContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '550px',
      alignItems: 'self-end'
    },
    betaBanner: {
      width: '100%',
      background: Colors.PRIMARY,
      padding: '10px 0'
    }
  };

  if (isMobile) {
    styles.headerContainer = {
      margin: '20px 0'
    };
    styles.leftLinksContainer = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    };
  }

  const renderMobile = () => {
    return (
      <>
        <Link to="/">
          <Text size="medium" bold>
            {collectionName}
          </Text>
        </Link>
        <Burger />
      </>
    );
  };

  const renderDesktop = () => {
    return (
      <>
        <Link to="/">
          <img src="images/logo.png" style={{ height: '30px' }} />
        </Link>
        <Link to="/collection/0">
          <Text>Collection</Text>
        </Link>
        <div style={{ cursor: 'pointer' }} onClick={() => history('/my-collection')}>
          <Text>My {nameOfSingleNft}s</Text>
        </div>
        <Text color={Colors.PRIMARY}>
          <a target="_blank" rel="noreferrer" href="https://twitter.com/ElrondPunks">
            <FontAwesomeIcon icon={faTwitter} size="1x" />
          </a>
        </Text>
        <Text color={Colors.PRIMARY}>
          <a target="_blank" rel="noreferrer" href="https://discord.gg/tErFtaajRD">
            <FontAwesomeIcon icon={faDiscord} size="1x" />
          </a>
        </Text>
      </>
    );
  };

  return (
    <>
      <PageContainer>
        <div style={styles.headerContainer}>
          <div style={styles.leftLinksContainer}>{isMobile ? renderMobile() : renderDesktop()}</div>
          {!isMobile && <MaiarConnect />}
        </div>
      </PageContainer>
    </>
  );
};

export default Header;
