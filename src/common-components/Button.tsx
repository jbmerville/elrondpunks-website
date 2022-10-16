import { Loading, Text } from 'common-components';
import React, { useState } from 'react';
import { Style, Styles } from 'types';

import { Colors } from 'values';

interface ButtonProps {
  text: {
    hover: string;
    nonHover: string;
  };
  onClick?: () => void;
  style?: Style;
  invert?: boolean;
}
const Button = (props: ButtonProps) => {
  const { invert, text, onClick, style } = props;
  const { hover, nonHover } = text;
  const [isMouseOn, setIsMouseOn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const getBackgroundColor = () => {
    if (invert) {
      return isMouseOn ? Colors.WHITE : Colors.PRIMARY;
    }
    return isMouseOn ? Colors.PRIMARY : Colors.WHITE;
  };

  const getTextColor = () => {
    if (invert) {
      return isMouseOn ? Colors.PRIMARY : Colors.WHITE;
    }
    return isMouseOn ? Colors.WHITE : Colors.PRIMARY;
  };

  const onButtonClick = async () => {
    if (onClick && !isLoading) {
      setIsLoading(true);
      await onClick();
      setIsLoading(false);
    }
  };

  const styles: Styles = {
    container: {
      padding: '10px',
      border: `2px solid ${Colors.PRIMARY}`,
      cursor: 'pointer',
      background: getBackgroundColor(),
      transition: '0.2s ease-out',
      textAlign: 'center',
      userSelect: 'none'
    }
  };

  return (
    <div
      onClick={onButtonClick}
      style={{ ...styles.container, ...style }}
      onMouseEnter={() => setIsMouseOn(true)}
      onMouseLeave={() => setIsMouseOn(false)}
    >
      {isLoading ? <Loading /> : <Text color={getTextColor()}>{isMouseOn ? hover : nonHover}</Text>}
    </div>
  );
};

export default Button;
