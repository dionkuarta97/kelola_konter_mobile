import React, {useEffect, useState} from 'react';
import {Heading, Input, Center, HStack, Button, Text} from 'native-base';
import {Image, Dimensions, Keyboard, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../../../assets/images/logo.png';
import {getLogin, setLogin} from '../../../Redux/Auth/AuthAction';
import ModalLoading from '../../../component/Modal/ModalLoading';
import {useNavigation} from '@react-navigation/native';
const LoginContent = props => {
  const naviagation = useNavigation();
  const dispatch = useDispatch();
  const [showImg, setShowImg] = useState(true);
  const {login} = useSelector(state => state.AuthReducer);
  const [showPassword, setShowPassword] = useState(false);
  const {img} = props;
  const [payload, setPayload] = useState({
    username: '',
    password: '',
  });

  const handleLogin = () => {
    if (payload.username && payload.password) {
      dispatch(getLogin(payload));
    } else {
      Alert.alert('WARNING', 'username dan password tidak boleh kosong');
    }
  };

  useEffect(() => {
    if (login.data?.user.role === 'admin') {
      naviagation.navigate('MenuScreen');
    }
  }, [login.data]);

  useEffect(() => {
    dispatch(setLogin({loading: false, error: null, data: login.data}));
  }, []);

  console.log(login);

  useEffect(() => {
    const onKeyboardHide = () => {
      if (!showImg) {
        setShowImg(true);
      }
      return true;
    };

    const keyboardHide = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide,
    );

    return () => keyboardHide.remove();
  }, [showImg]);

  return (
    <>
      {login.loading ? (
        <ModalLoading modalVisible={true} />
      ) : (
        <ModalLoading modalVisible={false} />
      )}
      {showImg && (
        <Image
          source={img}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 2,
          }}
        />
      )}

      <Center mt={!showImg ? Dimensions.get('window').height / 4 : 0} flex={1}>
        <HStack mb={5}>
          <Image
            source={logo}
            alt="logo"
            style={{
              width: Dimensions.get('window').width / 12,
              height: Dimensions.get('window').width / 12,
            }}
          />
          <Heading ml={3}>Kelola Konter</Heading>
        </HStack>
        {login.error && (
          <>
            <Text mb={3} color={'red.700'}>
              {login.error}
            </Text>
          </>
        )}
        <Input
          onChangeText={val => setPayload({...payload, username: val})}
          onTouchEndCapture={() => {
            setShowImg(false);
          }}
          mx="3"
          mb={3}
          placeholder="username"
          w={{
            base: '75%',
          }}
        />
        <Input
          onChangeText={val => setPayload({...payload, password: val})}
          w={{
            base: '75%',
          }}
          onTouchEndCapture={() => {
            setShowImg(false);
          }}
          mx="3"
          type={!showPassword ? 'password' : 'text'}
          placeholder="password"
        />
        <HStack mt={5}>
          <Button
            mr={5}
            onPress={handleLogin}
            width="25%"
            colorScheme="tertiary">
            Login
          </Button>
          <Button
            onPress={() => {
              if (!showPassword) {
                setShowPassword(true);
              } else {
                setShowPassword(false);
              }
            }}
            colorScheme={!showPassword ? 'muted' : 'amber'}>
            {!showPassword ? 'Show Password' : 'Hide Password'}
          </Button>
        </HStack>
      </Center>
    </>
  );
};

export default LoginContent;
