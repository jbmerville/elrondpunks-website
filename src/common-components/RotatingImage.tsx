import React, { useEffect, useState } from 'react';
import { Loading } from 'common-components';
import { NFTUrl, Styles, Style } from 'types';

interface RotatingImageProps {
  nftUrls: NFTUrl[] | undefined;
  style?: Style;
}

const RotatingImage = (props: RotatingImageProps) => {
  const { nftUrls, style } = props;
  const [currImg, setCurrImg] = useState(0);

  const styles: Styles = {
    container: {
      width: '500px'
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (nftUrls) {
        setCurrImg(i => {
          return Math.floor((i + 1) % nftUrls.length);
        });
      }
    }, 400);
    return () => clearInterval(interval);
  }, [nftUrls]);

  if (nftUrls === undefined) {
    return <Loading />;
  }

  const nftUrl = nftUrls[currImg];
  return <img style={{ ...styles.container, ...style }} src={nftUrl ? nftUrl.url : '/images/notfound.png'} />;
};

export default RotatingImage;
