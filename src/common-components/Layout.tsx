import { AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core/wrappers';
import { Footer, Header } from 'common-components';
import routes, { routeNames } from 'routes';

import { Colors } from 'values';
import React from 'react';
import { Styles } from 'types';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const styles: Styles = {
    container: {
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      color: Colors.WHITE,
      overflow: 'hidden'
    },
    innerContainer: {
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.innerContainer}>
        <AuthenticatedRoutesWrapper routes={routes} unlockRoute={routeNames.unlock}>
          {children}
        </AuthenticatedRoutesWrapper>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
