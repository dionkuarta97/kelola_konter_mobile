import React from 'react';
import {Box} from 'native-base';
import {Dimensions} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const BigHeader = props => {
  const {children} = props;
  return (
    <>
      <Box
        shadow={9}
        bg={{
          linearGradient: {
            colors: ['white', 'tertiary.500'],
            start: [0, 0],
            end: [0, 3],
          },
        }}
        style={{
          borderRadius: 20,
          marginTop: height / 14,
          width: width / 1.3,
          alignSelf: 'center',
          height: height / 3,
        }}>
        {children}
      </Box>
    </>
  );
};

export default BigHeader;
