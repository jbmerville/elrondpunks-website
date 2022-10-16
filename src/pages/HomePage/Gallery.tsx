import { useIsMobile } from 'hooks';
import React from 'react';
import { Styles } from 'types';

const Gallery = () => {
  const isMobile = useIsMobile();

  const styles: Styles = {
    container: {
      height: '500px',
      objectFit: 'cover'
    }
  };

  if (isMobile) {
    styles.container = {
      height: '300px',
      objectFit: 'cover',
      marginLeft: '-220px'
    };
  }

  return <img alt="gallery-punks" style={styles.container} src="images/banner.png" />;
};

export default Gallery;
