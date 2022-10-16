import { Attribute, Collection, HomePage, MyCollection, NFTProfile, Terms } from 'pages';

import DiscordRole from 'pages/DiscordRole';

export const routeNames = {
  home: '/',
  unlock: '/unlock/',
  ledger: '/ledger',
  walletconnect: '/walletconnect',
  MyCollection: '/my-collection',
  discordRole: '/discord-role',
  pickBody: '/cyop-pick-body'
};

const routes: any[] = [
  {
    path: '/',
    title: 'Home',
    component: HomePage
  },
  {
    path: '/my-collection',
    title: 'My Collection',
    component: MyCollection
  },
  {
    path: '/epunk/:nftId',
    title: 'Punk Profile',
    component: NFTProfile
  },
  {
    path: '/terms',
    title: 'Terms',
    component: Terms
  },
  {
    path: '/collection/:page',
    title: 'Collection',
    component: Collection
  },
  {
    path: '/attributes/:attribute',
    title: 'Attributes',
    component: Attribute
  },
  {
    path: routeNames.discordRole,
    title: 'Discord Role',
    component: DiscordRole
  }
];

const wrappedRoutes = () =>
  routes.map(route => {
    return {
      path: route.path,
      authenticatedRoute: Boolean(route.authenticatedRoute),
      component: route.component
    };
  });

export default wrappedRoutes();
