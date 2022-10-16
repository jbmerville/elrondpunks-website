import React, { ReactNode } from 'react';
import { PageContainer, Text } from 'common-components';
import { Style } from 'types';

interface EmptyPageProps {
  children: ReactNode;
}

const EmptyPage = (props: EmptyPageProps) => {
  const { children } = props;
  const style: Style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 auto'
  };

  return (
    <PageContainer heightFitAvailable style={style}>
      <Text size="large" bold>
        {children}
      </Text>
    </PageContainer>
  );
};

export default EmptyPage;
