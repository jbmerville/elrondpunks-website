import 'bootstrap/dist/css/bootstrap.min.css';

import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';
import { UnlockPage } from '@elrondnetwork/dapp-core/UI/pages';

import { Layout, NoMatch } from 'common-components';
import { Route, Routes } from 'react-router-dom';
import routes, { routeNames } from 'routes';

import React from 'react';

export interface PrevRoutes {
  to: string;
  from: string;
}

const App = () => {
  const params = new URLSearchParams(window.location.search);
  const discordId = params.get('discord_id');

  return (
    <DappProvider environment="mainnet" customNetworkConfig={{ apiTimeout: 10000 }}>
      <Layout>
        <Routes>
          <Route
            path={routeNames.unlock}
            element={<UnlockPage loginRoute={discordId ? routeNames.discordRole + `?discord_id=${discordId}` : routeNames.MyCollection} />}
          />
          {routes.map((route: any, index: number) => (
            <Route path={route.path} key={'route-key-' + index} element={<route.component />} />
          ))}
          <Route element={<NoMatch />} />
        </Routes>
      </Layout>
    </DappProvider>
  );
};

export default App;
