import { Button, PageContainer, PunkThumbnail, Text } from 'common-components';
import React, { RefObject, useEffect, useState } from 'react';
import { Style, Styles } from 'types';
import makeUrls, { TCalendarEvent } from 'add-event-to-calendar';

import { Colors } from 'values';
import config from 'config';
import moment from 'moment';
import { useIsMobile } from 'hooks';

interface HeroProps {
  scrollToRef?: RefObject<HTMLDivElement>;
}
interface CountDownItem {
  value: number;
  label: string;
}
interface CountDown {
  first: CountDownItem;
  second: CountDownItem;
  third: CountDownItem;
}

const Hero = (props: HeroProps) => {
  const { scrollToRef } = props;
  const { nameOfSingleNft, revealedDate } = config;
  const [animate, setAnimate] = useState(true);
  const [prevTime, setPrevTime] = useState<CountDown | undefined>();
  const isMobile = useIsMobile();

  const getTimeLeft = (): CountDown => {
    const duration = moment.duration(moment(revealedDate).diff(moment()));
    let countDown = {
      first: {
        value: duration.days(),
        label: 'days'
      },
      second: {
        value: duration.hours(),
        label: 'hours'
      },
      third: {
        value: duration.minutes(),
        label: 'min'
      }
    };
    if (duration.days() === 0) {
      countDown = {
        first: {
          value: duration.hours(),
          label: 'hours'
        },
        second: {
          value: duration.minutes(),
          label: 'min'
        },
        third: {
          value: duration.seconds(),
          label: 'sec'
        }
      };
    }
    return countDown;
  };

  const [currTime, setCurrTime] = useState<CountDown>(getTimeLeft());

  const updateStates = () => {
    if (animate) {
      setAnimate(false);
    } else {
      const timeLeft = getTimeLeft();
      setCurrTime(timeLeft);
      setPrevTime(currTime);
      setAnimate(true);
    }
  };

  useEffect(() => {
    updateStates();
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateStates, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [animate]);

  const styles: Styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '100px 0 150px 0',
      height: 'fit-content'
    },
    seperator: {
      width: '100%',
      height: '1px',
      background: Colors.PRIMARY
    },
    button: {
      fontSize: '1.2em',
      letterSpacing: '0.1em',
      padding: '15px 20px'
    },
    countdown: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      width: '500px',
      marginLeft: '-125px',
      justifyContent: 'space-between',
      lineHeight: '3.5em',
      marginTop: '60px'
    },
    thumbnailParentContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '50px'
    },
    thumbnailChildContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginLeft: '20px',
      justifyContent: 'center'
    },
    middleText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  if (isMobile) {
    styles.container = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '100px 0'
    };
    styles.countdown = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      maxWidth: '330px',
      width: '-webkit-fill-available',
      lineHeight: '3.5em',
      marginTop: '60px'
    };
    styles.middleText = {
      maxWidth: '290px',
      margin: '40px 0',
      textAlign: 'center'
    };
    styles.thumbnailParentContainer = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: '50px'
    };
    styles.thumbnailChildContainer = {
      marginRight: '20px'
    };
    styles.middleText = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      textAlign: 'center',
      justifyContent: 'center'
    };
  }

  const executeScroll = () => {
    if (scrollToRef && scrollToRef.current) {
      scrollToRef.current.scrollIntoView();
    }
  };

  const getAnimateStyle = (e: 'first' | 'second' | 'third'): Style => {
    let res = {};

    if (prevTime && currTime && animate) {
      res = {};
      const animation = '1s counter ease-out';
      switch (e) {
        case 'first':
          if (prevTime.first.value != currTime.first.value) {
            res = { animation };
          }
          break;
        case 'second':
          if (prevTime.second.value != currTime.second.value) {
            res = { animation };
          }
          break;
        case 'third':
          if (prevTime.third.value != currTime.third.value) {
            res = { animation };
          }
          break;
        default:
          break;
      }
    }
    return { ...res, fontSize: isMobile ? '2.5em' : '6em', minWidth: isMobile ? '22px' : '150px', textAlign: 'right', fontWeight: 'bold' };
  };

  if (currTime.second.value <= 0 && currTime.third.value <= 0) {
    return (
      <PageContainer style={{ ...styles.container, textAlign: 'center', height: '100px', fontWeight: 'bold', margin: '70px 0' }}>
        <Text bold size="large">
          New Project Owner Kimura!
        </Text>
      </PageContainer>
    );
  }
  const specialEpunkIds = [
    693,
    822,
    876,
    972,
    1088,
    1152,
    1185,
    1510,
    1539,
    1781,
    1845,
    1878,
    1904,
    1989,
    1999,
    2017,
    2096,
    2231,
    2405,
    2624,
    2697,
    2784,
    2822,
    3009,
    3029,
    3041,
    3109,
    3141
  ];

  const addToGoogleCalendar = () => {
    const getCalendarEvent = (): TCalendarEvent => ({
      name: `ElrondPunks Sale`,
      location: 'https://elrondpunks.com/',
      details: `Public sale of the last 2531 ePunks NFTs on the Elrond blockchain`,
      startsAt: config.revealedDate,
      endsAt: config.revealedDate
    });
    const eventUrls = makeUrls(getCalendarEvent());
    window.open(eventUrls.google);
  };

  return (
    <PageContainer style={styles.container}>
      <Text style={styles.middleText} size="large">
        Final drop of {nameOfSingleNft}s is coming soon!
      </Text>

      <Text style={styles.middleText} color={Colors.PRIMARY} size="large">
        February 11th, 20:00 UTC
      </Text>
      <Button
        text={{
          hover: 'Add Event to Google Calendar',
          nonHover: 'Add Event to Google Calendar'
        }}
        onClick={addToGoogleCalendar}
        invert
      />
      {currTime && (
        <Text bold style={styles.countdown}>
          <div style={getAnimateStyle('first')}>{currTime.first.value}</div>
          <Text size="medium">{currTime.first.label}</Text> <div style={getAnimateStyle('second')}>{currTime.second.value}</div>{' '}
          <Text size="medium">{currTime.second.label}</Text> <div style={getAnimateStyle('third')}>{currTime.third.value}</div>{' '}
          <Text size="medium">{currTime.third.label}</Text>
        </Text>
      )}

      <div style={styles.thumbnailParentContainer}>
        <Text style={{ ...styles.middleText, margin: isMobile ? '' : '20px', flexDirection: 'row' }} size="large" bold>
          Watch out for the
          <Text color={Colors.PURPLE} style={{ marginLeft: isMobile ? '' : '10px' }}>
            <div className="glitch" data-text={`Special ${nameOfSingleNft}`}>
              Special {nameOfSingleNft}
            </div>
          </Text>
        </Text>
        <div style={isMobile ? styles.middleText : styles.thumbnailChildContainer}>
          {specialEpunkIds.map(specialEpunkId => (
            <div style={styles.thumbnailChildContainer} key={specialEpunkId}>
              <PunkThumbnail size="small" nftId={specialEpunkId} />
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Hero;
