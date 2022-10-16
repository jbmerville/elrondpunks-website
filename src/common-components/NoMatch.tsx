import React from 'react';
import { Text } from 'common-components';
import { Style } from 'types';

const NoMatch = () => {
  const style: Style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 auto'
  };

  return (
    <div style={style}>
      <Text size="large" bold>
        404 page not found.
      </Text>
    </div>
  );
};

export default NoMatch;
