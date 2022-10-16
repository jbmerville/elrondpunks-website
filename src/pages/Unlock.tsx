import { Colors } from 'values';
import React from 'react';
import { Text } from 'common-components';

const Unlock = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
      <Text size="medium" style={{ background: Colors.GREY, padding: '25px 35px' }}>
        Download the{' '}
        <div style={{ color: Colors.PRIMARY, fontWeight: 'bold', display: 'inline-block' }}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://chrome.google.com/webstore/detail/maiar-defi-wallet/dngmlblcodfobpdpecaadgfbcggfjfnm"
          >
            Maiar Extension
          </a>
        </div>
      </Text>
    </div>
  );
};

export default Unlock;
