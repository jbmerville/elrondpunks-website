import { useIsMobile } from 'hooks';
import React, { ReactNode, ForwardedRef, forwardRef } from 'react';
import { Style, Styles } from 'types';
import { Colors } from 'values';

interface PageContainerProps {
  children: ReactNode;
  style?: Style;
  color?: Colors;
  heightFitAvailable?: boolean;
}

const defaultProps = {
  color: Colors.WHITE
};

const PageContainer = forwardRef((props: PageContainerProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { children, style, color, heightFitAvailable } = props;
  const isMobile = useIsMobile();

  const styles: Styles = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      background: color,
      flex: heightFitAvailable ? '1 1 auto' : ''
    },
    innerContainer: {
      width: '1000px'
    }
  };

  if (isMobile) {
    styles.innerContainer = {
      margin: '0 15px',
      flex: '1 1 auto'
    };
  }

  return (
    <div ref={ref} style={styles.outerContainer}>
      <div style={{ ...styles.innerContainer, ...style }}> {children}</div>
    </div>
  );
});

PageContainer.displayName = 'PageContainer';
PageContainer.defaultProps = defaultProps;

export default PageContainer;
