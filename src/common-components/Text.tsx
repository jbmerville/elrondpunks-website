import React, { ReactNode } from 'react';

import { Colors } from 'values';
import { Style } from 'types';
import { useIsMobile } from 'hooks';

interface TextProps {
  color?: Colors;
  style?: Style;
  bold?: boolean;
  children: ReactNode | ReactNode[];
  size?: 'large' | 'medium' | 'default' | 'small' | 'xsmall';
  block?: boolean;
  onClick?: () => any;
}

const defaultProps = {
  color: Colors.TEXT,
  size: 'default'
};

const Text = (props: TextProps) => {
  const { color, children, style, size, bold, block, onClick } = props;
  const isMobile = useIsMobile();

  const getFontSize = () => {
    switch (size) {
      case 'large':
        return isMobile ? '2.3em' : '2.6em';
      case 'medium':
        return '1.5em';
      case 'small':
        return '0.8em';
      case 'xsmall':
        return '0.7em';
      default:
        return '1em';
    }
  };

  const combinedStyle: Style = {
    color,
    fontSize: getFontSize(),
    fontWeight: bold ? 'bold' : undefined,
    display: block ? 'block' : 'inline-block',
    lineHeight: isMobile ? '1.2em' : '1.5em',
    ...style
  };

  return (
    <div onClick={onClick} style={combinedStyle}>
      {children}
    </div>
  );
};

Text.defaultProps = defaultProps;

export default Text;
