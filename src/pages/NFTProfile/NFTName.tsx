import { Loading, Text } from 'common-components';
import React, { useEffect, useState } from 'react';
import { faCheckSquare, faPen } from '@fortawesome/free-solid-svg-icons';
import { getNFTName, writeNFTName } from 'apis';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';

import { Colors } from 'values';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Styles } from 'types';
import config from 'config';
import { useIsMobile } from 'hooks';

interface NFTNameProps {
  nftId: string;
  owner?: string;
}
const NFTName = (props: NFTNameProps) => {
  const { nftId, owner } = props;
  const [nftName, setNftName] = useState<string | undefined>();
  const { collectionName } = config;
  const { address } = useGetAccountInfo();
  const isMobile = useIsMobile();
  const nftIdNumber = parseInt(nftId.substring(0));
  const [isEditName, setIsEditName] = useState(false);
  const [editNameContent, setEditNameContent] = useState('');

  const styles: Styles = {
    container: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row'
    },
    input: {
      all: 'unset',
      fontSize: isMobile ? '2.3em' : '2.6em',
      fontWeight: 'bold',
      color: Colors.PRIMARY,
      width: '420px',
      marginLeft: isMobile ? '0px' : '10px'
    }
  };

  useEffect(() => {
    getNFTName(nftIdNumber).then(nftName => {
      setNftName(nftName);
      setEditNameContent(nftName);
    });
  }, []);

  const saveNewName = async () => {
    await setNftName(undefined);
    setIsEditName(!isEditName);
    await writeNFTName(nftIdNumber, editNameContent);
    const nftName = await getNFTName(nftIdNumber);
    await setNftName(nftName);
  };

  const renderEditName = () => {
    if (nftName == undefined) {
      return <Loading style={{ marginTop: '20px', marginLeft: '10px' }} />;
    }
    if (owner !== address) {
      return (
        <Text size="large" style={{ marginLeft: isMobile ? '0px' : '10px', marginBottom: isMobile ? '10px' : '0px' }} bold>
          {nftName}
        </Text>
      );
    }
    return (
      <>
        {isEditName ? (
          <>
            <input
              value={editNameContent}
              onChange={e => setEditNameContent(e.target.value)}
              autoFocus
              style={styles.input}
              maxLength={20}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  saveNewName();
                }
              }}
            ></input>
          </>
        ) : (
          <Text size="large" style={{ marginLeft: '10px' }} bold>
            {nftName}
          </Text>
        )}
        {isEditName ? (
          <FontAwesomeIcon
            onClick={saveNewName}
            icon={faCheckSquare}
            size="1x"
            color={Colors.PRIMARY}
            style={{ cursor: 'pointer', marginTop: '20px', marginLeft: '0px', fontSize: '1.5em' }}
          />
        ) : (
          <FontAwesomeIcon
            onClick={() => setIsEditName(!isEditName)}
            icon={faPen}
            size="1x"
            color={Colors.PRIMARY}
            style={{ cursor: 'pointer', marginTop: '20px', marginLeft: '10px' }}
          />
        )}
      </>
    );
  };
  return (
    <div style={styles.container}>
      <Text bold size="large">
        {collectionName} {nftId} {nftName != '' && '-'}
      </Text>
      {renderEditName()}
    </div>
  );
};

export default NFTName;
