import { PageContainer, PunkThumbnail, Text } from 'common-components';

import React from 'react';
import { Styles } from 'types';
import config from 'config';
import { useIsMobile } from 'hooks';

const Team = () => {
  const isMobile = useIsMobile();

  const styles: Styles = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    innerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '40px'
    },
    thumbnailContainer: {
      width: '250px',
      display: 'flex',
      flexDirection: 'column'
    }
  };

  if (isMobile) {
    styles.outerContainer = {
      padding: '20px 0',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    };
    styles.innerContainer = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: '40px'
    };
    styles.thumbnailContainer = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      maxWidth: '150px',
      marginTop: '20px',
      marginRight: '20px'
    };
  }

  const renderTeamMember = ({ nickname, quote, nftId, role }: { nickname: string; quote: string; nftId: number; role: string }) => (
    <div style={styles.thumbnailContainer} key={nickname}>
      <PunkThumbnail nftId={nftId} />
      <Text size="medium" bold>
        {nickname}
      </Text>
      <Text bold>{role}</Text>
      <Text size="small">&quot;{quote}&quot;</Text>
    </div>
  );

  return (
    <>
      <Text size="large" bold>
        Meet the team!
      </Text>
      <div style={styles.innerContainer}>{config.team.members.map(renderTeamMember)}</div>
    </>
  );
};

export default Team;
