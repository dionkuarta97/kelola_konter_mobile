import React from 'react';
import {ScrollView} from 'native-base';
import LoginContent from './components/LoginContent';
import login from '../../../assets/images/login.png';

const LoginScreen = () => {
  return (
    <>
      <ScrollView flex={1} backgroundColor={'white'}>
        <LoginContent img={login} />
      </ScrollView>
    </>
  );
};

export default LoginScreen;
