import React from 'react';
import { Text } from 'common-components';
import config from 'config';
import { Colors } from 'values';
import { Styles } from 'types';
import { useIsMobile } from 'hooks';

const About = () => {
  const { collectionName, collectionDescription } = config;
  const isMobile = useIsMobile();

  const styles: Styles = {
    outerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '20px'
    },
    innerContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingRight: '100px'
    },
    rotatingImage: {
      width: '400px',
      height: '400px',
      background: Colors.IMAGE_BACKGROUND
    }
  };

  if (isMobile) {
    styles.outerContainer = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '20px',
      width: `${window.innerWidth - 30}px`
    };
    styles.innerContainer = {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    };
    styles.rotatingImage = {
      marginTop: '40px',
      height: 'auto',
      background: Colors.IMAGE_BACKGROUND
    };
  }

  return (
    <div style={styles.outerContainer}>
      <div style={styles.innerContainer}>
        <Text size="large" bold>
          {collectionName}
        </Text>
        <Text>{collectionDescription}</Text>
      </div>
      <img style={styles.rotatingImage} src="/images/rotating.gif" />
    </div>
  );
};

export default About;
