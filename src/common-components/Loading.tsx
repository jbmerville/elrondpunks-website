import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Style, Styles } from 'types';
import { Colors } from 'values';

interface LoadingProps {
  size?: 'large' | 'default' | 'small';
  style?: Style;
}

const defaultProps = {
  size: 'default'
};

const Loading = (props: LoadingProps) => {
  const { size, style } = props;

  const getSize = () => {
    switch (size) {
      case 'large':
        return '3x';
      case 'small':
        return '1x';
      default:
        return '2x';
    }
  };

  const styles: Styles = {
    icon: { animation: `spin 1s linear infinite` }
  };

  return <FontAwesomeIcon style={{ ...styles.icon, ...style }} color={Colors.PRIMARY} icon={faCircleNotch} size={getSize()} />;
};

Loading.defaultProps = defaultProps;

export default Loading;
