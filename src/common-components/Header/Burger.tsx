import { MaiarConnect, PageContainer, Text } from 'common-components';
import React, { useState } from 'react';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { Colors } from 'values';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Styles } from 'types';
import config from 'config';
import { routeNames } from 'routes';

const Burger = () => {
  const { nameOfSingleNft } = config;
  const [open, setOpen] = useState(false);

  const styles: Styles = {
    button: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: '35px',
      cursor: 'pointer',
      zIndex: 10
    },
    bar: {
      width: '40px',
      height: '6px',
      background: Colors.PRIMARY,
      transition: 'all 0.3s linear',
      transformOrigin: '3px'
    },
    menu: {
      display: 'flex',
      zIndex: 5,
      flexDirection: 'column',
      justifyContent: 'center',
      background: Colors.IMAGE_BACKGROUND,
      width: '100%',
      height: '100vh',
      textAlign: 'left',
      position: 'fixed',
      top: '0px',
      left: '0px',
      transition: 'transform 0.2s ease-in-out',
      transform: open ? 'translateX(0%)' : 'translateX(100%)'
    },
    menuInsideContainer: {
      height: '450px',
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column'
    }
  };

  if (open) {
    styles.button = {
      position: 'fixed',
      top: '21px',
      right: '15px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: '35px',
      cursor: 'pointer',
      zIndex: 10
    };
  }

  return (
    <>
      <div style={styles.button} onClick={() => setOpen(!open)}>
        <div style={{ ...styles.bar, transform: open ? 'rotate(45deg)' : 'rotate(0)' }} />
        <div style={{ ...styles.bar, transform: open ? 'translateX(20px)' : 'translateX(0)', opacity: open ? 0 : 1 }} />
        <div style={{ ...styles.bar, transform: open ? 'rotate(-45deg)' : 'rotate(0)' }} />
      </div>
      <div style={styles.menu}>
        <PageContainer style={styles.menuInsideContainer} color={Colors.IMAGE_BACKGROUND}>
          <Link to="/" onClick={() => setOpen(!open)}>
            <Text size="large">Home</Text>
          </Link>
          <Link to="/collection/0" onClick={() => setOpen(!open)}>
            <Text size="large">Collection</Text>
          </Link>
          <Link to="/my-collection" onClick={() => setOpen(!open)}>
            <Text size="large">My {nameOfSingleNft}s</Text>
          </Link>
          <Text size="large" color={Colors.PRIMARY}>
            <a target="_blank" rel="noreferrer" href="https://twitter.com/ElrondPunks" onClick={() => setOpen(!open)}>
              Twitter <FontAwesomeIcon icon={faTwitter} size="1x" />
            </a>
          </Text>
          <Text color={Colors.PRIMARY} size="large">
            <a target="_blank" rel="noreferrer" href="https://discord.gg/tErFtaajRD" onClick={() => setOpen(!open)}>
              Discord <FontAwesomeIcon icon={faDiscord} size="1x" />
            </a>
          </Text>
          <MaiarConnect onClick={() => setOpen(false)} style={{ marginTop: '20px', width: '-webkit-fill-available', fontSize: '1.6em' }} />
        </PageContainer>
      </div>
    </>
  );
};

export default Burger;
