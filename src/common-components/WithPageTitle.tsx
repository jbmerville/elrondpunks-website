/* eslint-disable react/display-name */
import React, { useEffect, memo } from 'react';

const WithPageTitle = (title: string, Component: React.ComponentType) => () => {
  const Memoized = memo(Component);
  Memoized.displayName = title;
  useEffect(() => {
    document.title = title;
  }, []);
  return <Memoized />;
};

export default WithPageTitle;
