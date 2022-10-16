import React, { ReactNode } from 'react';
import { Text } from 'common-components';
import { Styles } from 'types';
import { Colors } from 'values';
import { useIsMobile } from 'hooks';

interface RoadmapProps {
  roadmap: RoadmapItem[];
}
interface RoadmapItem {
  quarter: string;
  content: ReactNode;
}

const Roadmap = (props: RoadmapProps) => {
  const { roadmap } = props;
  const isMobile = useIsMobile();

  const styles: Styles = {
    quarterContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: 'auto',
      paddingLeft: '20px',
      paddingRight: '10px',
      paddingTop: '10px'
    },
    outerContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    anchorInnerInner: {
      height: '26px',
      width: '26px',
      borderRadius: '25px',
      background: Colors.PRIMARY
    },
    anchor: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '55px',
      width: '55px',
      borderRadius: '30px',
      background: Colors.IMAGE_BACKGROUND
    },
    anchorInner: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px',
      width: '40px',
      borderRadius: '25px',
      background: Colors.WHITE
    },
    tail: {
      height: '-webkit-fill-available',
      width: '3px',
      background: Colors.PRIMARY,
      marginLeft: '26.5px',
      marginTop: '-15px',
      marginBottom: '-15px',
      zIndex: 2
    }
  };

  if (isMobile) {
    styles.anchorInner = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px',
      width: '40px',
      margin: '8px',
      borderRadius: '25px',
      background: Colors.WHITE
    };
    styles.tail = {
      height: '-webkit-fill-available',
      width: '3px',
      background: Colors.PRIMARY,
      marginLeft: '27px',
      marginTop: '-15px',
      marginBottom: '-15px',
      zIndex: 2
    };
    styles.textContainer = {
      display: 'flex',
      flexDirection: 'column',
      marginRight: 'auto',
      paddingLeft: '10px',
      paddingTop: '15px'
    };
  }

  const renderRoadmapItem = (roadmapItem: RoadmapItem, index: number) => {
    const { quarter, content } = roadmapItem;
    return (
      <div key={quarter}>
        <div style={styles.quarterContainer}>
          <div style={{ gridTemplateRows: '55px 1fr', display: 'grid' }}>
            <div style={styles.anchor}>
              <div style={styles.anchorInner}>
                <div style={{ ...styles.anchorInnerInner, background: index <= 1 ? Colors.PRIMARY : Colors.COMMON }} />
              </div>
            </div>
            <div
              style={{
                ...styles.tail,
                background: index == 0 ? Colors.PRIMARY : Colors.COMMON,
                width: index == 0 ? '5px' : '3px',
                marginLeft: index == 0 ? '25.5px' : '26.5px'
              }}
            ></div>
          </div>
          <div key={quarter} style={styles.textContainer}>
            {content}
          </div>
          <Text bold style={{ padding: '10px 0px', minWidth: isMobile ? '50px' : '100px', textAlign: 'right' }} size="medium">
            {quarter}
          </Text>
        </div>
        {/* {!isLastItem && <div style={styles.tail} />} */}
      </div>
    );
  };

  return (
    <>
      <Text style={{ marginBottom: '20px' }} size="large" bold>
        Roadmap
      </Text>
      <div style={styles.outerContainer}>{roadmap.map(renderRoadmapItem)}</div>
    </>
  );
};

export default Roadmap;
