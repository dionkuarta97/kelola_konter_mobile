import {useNavigation} from '@react-navigation/native';
import {Box, HStack, Text} from 'native-base';
import React from 'react';

import IconAws from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {setMenuIdx} from '../../Redux/Auth/AuthAction';

const SmallHeader = props => {
  const dispatch = useDispatch();
  const {title} = props;
  const naviagation = useNavigation();

  return (
    <Box
      bg={'tertiary.800'}
      paddingY={4}
      paddingX={5}
      justifyContent={'center'}>
      <HStack space={4}>
        <IconAws
          style={{color: 'whitesmoke'}}
          size={30}
          name="angle-left"
          onPress={() => naviagation.goBack()}
        />
        <Text style={{marginEnd: 'auto'}} fontSize={20} color={'light.50'}>
          {title}
        </Text>
        <IconAws
          style={{color: 'whitesmoke'}}
          size={30}
          name="home"
          onPress={() => {
            dispatch(setMenuIdx(2));
            naviagation.navigate('MenuScreen');
          }}
        />
      </HStack>
    </Box>
  );
};

export default SmallHeader;
