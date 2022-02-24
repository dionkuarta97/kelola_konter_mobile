import {useFocusEffect} from '@react-navigation/native';
import {Center, Heading, Box, Text} from 'native-base';
import React, {useCallback} from 'react';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';
import logo from '../../../assets/images/logo.png';

const SplashScreen = props => {
  const {navigation} = props;
  const {login} = useSelector(state => state.AuthReducer);

  const timeOut = () => {
    setTimeout(() => {
      if (login.data?.user.role === 'admin') {
        navigation.replace('MenuScreen');
      } else {
        navigation.replace('LoginScreen');
      }
    }, 2000);
  };

  useFocusEffect(
    useCallback(() => {
      timeOut();
    }, []),
  );
  return (
    <>
      <Box flex={1} bg="white" safeAreaTop>
        <Center flex={1}>
          <Image source={logo} />
          <Heading marginTop={1} color={'tertiary.900'}>
            Kelola Konter
          </Heading>
        </Center>
        <Center marginBottom={10}>
          <Text color={'tertiary.900'}>
            Copyright © 2021 Develop By Dion Kuarta
          </Text>
        </Center>
      </Box>
    </>
  );
};

export default SplashScreen;
