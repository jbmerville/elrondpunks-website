import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer, Text } from 'common-components';
import { Styles } from 'types';
import { Colors } from 'values';
import config from 'config';
import { useIsMobile } from 'hooks';
const Footer = () => {
  const isMobile = useIsMobile();

  const styles: Styles = {
    container: {
      padding: '50px 10px',
      display: 'flex',
      alignItems: 'center'
    },
    rightItem: {
      marginLeft: 'auto'
    },
    leftItem: {}
  };

  if (isMobile) {
    styles.leftItem = {
      maxWidth: '200px'
    };
  }

  return (
    <PageContainer color={Colors.IMAGE_BACKGROUND} style={styles.container}>
      <Text size="small" style={styles.leftItem}>
        {config.disclamer}
      </Text>
      <Link style={styles.rightItem} to="/terms">
        <Text bold>Terms</Text>
      </Link>
    </PageContainer>
  );
};

export default Footer;
