import About from './About';
import { Colors } from 'values';
import FAQComponent from './FAQ';
import Gallery from './Gallery';
import Hero from './Hero';
import { PageContainer } from 'common-components';
import React from 'react';
import Roadmap from './Roadmap';
import { Styles } from 'types';
import { Team } from 'pages';
import config from 'config';

const HomePage = () => {
  const { roadmap } = config;

  const styles: Styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '40px 0 60px 0'
    },
    seperator: {
      height: '1px',
      background: Colors.PRIMARY
    }
  };

  const renderSeparator = () => (
    <PageContainer>
      <div style={styles.seperator} />
    </PageContainer>
  );
  return (
    <>
      <Hero />
      <Gallery />
      <PageContainer style={styles.container}>
        <About />
      </PageContainer>
      {renderSeparator()}
      <PageContainer style={styles.container}>
        <Roadmap roadmap={roadmap} />
      </PageContainer>
      {renderSeparator()}
      <PageContainer style={styles.container}>
        <Team />
      </PageContainer>
      {renderSeparator()}
      <PageContainer style={styles.container}>
        <FAQComponent />
      </PageContainer>
    </>
  );
};

export default HomePage;
