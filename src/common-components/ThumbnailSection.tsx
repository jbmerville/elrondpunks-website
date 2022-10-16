import { Link, useNavigate } from 'react-router-dom';
import { Loading, NftAttributes, Text } from 'common-components';
import { NFTStats, NFTUrl, Styles } from 'types';
import React, { useEffect, useState } from 'react';

import { Colors } from 'values';
import ReactPaginate from 'react-paginate';
import config from 'config';
import { getNftStats } from 'apis';
import { useIsMobile } from 'hooks';

interface ThumbnailSectionProps {
  getNftUrls: () => Promise<NFTUrl[]>;
  nftUrls?: NFTUrl[];
  sectionNumberUseBounds?: boolean;
  isPaginated?: boolean;
  defaultPage?: number;
  isSearch?: boolean;
  displayAll?: boolean;
}

const IMAGE_PER_PAGE = 400;

const ThumbnailSection = (props: ThumbnailSectionProps) => {
  const { getNftUrls, nftUrls, sectionNumberUseBounds, isPaginated, displayAll, defaultPage, isSearch } = props;
  const { imageSize, nameOfSingleNft } = config;
  const [nftUrlsState, setNFTUrls] = useState<NFTUrl[] | undefined>();
  const [popUpImage, setPopUpImage] = useState(0);
  const [popUpNftStats, setPopUpNftStats] = useState<NFTStats | undefined>();
  const [currentItems, setCurrentItems] = useState<NFTUrl[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const isMobile = useIsMobile();
  const history = useNavigate();

  useEffect(() => {
    // if (!nftUrls) getNftUrls().then(setNFTUrls);
    setNFTUrls(nftUrls);
  }, [nftUrls]);

  useEffect(() => {
    if (nftUrlsState && displayAll) {
      setCurrentItems(nftUrlsState);
    } else if (nftUrlsState && defaultPage !== undefined && !isSearch) {
      const newOffset = defaultPage * IMAGE_PER_PAGE;
      const endOffset = newOffset + IMAGE_PER_PAGE - 1;
      setCurrentItems(nftUrlsState.slice(Math.max(newOffset - 1, 0), endOffset));
      setPageCount(Math.ceil(nftUrlsState.length / IMAGE_PER_PAGE));
    } else if (nftUrlsState) {
      setCurrentItems(nftUrlsState.slice(0, IMAGE_PER_PAGE));
    }
  }, [nftUrlsState, defaultPage]);

  const getSections = (items: NFTUrl[]) => {
    const sections: { [key: number]: NFTUrl[] } = {};
    items.forEach(nftUrl => {
      const sectionId = Math.floor(nftUrl.nftId / 100);
      if (!(sectionId in sections)) sections[sectionId] = [nftUrl];
      else sections[sectionId].push(nftUrl);
    });
    return sections;
  };

  const styles: Styles = {
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
    sectionContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    image: {
      height: isMobile ? '84px' : imageSize,
      width: isMobile ? '84px' : imageSize,
      background: Colors.IMAGE_BACKGROUND,
      padding: '2px 2px 0px 0px'
    },
    link: {
      color: Colors.PRIMARY
    },
    imageLink: {
      height: 'fit-content',
      display: 'flex'
    },
    popUp: {
      position: 'absolute',
      marginTop: imageSize,
      marginLeft: popUpNftStats ? '-25px' : '10px',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      padding: '5px 15px',
      background: '#ffffffe6',
      borderRadius: '3px'
    },
    paginationContainer: {
      marginTop: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  const renderRows = (items: NFTUrl[]) => {
    return items.map(nftUrl => (
      <Link
        onMouseOver={() => {
          setPopUpNftStats(undefined);
          getNftStats(nftUrl.nftId).then(setPopUpNftStats);
          setPopUpImage(nftUrl.nftId);
        }}
        key={nftUrl.nftId}
        style={styles.imageLink}
        to={`/epunk/${nftUrl.nftId}`}
      >
        <img
          style={styles.image}
          alt={`#${nftUrl.nftId}`}
          src={nftUrl.url}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = 'images/notfound.png';
          }}
        />
        {popUpImage === nftUrl.nftId && (
          <div style={styles.popUp}>
            {popUpNftStats ? (
              <Text size="small" color={Colors.PRIMARY} bold>
                {nameOfSingleNft.toUpperCase()} #{nftUrl.nftId}
                <NftAttributes nftStats={popUpNftStats} size="small" />
              </Text>
            ) : (
              <Loading />
            )}
          </div>
        )}
      </Link>
    ));
  };

  const renderSections = () => {
    if (nftUrlsState === undefined) {
      return <Loading style={{ marginTop: '50px' }} size="large" />;
    }

    if (isSearch) {
      return (
        <div style={styles.sectionContainer}>
          {currentItems.length > 0 && (
            <Text style={{ width: '100%', marginTop: '30px', marginBottom: '5px' }} block bold size="medium">
              #{currentItems[0].nftId} - #{currentItems[currentItems.length - 1].nftId}
            </Text>
          )}
          {renderRows(currentItems)}
        </div>
      );
    }
    const sections = getSections(currentItems);
    const res = [];
    for (const key in sections) {
      let startId = sections[key][0].nftId;
      let endId = sections[key][sections[key].length - 1].nftId;
      if (sectionNumberUseBounds) {
        startId = key === '0' ? 1 : parseInt(key) * 100;
        endId = parseInt(key) * 100 + 99;
      }
      res.push(
        <div style={styles.sectionContainer} key={startId}>
          <Text style={{ width: '100%', marginTop: '30px', marginBottom: '5px' }} block bold size="medium">
            #{startId} - #{endId}
          </Text>
          {renderRows(sections[key])}
        </div>
      );
    }
    return res;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = (event: any) => {
    if (event) history(`/collection/${event.selected}`);
  };

  if (nftUrlsState?.length === 0) {
    return (
      <Text size="medium" style={{ marginTop: '20px' }}>
        No {nameOfSingleNft} found.
      </Text>
    );
  }
  return (
    <>
      <div onMouseOut={() => setPopUpImage(0)} style={styles.container}>
        {renderSections()}
      </div>
      {isPaginated && (
        <div style={styles.paginationContainer}>
          {/* <ReactPaginate
            breakLabel="..."
            nextLabel={isMobile ? 'NEXT' : ''}
            containerClassName="pagination"
            nextClassName="pagination-li"
            previousClassName="pagination-li"
            pageLinkClassName="pagination-li"
            activeLinkClassName="pagination-active"
            onPageChange={handlePageClick}
            pageRangeDisplayed={isMobile ? -1 : 10}
            pageCount={pageCount}
            previousLabel={isMobile ? 'PREV' : ''}
            initialPage={defaultPage}
            marginPagesDisplayed={1}
            // pageLabelBuilder={page => `${(page - 1) * IMAGE_PER_PAGE} ${page * IMAGE_PER_PAGE - 1}`}
          /> */}
        </div>
      )}
    </>
  );
};

export default ThumbnailSection;
