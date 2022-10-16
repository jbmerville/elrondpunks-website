import { Colors, NFTType } from 'values';
import { Loading, PageContainer, PunkThumbnail, Text } from 'common-components';
import { NFTUrl, Styles } from 'types';
import React, { useEffect, useState } from 'react';
import { assignRole, getBestNftTypeForOwner, getNftTypeUrl, getNftsforOwner } from 'apis';
import { useGetLoginInfo, useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';

import { isNftUrlSpecial } from 'helper';
import { useIsMobile } from 'hooks';
import { useNavigate } from 'react-router-dom';

const CardMultiple = (props: { discordId: string; data: NFTUrl }) => {
  const { discordId, data } = props;
  const [isMouseOn, setIsMouseOn] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const styles: Styles = {
    card: {
      background: Colors.GREY,
      width: '250px',
      margin: '0 20px',
      cursor: 'pointer'
    }
  };

  if (isMobile) {
    styles.card = {
      background: Colors.GREY,
      width: '250px',
      margin: '20px'
    };
  }
  return (
    <div
      style={styles.card}
      onClick={() => {
        assignRole(NFTType.SPECIAL, discordId, data.nftId).then(() => window.location.reload());
      }}
      onMouseEnter={() => setIsMouseOn(true)}
      onMouseLeave={() => setIsMouseOn(false)}
    >
      <PunkThumbnail cancelOnClick hideInfo size="large" nftUrl={data} nftId={data.nftId}></PunkThumbnail>
      <div
        style={{
          padding: '19px',
          minHeight: '170px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        {isMouseOn ? (
          <Text size="medium">SELECT</Text>
        ) : (
          <>
            <Text size="medium" block>
              You own this Special
            </Text>
            <Text style={{ marginTop: '10px' }} block>
              Since you are the owner of this Special ePunk you can click on this card to display this Special next to your name on Discord.
            </Text>
          </>
        )}
      </div>
    </div>
  );
};

const DiscordRole = () => {
  const isMobile = useIsMobile();
  const { address } = useGetAccountInfo();
  const [nftUrls, setNFTUrls] = useState<NFTUrl[] | undefined>();
  const params = new URLSearchParams(window.location.search);
  const discordId = params.get('discord_id');
  const [nftType, setNftType] = useState<undefined | NFTType>();
  const { isLoggedIn } = useGetLoginInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && discordId) {
      navigate(`/unlock?discord_id=${discordId}`);
    } else if (discordId) {
      getBestNftTypeForOwner(address).then(nftType => {
        if (nftType != 'NONE') {
          if (nftType === NFTType.SPECIAL) {
            setNftType(NFTType.SPECIAL);
            getNftsforOwner('fullSize', address).then(nftUrls => {
              setNFTUrls(nftUrls.filter(isNftUrlSpecial));
            });
          } else if (!nftUrls) {
            getNftTypeUrl('fullSize', nftType).then(setNFTUrls);
            setNftType(nftType);
          } else {
            assignRole(nftType, discordId);
          }
        } else {
          setNFTUrls([]);
        }
      });
    }
    // if (discordId && !currentRole) getUserRole(discordId).then(setCurrentRole);
  }, [nftUrls]);
  const styles: Styles = {
    container: {
      background: Colors.WHITE,
      padding: '40px',
      border: '2px solid white',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    card: {
      background: Colors.GREY,
      width: '250px',
      margin: '0 20px'
    }
  };

  if (isMobile) {
    styles.container = {
      background: Colors.WHITE,
      padding: '40px',
      border: '2px solid white',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    };
    styles.card = {
      background: Colors.GREY,
      width: '250px',
      margin: '20px'
    };
  }

  const renderCard = (data: NFTUrl, nftType: NFTType) => {
    return (
      <div style={styles.card}>
        <PunkThumbnail hideInfo size="large" nftUrl={data} nftId={data.nftId}></PunkThumbnail>
        <div style={{ padding: '19px' }}>
          <Text size="medium" block>
            Congratulations!
          </Text>
          <Text style={{ marginTop: '10px' }} block>
            Since your highest ePunk type is a {nftType.toLowerCase()}, you got assigned the <Text bold>{nftType}</Text> role.
          </Text>
          <Text style={{ marginTop: '10px' }}>
            Check back on{' '}
            <div style={{ color: Colors.PRIMARY, fontWeight: 'bold', display: 'inline-block' }}>
              <a target="_blank" rel="noreferrer" href="https://discord.gg/tErFtaajRD">
                Discord
              </a>
            </div>
            .
          </Text>
        </div>
      </div>
    );
  };

  return (
    <PageContainer>
      <div style={styles.container}>
        {discordId ? (
          nftUrls ? (
            nftType && nftUrls.length > 0 ? (
              nftType !== NFTType.SPECIAL ? (
                renderCard(nftUrls[0], nftType)
              ) : (
                nftUrls.map(nftUrl => <CardMultiple key={nftUrl.nftId} data={nftUrl} discordId={discordId} />)
              )
            ) : (
              <Text block>Can&apos;t assign you Discord role. You need to own at least one ePunk :(</Text>
            )
          ) : (
            <Loading />
          )
        ) : (
          <Text color={Colors.ERROR}>Missing Discord Id in URL. Follow the link you were given by the Discord bot.</Text>
        )}
      </div>
    </PageContainer>
  );
};
export default DiscordRole;
